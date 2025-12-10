'use client';

import React, { useEffect, useRef, useState } from 'react';

interface InteractiveCursorProps {
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

type CursorState = 'default' | 'hover' | 'click' | 'text';

const CursorVariants = {
  default: (
    <div className="relative">
      <div className="w-6 h-6 border-2 border-white/60 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200">
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
      </div>
    </div>
  ),
  hover: (
    <div className="relative">
      <div className="w-12 h-12 border-2 border-white/40 rounded-full bg-white/5 backdrop-blur-sm transition-all duration-200 animate-pulse">
        <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
      </div>
      <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 border border-white/30 rounded-full" />
    </div>
  ),
  click: (
    <div className="relative">
      <div className="w-4 h-4 border-2 border-white/80 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-100">
        <div className="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
      </div>
    </div>
  ),
  text: (
    <div className="w-0.5 h-6 bg-white/80 rounded-full animate-pulse" />
  ),
};

export function InteractiveCursor({ 
  springConfig = {
    damping: 40,
    stiffness: 350,
    mass: 0.8,
    restDelta: 0.001,
  }
}: InteractiveCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation state
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const lastTimeRef = useRef(0);

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

    if (deltaTime > 100) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const dt = Math.min(deltaTime / 1000, 0.016);

    const dx = targetRef.current.x - positionRef.current.x;
    const dy = targetRef.current.y - positionRef.current.y;

    const springForceX = dx * springConfig.stiffness;
    const springForceY = dy * springConfig.stiffness;

    const dampingForceX = velocityRef.current.x * springConfig.damping;
    const dampingForceY = velocityRef.current.y * springConfig.damping;

    const accelerationX = (springForceX - dampingForceX) / springConfig.mass;
    const accelerationY = (springForceY - dampingForceY) / springConfig.mass;

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

    // Apply transform with offset based on cursor state
    const offset = cursorState === 'hover' ? 24 : cursorState === 'text' ? 12 : 12;
    cursorRef.current.style.transform = `translate3d(${positionRef.current.x - offset}px, ${positionRef.current.y - offset}px, 0) rotate(${rotationRef.current}deg)`;

    const isAtRest = 
      Math.abs(dx) < springConfig.restDelta && 
      Math.abs(dy) < springConfig.restDelta &&
      Math.abs(velocityRef.current.x) < springConfig.restDelta &&
      Math.abs(velocityRef.current.y) < springConfig.restDelta;

    if (!isAtRest) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    targetRef.current.x = e.clientX;
    targetRef.current.y = e.clientY;
    
    if (!animationRef.current) {
      lastTimeRef.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);
    }
    
    setIsVisible(true);
  };

  // Element hover detection
  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.matches('a, button, [role="button"], .cursor-pointer')) {
      setCursorState('hover');
    } else if (target.matches('input, textarea, [contenteditable]')) {
      setCursorState('text');
    } else {
      setCursorState('default');
    }
  };

  const handleMouseDown = (_e: MouseEvent) => {
    setCursorState('click');
  };

  const handleMouseUp = (_e: MouseEvent) => {
    setCursorState('default');
  };

  const handleMouseLeave = (_e: MouseEvent) => {
    setIsVisible(false);
    setCursorState('default');
  };

  useEffect(() => {
    if (!isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (!isMobile) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {CursorVariants[cursorState]}
    </div>
  );
}