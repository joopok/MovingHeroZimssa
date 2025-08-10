/**
 * 성능 최적화 설정 유틸리티
 * CPU 사용량을 줄이기 위한 애니메이션 제어
 */

// 사용자 선호도나 기기 성능에 따른 애니메이션 레벨
export type AnimationLevel = 'none' | 'minimal' | 'reduced' | 'full'

interface NavigatorExtended extends Navigator {
  deviceMemory?: number
}

interface PerformanceConfig {
  reduceMotion: boolean
  animationLevel: AnimationLevel
  enableComplexAnimations: boolean
  enableInfiniteAnimations: boolean
}

// 사용자 환경 감지
const detectUserPreferences = (): Partial<PerformanceConfig> => {
  // 브라우저 환경이 아닌 경우 기본값 반환
  if (typeof window === 'undefined') {
    return {
      reduceMotion: false,
      animationLevel: 'reduced', // 서버사이드에서는 기본적으로 reduced
      enableComplexAnimations: false,
      enableInfiniteAnimations: false
    }
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // CPU 성능 추정 (navigator.hardwareConcurrency 기반)
  const cpuCores = navigator.hardwareConcurrency || 4
  const isLowEndDevice = cpuCores < 4
  
  // 배터리 상태 고려 (가능한 경우)
  const isBatteryLow = false // 추후 Battery API 사용 시 구현
  
  return {
    reduceMotion: prefersReducedMotion,
    animationLevel: prefersReducedMotion ? 'minimal' : isLowEndDevice ? 'reduced' : 'full',
    enableComplexAnimations: !prefersReducedMotion && !isLowEndDevice && !isBatteryLow,
    enableInfiniteAnimations: !prefersReducedMotion && !isLowEndDevice && !isBatteryLow
  }
}

// 기본 성능 설정
const defaultConfig: PerformanceConfig = {
  reduceMotion: false,
  animationLevel: 'reduced', // CPU 부하 감소를 위해 기본값을 reduced로 설정
  enableComplexAnimations: false,
  enableInfiniteAnimations: false
}

// 성능 설정 생성
export const createPerformanceConfig = (): PerformanceConfig => {
  const userPrefs = detectUserPreferences()
  return { ...defaultConfig, ...userPrefs }
}

// 전역 성능 설정
export const performanceConfig = createPerformanceConfig()

// 애니메이션 지속시간 조정
export const getAnimationDuration = (baseDuration: number): number => {
  switch (performanceConfig.animationLevel) {
    case 'none':
      return 0
    case 'minimal':
      return baseDuration * 0.5
    case 'reduced':
      return baseDuration * 0.8
    case 'full':
    default:
      return baseDuration
  }
}

// 애니메이션 반복 횟수 조정
export const getAnimationRepeat = (shouldRepeat: boolean | number): boolean | number => {
  if (!performanceConfig.enableInfiniteAnimations) {
    return false // 무한 반복 비활성화
  }
  return shouldRepeat
}

// 복잡한 애니메이션 허용 여부
export const shouldEnableComplexAnimation = (): boolean => {
  return performanceConfig.enableComplexAnimations
}

// Framer Motion 전환 설정 최적화
export const getOptimizedTransition = (transition: Record<string, unknown>) => {
  const optimized = { ...transition }
  
  if (optimized['duration']) {
    optimized['duration'] = getAnimationDuration(optimized['duration'] as number)
  }
  
  if (optimized['repeat'] === Infinity && !performanceConfig.enableInfiniteAnimations) {
    optimized['repeat'] = 0
  }
  
  // 성능을 위한 기본 설정 추가
  optimized['ease'] = optimized['ease'] || 'easeOut'
  
  return optimized
}

// 디바이스 성능 확인
export const isHighPerformanceDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const cores = navigator.hardwareConcurrency || 0
  const memory = (navigator as NavigatorExtended).deviceMemory || 0
  
  return cores >= 8 && memory >= 8 // 8코어 이상, 8GB 이상 RAM
}

// CSS will-change 속성 최적화
export const getWillChangeStyle = (properties: string[]): React.CSSProperties => {
  if (performanceConfig.animationLevel === 'none') {
    return {}
  }
  
  return {
    willChange: properties.join(', ')
  }
}