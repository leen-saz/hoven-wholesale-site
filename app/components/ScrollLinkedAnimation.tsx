'use client';

import { useRef, useEffect, useState } from 'react';

interface ScrollLinkedAnimationProps {
  frameDir: string; // e.g., '/frames/signature/'
  frameCount: number;
  elementId: string;
  threshold?: number;
}

export default function ScrollLinkedAnimation({
  frameDir,
  frameCount,
  elementId,
  threshold = 0.5,
}: ScrollLinkedAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const framesCacheRef = useRef<Map<number, string>>(new Map());

  // Preload nearby frames
  const preloadFrames = (frameNum: number) => {
    const framesToPreload = [frameNum - 1, frameNum, frameNum + 1];
    framesToPreload.forEach((n) => {
      if (n >= 1 && n <= frameCount && !framesCacheRef.current.has(n)) {
        const img = new Image();
        img.src = `${frameDir}frame-${String(n).padStart(4, '0')}.jpg`;
        framesCacheRef.current.set(n, img.src);
      }
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the container is visible
      const containerTop = rect.top;
      const containerHeight = rect.height;

      // Progress: 0 when container is below viewport, 1 when it's scrolled past
      let progress = (windowHeight - containerTop) / (windowHeight + containerHeight);
      progress = Math.max(0, Math.min(1, progress));

      // Map progress to frame number (1-indexed)
      const frameNum = Math.round(progress * (frameCount - 1)) + 1;

      if (frameNum !== currentFrame) {
        setCurrentFrame(frameNum);
        preloadFrames(frameNum);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentFrame, frameCount, elementId]);

  const frameSrc = `${frameDir}frame-${String(currentFrame).padStart(4, '0')}.jpg`;

  return (
    <div
      ref={containerRef}
      id={elementId}
      className="w-full bg-gray-100 overflow-hidden"
      style={{ aspectRatio: '16 / 9' }}
    >
      <img
        src={frameSrc}
        alt="Product animation frame"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
