/**
 * React 19 호환 Reduced Motion 훅
 * 사용자의 접근성 설정과 기기 성능을 고려한 모션 제어
 */

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // 브라우저 환경이 아닌 경우 기본값 반환
    if (typeof window === 'undefined') {
      setPrefersReducedMotion(true)
      return
    }

    // 사용자 접근성 설정 확인
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // 미디어 쿼리 변경 감지
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // React 19 호환 이벤트 리스너 등록
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * 성능 기반 모션 제어 훅
 * CPU 코어 수와 메모리를 기반으로 애니메이션 레벨 결정
 */
export function usePerformanceBasedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') {
      setShouldReduceMotion(true)
      return
    }

    // 하드웨어 성능 감지
    const cpuCores = navigator.hardwareConcurrency || 2
    const memory = (navigator as any).deviceMemory || 2

    // 저사양 기기 감지 (4코어 미만, 4GB 미만)
    const isLowEndDevice = cpuCores < 4 || memory < 4

    // 배터리 저전력 모드 감지 (가능한 경우)
    let isBatteryLow = false
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        isBatteryLow = battery.level < 0.2 || battery.charging === false
        setShouldReduceMotion(prefersReducedMotion || isLowEndDevice || isBatteryLow)
      })
    } else {
      setShouldReduceMotion(prefersReducedMotion || isLowEndDevice)
    }
  }, [prefersReducedMotion])

  return {
    shouldReduceMotion,
    prefersReducedMotion,
    animationLevel: shouldReduceMotion ? 'minimal' : 'full'
  }
}