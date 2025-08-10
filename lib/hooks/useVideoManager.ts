"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
// Remove unused import

// TypeScript 5.9: Advanced generic constraints and utility types
interface VideoSlide {
  readonly video: string;
  readonly fallbackImage: {
    readonly pc: string;
    readonly mobile: string;
  };
}

type VideoState = Record<number, boolean>;

interface UseVideoManagerOptions {
  readonly slides: readonly VideoSlide[];
  readonly autoPlayInterval?: number;
  readonly preloadAll?: boolean;
}

interface UseVideoManagerReturn {
  readonly currentSlide: number;
  readonly isVideoLoaded: VideoState;
  readonly hasVideoError: VideoState;
  readonly videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
  readonly goToSlide: (index: number) => void;
  readonly nextSlide: () => void;
  readonly prevSlide: () => void;
  readonly resetVideo: (index: number) => Promise<void>;
  readonly isCurrentVideoReady: boolean;
}

/**
 * TypeScript 5.9 Custom Hook: Advanced video carousel management
 * with enhanced type safety and error handling
 */
export function useVideoManager({
  slides,
  autoPlayInterval = 7000,
  preloadAll = true,
}: UseVideoManagerOptions): UseVideoManagerReturn {
  // Enhanced state management with strict typing
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<VideoState>({});
  const [hasVideoError, setHasVideoError] = useState<VideoState>({});
  
  // TypeScript 5.9: Proper ref typing with null safety
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized slide navigation functions
  const goToSlide = useCallback((index: number): void => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  }, [slides.length]);

  const nextSlide = useCallback((): void => {
    setCurrentSlide((prev: number) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback((): void => {
    setCurrentSlide((prev: number) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Enhanced video reset with Promise return type
  const resetVideo = useCallback(async (index: number): Promise<void> => {
    const video: HTMLVideoElement | null = videoRefs.current[index] ?? null;
    if (!video) return;

    try {
      video.currentTime = 0;
      video.pause();
      await video.load();
    } catch (error) {
      console.warn(`Failed to reset video at index ${index}:`, error);
      setHasVideoError((prev: VideoState) => ({ ...prev, [index]: true }));
    }
  }, []);

  // Auto-play timer management
  useEffect((): (() => void) => {
    if (autoPlayInterval > 0) {
      intervalRef.current = setInterval(nextSlide, autoPlayInterval);
    }
    
    return (): void => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [nextSlide, autoPlayInterval]);

  // Video playback management with enhanced error handling
  useEffect((): void => {
    const currentVideo: HTMLVideoElement | null = videoRefs.current[currentSlide] ?? null;
    
    if (currentVideo && !hasVideoError[currentSlide]) {
      // Reset and play current video
      currentVideo.currentTime = 0;
      const playPromise: Promise<void> | undefined = currentVideo.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then((): void => {
            setIsVideoLoaded((prev: VideoState) => ({ ...prev, [currentSlide]: true }));
          })
          .catch((error: unknown): void => {
            console.warn(`Video playback failed for slide ${currentSlide}:`, error);
            setHasVideoError((prev: VideoState) => ({ ...prev, [currentSlide]: true }));
            setIsVideoLoaded((prev: VideoState) => ({ ...prev, [currentSlide]: false }));
          });
      }
    }
    
    // Pause other videos
    videoRefs.current.forEach((video: HTMLVideoElement | null, index: number): void => {
      if (video && index !== currentSlide) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentSlide, hasVideoError]);

  // Preload all videos on mount if enabled
  useEffect((): void => {
    if (preloadAll) {
      videoRefs.current.forEach((video: HTMLVideoElement | null, index: number): void => {
        if (video) {
          video.load();
          
          // Set up error handlers
          const handleLoadSuccess = (): void => {
            setIsVideoLoaded((prev: VideoState) => ({ ...prev, [index]: true }));
          };
          
          const handleLoadError = (): void => {
            setHasVideoError((prev: VideoState) => ({ ...prev, [index]: true }));
          };
          
          video.addEventListener('loadeddata', handleLoadSuccess);
          video.addEventListener('error', handleLoadError);
          
          // Note: Cleanup would be handled by effect cleanup if needed
        }
      });
    }
  }, [preloadAll]);

  // Computed property for current video readiness
  const isCurrentVideoReady: boolean = 
    isVideoLoaded[currentSlide] === true && 
    hasVideoError[currentSlide] !== true;

  return {
    currentSlide,
    isVideoLoaded,
    hasVideoError,
    videoRefs,
    goToSlide,
    nextSlide,
    prevSlide,
    resetVideo,
    isCurrentVideoReady,
  } as const;
}