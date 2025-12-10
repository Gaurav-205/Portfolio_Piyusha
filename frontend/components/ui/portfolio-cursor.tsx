'use client';

import React from 'react';

export const PortfolioCursor = () => (
  <div className="relative">
    {/* Outer ring */}
    <div className="absolute inset-0 w-8 h-8 border border-white/30 rounded-full animate-pulse" />
    
    {/* Inner dot */}
    <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg" />
    
    {/* Glow effect */}
    <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-white/10 rounded-full blur-sm" />
  </div>
);

export const InteractiveCursor = () => (
  <div className="relative">
    {/* Main cursor */}
    <div className="w-6 h-6 border-2 border-white/60 rounded-full bg-white/10 backdrop-blur-sm">
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
    </div>
    
    {/* Trailing effect */}
    <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full animate-ping" />
  </div>
);

export const MinimalCursor = () => (
  <div className="w-4 h-4 bg-white/80 rounded-full shadow-lg border border-black/20" />
);