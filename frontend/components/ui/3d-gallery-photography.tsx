'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
  fadeIn: {
    start: number;
    end: number;
  };
  fadeOut: {
    start: number;
    end: number;
  };
}

interface BlurSettings {
  blurIn: {
    start: number;
    end: number;
  };
  blurOut: {
    start: number;
    end: number;
  };
  maxBlur: number;
}

interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
}

interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;
const MAX_SCROLL_VELOCITY = 5;
const SCROLL_ACCEL = 0.004;
const KEY_ACCEL = 0.8;
const AUTO_ACCEL = 0.25;
const DAMPING = 0.94;

const clampVelocity = (v: number) =>
  Math.max(-MAX_SCROLL_VELOCITY, Math.min(MAX_SCROLL_VELOCITY, v));

const createClothMaterial = () =>
  new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: null },
      opacity: { value: 1.0 },
      blurAmount: { value: 0.0 },
      scrollForce: { value: 0.0 },
      time: { value: 0.0 },
      isHovered: { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Create smooth curving based on scroll force
        float curveIntensity = scrollForce * 0.3;
        
        // Base curve across the plane based on distance from center
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        
        // Simplified cloth-like ripples for better performance
        float ripple1 = sin(pos.x * 1.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = ripple1 * abs(curveIntensity) * 1.5;
        
        // Simplified flag waving effect when hovered
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 2.0 + time * 6.0;
          float waveAmplitude = sin(wavePhase) * 0.08;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
        }
        
        pos.z -= (curve + clothEffect + flagWave);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        
        // Optimized blur approximation - much faster
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec2 blur = texelSize * blurAmount;
          
          // Simple 4-sample blur instead of 25-sample
          vec4 blurred = texture2D(map, vUv + vec2(-blur.x, 0.0)) * 0.25;
          blurred += texture2D(map, vUv + vec2(blur.x, 0.0)) * 0.25;
          blurred += texture2D(map, vUv + vec2(0.0, -blur.y)) * 0.25;
          blurred += texture2D(map, vUv + vec2(0.0, blur.y)) * 0.25;
          
          color = mix(color, blurred, min(blurAmount * 0.5, 1.0));
        }
        
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });

function ImagePlane({
  texture,
  position,
  scale,
  material,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  scale: [number, number, number];
  material: THREE.ShaderMaterial;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (material && texture) {
      material.uniforms.map.value = texture;
    }
  }, [material, texture]);

  useEffect(() => {
    if (material?.uniforms) {
      material.uniforms.isHovered.value = isHovered ? 1.0 : 0.0;
    }
  }, [material, isHovered]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      material={material}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <planeGeometry args={[1, 1, 16, 16]} />
    </mesh>
  );
}

function GalleryScene({
  images,
  speed = 1,
  zSpacing,
  visibleCount = 8,
  falloff,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 3.0,
  },
}: Omit<InfiniteGalleryProps, 'className' | 'style'>) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastInteraction = useRef(Date.now());

  // Detect mobile/tablet for responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive adjustments - moved before usage
  const responsiveVisibleCount = isMobile ? Math.max(4, Math.floor(visibleCount * 0.6)) : visibleCount;
  const responsiveZSpacing = isMobile ? (zSpacing ?? 4) * 1.2 : (zSpacing ?? 4);

  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === 'string' ? { src: img, alt: '' } : img
      ),
    [images]
  );

  const textures = useTexture(normalizedImages.map((img) => img.src));

  const materials = useMemo(
    () => Array.from({ length: responsiveVisibleCount }, () => createClothMaterial()),
    [responsiveVisibleCount]
  );

  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    const mobileScale = isMobile ? 0.7 : 1; // Smaller spread on mobile

    for (let i = 0; i < responsiveVisibleCount; i++) {
      const horizontalAngle = (i * 2.618) % (Math.PI * 2);
      const verticalAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

      const horizontalRadius = (i % 3) * 1.2 * mobileScale;
      const verticalRadius = ((i + 1) % 4) * 0.8 * mobileScale;

      const x =
        (Math.sin(horizontalAngle) * horizontalRadius * MAX_HORIZONTAL_OFFSET) /
        3;
      const y =
        (Math.cos(verticalAngle) * verticalRadius * MAX_VERTICAL_OFFSET) / 4;

      positions.push({ x, y });
    }

    return positions;
  }, [responsiveVisibleCount, isMobile]);
  
  const totalImages = normalizedImages.length;
  const depthRange = Math.max(
    responsiveVisibleCount > 0
      ? responsiveVisibleCount *
          (responsiveZSpacing ?? DEFAULT_DEPTH_RANGE / Math.max(responsiveVisibleCount, 1))
      : DEFAULT_DEPTH_RANGE,
    1
  );

  const planesData = useRef<PlaneData[]>(
    Array.from({ length: responsiveVisibleCount }, (_, i) => ({
      index: i,
      z: responsiveVisibleCount > 0 ? ((depthRange / responsiveVisibleCount) * i) % depthRange : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }))
  );

  useEffect(() => {
    planesData.current = Array.from({ length: responsiveVisibleCount }, (_, i) => ({
      index: i,
      z:
        responsiveVisibleCount > 0
          ? ((depthRange / Math.max(responsiveVisibleCount, 1)) * i) % depthRange
          : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
    }));
  }, [depthRange, spatialPositions, totalImages, responsiveVisibleCount]);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      setScrollVelocity((prev) =>
        clampVelocity(prev + event.deltaY * SCROLL_ACCEL * (speed ?? 1))
      );
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    },
    [speed]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        setScrollVelocity((prev) =>
          clampVelocity(prev - KEY_ACCEL * (speed ?? 1))
        );
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        setScrollVelocity((prev) =>
          clampVelocity(prev + KEY_ACCEL * (speed ?? 1))
        );
        setAutoPlay(false);
        lastInteraction.current = Date.now();
      }
    },
    [speed]
  );

  // Touch gesture handling for mobile
  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch) {
      lastInteraction.current = Date.now();
      setAutoPlay(false);
    }
  }, []);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      const touch = event.touches[0];
      if (touch) {
        // Simple touch velocity based on movement
        const touchVelocity = 0.01; // Gentle touch sensitivity
        setScrollVelocity((prev) =>
          clampVelocity(prev + touchVelocity * (speed ?? 1))
        );
        lastInteraction.current = Date.now();
      }
    },
    [speed]
  );

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
      
      // Add touch events for mobile
      if (isMobile) {
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      }

      return () => {
        canvas.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
        if (isMobile) {
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchmove', handleTouchMove);
        }
      };
    }
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction.current > 3000) {
        setAutoPlay(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (autoPlay) {
      setScrollVelocity((prev) =>
        clampVelocity(prev + AUTO_ACCEL * delta * (speed ?? 1))
      );
    }

    setScrollVelocity((prev) => clampVelocity(prev * DAMPING));

    const time = state.clock.getElapsedTime();
    materials.forEach((material) => {
      if (material?.uniforms) {
        material.uniforms.time.value = time;
        material.uniforms.scrollForce.value = scrollVelocity;
      }
    });

    const imageAdvance =
      totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    const totalRange = depthRange;
    const halfRange = totalRange / 2;
    const falloffNear = falloff?.near ?? 0;
    const falloffFar = falloff?.far ?? totalRange;

    planesData.current.forEach((plane, i) => {
      let newZ = plane.z + scrollVelocity * delta * 10;
      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (newZ >= totalRange) {
        wrapsForward = Math.floor(newZ / totalRange);
        newZ -= totalRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBackward = Math.ceil(-newZ / totalRange);
        newZ += totalRange * wrapsBackward;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
        plane.imageIndex =
          (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      }

      if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBackward * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % totalRange) + totalRange) % totalRange;
      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;

      const worldZ = plane.z - halfRange;
      const distanceFromCamera = Math.abs(worldZ);
      const falloffFactor =
        falloffFar > falloffNear
          ? Math.max(
              0,
              Math.min(
                1,
                1 - (distanceFromCamera - falloffNear) / (falloffFar - falloffNear)
              )
            )
          : 1;

      const normalizedPosition = plane.z / totalRange;
      let opacity = 1;

      if (
        normalizedPosition >= fadeSettings.fadeIn.start &&
        normalizedPosition <= fadeSettings.fadeIn.end
      ) {
        const fadeInProgress =
          (normalizedPosition - fadeSettings.fadeIn.start) /
          (fadeSettings.fadeIn.end - fadeSettings.fadeIn.start);
        opacity = fadeInProgress;
      } else if (normalizedPosition < fadeSettings.fadeIn.start) {
        opacity = 0;
      } else if (
        normalizedPosition >= fadeSettings.fadeOut.start &&
        normalizedPosition <= fadeSettings.fadeOut.end
      ) {
        const fadeOutProgress =
          (normalizedPosition - fadeSettings.fadeOut.start) /
          (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
        opacity = 1 - fadeOutProgress;
      } else if (normalizedPosition > fadeSettings.fadeOut.end) {
        opacity = 0;
      }

      opacity = Math.max(0, Math.min(1, opacity * falloffFactor));

      let blur = 0;

      if (
        normalizedPosition >= blurSettings.blurIn.start &&
        normalizedPosition <= blurSettings.blurIn.end
      ) {
        const blurInProgress =
          (normalizedPosition - blurSettings.blurIn.start) /
          (blurSettings.blurIn.end - blurSettings.blurIn.start);
        blur = blurSettings.maxBlur * (1 - blurInProgress);
      } else if (normalizedPosition < blurSettings.blurIn.start) {
        blur = blurSettings.maxBlur;
      } else if (
        normalizedPosition >= blurSettings.blurOut.start &&
        normalizedPosition <= blurSettings.blurOut.end
      ) {
        const blurOutProgress =
          (normalizedPosition - blurSettings.blurOut.start) /
          (blurSettings.blurOut.end - blurSettings.blurOut.start);
        blur = blurSettings.maxBlur * blurOutProgress;
      } else if (normalizedPosition > blurSettings.blurOut.end) {
        blur = blurSettings.maxBlur;
      }

      blur = Math.max(
        0,
        Math.min(
          blurSettings.maxBlur,
          blur + (1 - falloffFactor) * blurSettings.maxBlur * 0.5
        )
      );

      const material = materials[i];
      if (material?.uniforms) {
        material.uniforms.opacity.value = opacity;
        material.uniforms.blurAmount.value = blur;
      }
    });
  });

  if (normalizedImages.length === 0) return null;

  return (
    <>
      {planesData.current.map((plane, i) => {
        const texture = textures[plane.imageIndex];
        const material = materials[i];

        if (!texture || !material) return null;

        const worldZ = plane.z - depthRange / 2;
        const aspect = texture.image && typeof texture.image === 'object' && 'width' in texture.image && 'height' in texture.image
          ? (texture.image as any).width / (texture.image as any).height
          : 1;
        const scale: [number, number, number] =
          aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];

        return (
          <ImagePlane
            key={plane.index}
            texture={texture}
            position={[plane.x, plane.y, worldZ]}
            scale={scale}
            material={material}
          />
        );
      })}
    </>
  );
}

function FallbackGallery({ images }: { images: ImageItem[] }) {
  const normalizedImages = useMemo(
    () =>
      images.map((img) =>
        typeof img === 'string' ? { src: img, alt: '' } : img
      ),
    [images]
  );

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 p-4">
      <p className="mb-4 text-gray-600">WebGL not supported. Showing image list:</p>
      <div className="grid max-h-96 grid-cols-2 gap-4 overflow-y-auto md:grid-cols-3">
        {normalizedImages.map((img, i) => (
          <img
            key={i}
            src={img.src || '/placeholder.svg'}
            alt={img.alt}
            className="h-32 w-full rounded object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default function InfiniteGallery({
  images,
  speed,
  zSpacing,
  visibleCount,
  falloff,
  className = 'h-96 w-full',
  style,
  fadeSettings = {
    fadeIn: { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4, end: 0.43 },
  },
  blurSettings = {
    blurIn: { start: 0.0, end: 0.1 },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
}: InfiniteGalleryProps) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className={className} style={style}>
        <FallbackGallery images={images} />
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      <Canvas 
        camera={{ position: [0, 0, 0], fov: 55 }} 
        gl={{ 
          antialias: false, 
          alpha: true, 
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <GalleryScene
          images={images}
          speed={speed}
          zSpacing={zSpacing}
          visibleCount={visibleCount}
          falloff={falloff}
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
        />
      </Canvas>
    </div>
  );
}

