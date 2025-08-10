/**
 * React 19 호환 Intersection Observer 훅
 * 성능 최적화된 뷰포트 감지
 */

import { useEffect, useState, useRef, useCallback } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * 한 번만 감지할지 여부
   */
  once?: boolean
  /**
   * 요소가 뷰포트에 들어왔을 때 실행할 콜백
   */
  onEnter?: () => void
  /**
   * 요소가 뷰포트에서 나갔을 때 실행할 콜백
   */
  onExit?: () => void
}

export function useIntersectionObserver({
  threshold = 0.1,
  root = null,
  rootMargin = '0px',
  once = false,
  onEnter,
  onExit,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element
  }, [])

  useEffect(() => {
    const element = elementRef.current
    
    if (!element || typeof window === 'undefined') {
      return
    }

    // Intersection Observer 생성
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isCurrentlyIntersecting = entry.isIntersecting

          setIsIntersecting(isCurrentlyIntersecting)

          if (isCurrentlyIntersecting) {
            setHasIntersected(true)
            onEnter?.()
            
            // once 옵션이 true이면 관찰 중단
            if (once) {
              observer.unobserve(element)
            }
          } else if (hasIntersected && !once) {
            onExit?.()
          }
        })
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observerRef.current = observer
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, once, hasIntersected, onEnter, onExit])

  return {
    isIntersecting,
    hasIntersected,
    setRef,
  }
}

/**
 * 여러 요소를 한번에 관찰하는 훅
 */
export function useMultipleIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [elements, setElements] = useState<Map<string, boolean>>(new Map())
  const observersRef = useRef<Map<string, IntersectionObserver>>(new Map())

  const createRef = useCallback((id: string) => {
    return (element: HTMLElement | null) => {
      if (!element || typeof window === 'undefined') {
        return
      }

      // 기존 observer 정리
      const existingObserver = observersRef.current.get(id)
      if (existingObserver) {
        existingObserver.disconnect()
      }

      // 새 observer 생성
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setElements(prev => new Map(prev.set(id, entry.isIntersecting)))
            
            if (entry.isIntersecting) {
              options.onEnter?.()
              
              if (options.once) {
                observer.unobserve(element)
                observersRef.current.delete(id)
              }
            } else {
              options.onExit?.()
            }
          })
        },
        {
          threshold: options.threshold || 0.1,
          root: options.root || null,
          rootMargin: options.rootMargin || '0px',
        }
      )

      observer.observe(element)
      observersRef.current.set(id, observer)
    }
  }, [options])

  const cleanup = useCallback(() => {
    observersRef.current.forEach(observer => observer.disconnect())
    observersRef.current.clear()
    setElements(new Map())
  }, [])

  useEffect(() => {
    return cleanup
  }, [cleanup])

  return {
    elements,
    createRef,
    cleanup,
    isAnyIntersecting: Array.from(elements.values()).some(Boolean),
    areAllIntersecting: Array.from(elements.values()).every(Boolean),
  }
}

/**
 * LazyLoad를 위한 특화된 훅
 */
export function useLazyLoad() {
  return useIntersectionObserver({
    rootMargin: '50px',
    threshold: 0,
    once: true,
  })
}