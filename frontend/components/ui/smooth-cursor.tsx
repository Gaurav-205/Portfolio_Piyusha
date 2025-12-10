'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: Partial<SpringConfig>;
}

const defaultSpringConfig: SpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

const DefaultCursorSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={54}
    viewBox="0 0 50 54"
    fill="none"
    style={{ scale: 0.5 }}
    className="pointer-events-none"
  >
    <g filter="url(#filter0_d_91_7928)">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="black"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="white"
        strokeWidth={2.25825}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_91_7928"
        x={0.602397}
        y={0.952444}
        width={49.0584}
        height={52.428}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2.25825} />
        <feGaussianBlur stdDeviation={2.25825} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_91_7928"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_91_7928"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export function SmoothCursor({ 
  cursor = <DefaultCursorSVG />, 
  springConfig = {} 
}: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation state
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const lastTimeRef = useRef(0);

  const config = { ...defaultSpringConfig, ...springConfig };

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spring animation function
  const animate = (currentTime: number): void => {
    if (!cursorRef.current) return;

    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    // Skip if deltaTime is too large (tab was inactive)
    if (deltaTime > 100) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const dt = Math.min(deltaTime / 1000, 0.016); // Cap at 60fps

    // Calculate spring forces
    const dx = targetRef.current.x - positionRef.current.x;
    const dy = targetRef.current.y - positionRef.current.y;

    const springForceX = dx * config.stiffness;
    const springForceY = dy * config.stiffness;

    const dampingForceX = velocityRef.current.x * config.damping;
    const dampingForceY = velocityRef.current.y * config.damping;

    const accelerationX = (springForceX - dampingForceX) / config.mass;
    const accelerationY = (springForceY - dampingForceY) / config.mass;

    velocityRef.current.x += accelerationX * dt;
    velocityRef.current.y += accelerationY * dt;

    positionRef.current.x += velocityRef.current.x * dt;
    positionRef.current.y += velocityRef.current.y * dt;

    // Calculate rotation based on velocity
    const speed = Math.sqrt(
      velocityRef.current.x ** 2 + velocityRef.current.y ** 2
    );
    
    if (speed > 10) {
      const targetRotation = Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);
      rotationRef.current += (targetRotation - rotationRef.current) * 0.1;
    }

    // Apply transform
    cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) rotate(${rotationRef.current}deg)`;

    // Continue animation if not at rest
    const isAtRest = 
      Math.abs(dx) < config.restDelta && 
      Math.abs(dy) < config.restDelta &&
      Math.abs(velocityRef.current.x) < config.restDelta &&
      Math.abs(velocityRef.current.y) < config.restDelta;

    if (!isAtRest) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    targetRef.current.x = e.clientX - 12; // Center the cursor
    targetRef.current.y = e.clientY - 12;
    
    if (!animationRef.current) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }
    
    setIsVisible(true);
  };

  // Touch handler for mobile
  const handleTouch = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      targetRef.current.x = touch.clientX - 12;
      targetRef.current.y = touch.clientY - 12;
      
      if (!animationRef.current) {
        lastTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
      }
      
      setIsVisible(true);
      
      // Hide after a delay on mobile
      setTimeout(() => setIsVisible(false), 2000);
    }
  };

  // Mouse leave handler
  const handleMouseLeave = (_e: MouseEvent) => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isMobile) {
      // Mobile touch events
      document.addEventListener('touchstart', handleTouch, { passive: true });
      document.addEventListener('touchmove', handleTouch, { passive: true });
    } else {
      // Desktop mouse events
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (isMobile) {
        document.removeEventListener('touchstart', handleTouch);
        document.removeEventListener('touchmove', handleTouch);
      } else {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  // Don't render on mobile unless visible
  if (isMobile && !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate3d(-50%, -50%, 0)',
      }}
    >
      {cursor}
    </div>
  );
}

export function SmoothCursorDemo() {
  return (
    <>
      <span className="hidden md:block">Move your mouse around</span>
      <span className="block md:hidden">Tap anywhere to see the cursor</span>
      <SmoothCursor />
    </>
  );
}