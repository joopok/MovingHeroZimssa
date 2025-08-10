/**
 * Next.js 15 + React 19 최적화된 성능 모니터링 컴포넌트
 * Core Web Vitals와 실시간 성능 메트릭 추적
 */

'use client'

import { useEffect, useState } from 'react'
import { usePerformanceBasedMotion } from '@/hooks/useReducedMotion'

interface PerformanceExtended extends Performance {
  memory?: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  }
}

interface PerformanceMetrics {
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay (now INP in Core Web Vitals)
  cls?: number // Cumulative Layout Shift
  fcp?: number // First Contentful Paint
  ttfb?: number // Time to First Byte
  inp?: number // Interaction to Next Paint (replacing FID)
}

interface PerformanceMonitorProps {
  debug?: boolean
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void
}

export default function PerformanceMonitor({ 
  debug = false, 
  onMetricsUpdate 
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [isSupported, setIsSupported] = useState(false)
  const { shouldReduceMotion, animationLevel } = usePerformanceBasedMotion()

  useEffect(() => {
    // Web Vitals API 지원 확인
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return
    }

    setIsSupported(true)

    // Next.js 15와 호환되는 Core Web Vitals 측정
    const measureWebVitals = async () => {
      try {
        // Dynamic import for better bundle splitting in Next.js 15
        const webVitals = await import('web-vitals')
        const { onCLS, onFCP, onFID, onLCP, onTTFB, onINP } = webVitals
        
        // Largest Contentful Paint
        onLCP((metric) => {
          setMetrics(prev => ({ ...prev, lcp: metric.value }))
          onMetricsUpdate?.({ ...metrics, lcp: metric.value })
        })

        // First Input Delay (legacy support)
        onFID?.((metric) => {
          setMetrics(prev => ({ ...prev, fid: metric.value }))
          onMetricsUpdate?.({ ...metrics, fid: metric.value })
        })

        // Interaction to Next Paint (new Core Web Vital)
        onINP?.((metric) => {
          setMetrics(prev => ({ ...prev, inp: metric.value }))
          onMetricsUpdate?.({ ...metrics, inp: metric.value })
        })

        // Cumulative Layout Shift
        onCLS((metric) => {
          setMetrics(prev => ({ ...prev, cls: metric.value }))
          onMetricsUpdate?.({ ...metrics, cls: metric.value })
        })

        // First Contentful Paint
        onFCP((metric) => {
          setMetrics(prev => ({ ...prev, fcp: metric.value }))
          onMetricsUpdate?.({ ...metrics, fcp: metric.value })
        })

        // Time to First Byte
        onTTFB((metric) => {
          setMetrics(prev => ({ ...prev, ttfb: metric.value }))
          onMetricsUpdate?.({ ...metrics, ttfb: metric.value })
        })

      } catch (error) {
        console.warn('Web Vitals measurement failed:', error)
      }
    }

    measureWebVitals()

    // React 19 호환 메모리 사용량 모니터링
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memoryInfo = (performance as PerformanceExtended).memory
        if (debug && memoryInfo) {
          console.log('Memory Usage:', {
            used: `${Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)}MB`,
            total: `${Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024)}MB`,
            limit: `${Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024)}MB`,
          })
        }
      }
    }

    // 성능 모니터링 인터벌 (프로덕션에서는 더 긴 간격 사용)
    const interval = setInterval(monitorMemory, debug ? 5000 : 30000)

    return () => {
      clearInterval(interval)
    }
  }, [debug, onMetricsUpdate, metrics])

  // Next.js 15의 새로운 prefetch 최적화 활용
  useEffect(() => {
    if (typeof window === 'undefined') return

    // 중요한 리소스 프리로드
    const preloadCriticalResources = () => {
      const criticalImages = [
        'https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/app/img_main_app_mockup_01.png',
        'https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/app/img_main_app_mockup_02.png'
      ]

      criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      })
    }

    // 페이지 로드 완료 후 프리로드 실행
    if (document.readyState === 'complete') {
      preloadCriticalResources()
    } else {
      window.addEventListener('load', preloadCriticalResources)
      return () => window.removeEventListener('load', preloadCriticalResources)
    }
    
    return undefined // 명시적으로 undefined 반환
  }, [])

  // 개발 모드에서 성능 정보 표시
  if (debug && isSupported) {
    return (
      <div 
        className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg font-mono z-50"
        style={{ maxWidth: '300px' }}
      >
        <div className="font-bold mb-2">🚀 Next.js 15 Performance</div>
        
        {/* Core Web Vitals */}
        <div className="space-y-1">
          {metrics.lcp && (
            <div className={`flex justify-between ${metrics.lcp > 2500 ? 'text-red-400' : metrics.lcp > 1200 ? 'text-yellow-400' : 'text-green-400'}`}>
              <span>LCP:</span>
              <span>{Math.round(metrics.lcp)}ms</span>
            </div>
          )}
          
          {metrics.inp && (
            <div className={`flex justify-between ${metrics.inp > 200 ? 'text-red-400' : metrics.inp > 100 ? 'text-yellow-400' : 'text-green-400'}`}>
              <span>INP:</span>
              <span>{Math.round(metrics.inp)}ms</span>
            </div>
          )}
          
          {metrics.fid && (
            <div className={`flex justify-between ${metrics.fid > 100 ? 'text-red-400' : metrics.fid > 25 ? 'text-yellow-400' : 'text-green-400'}`}>
              <span>FID:</span>
              <span>{Math.round(metrics.fid)}ms</span>
            </div>
          )}
          
          {metrics.cls !== undefined && (
            <div className={`flex justify-between ${metrics.cls > 0.25 ? 'text-red-400' : metrics.cls > 0.1 ? 'text-yellow-400' : 'text-green-400'}`}>
              <span>CLS:</span>
              <span>{metrics.cls.toFixed(3)}</span>
            </div>
          )}
          
          {metrics.fcp && (
            <div className={`flex justify-between ${metrics.fcp > 3000 ? 'text-red-400' : metrics.fcp > 1800 ? 'text-yellow-400' : 'text-green-400'}`}>
              <span>FCP:</span>
              <span>{Math.round(metrics.fcp)}ms</span>
            </div>
          )}
          
          {metrics.ttfb && (
            <div className={`flex justify-between ${metrics.ttfb > 800 ? 'text-red-400' : metrics.ttfb > 200 ? 'text-yellow-400' : 'text-green-400'}`}>
              <span>TTFB:</span>
              <span>{Math.round(metrics.ttfb)}ms</span>
            </div>
          )}
        </div>

        {/* 애니메이션 설정 상태 */}
        <div className="mt-3 pt-2 border-t border-gray-600">
          <div className="flex justify-between">
            <span>Motion:</span>
            <span className={shouldReduceMotion ? 'text-yellow-400' : 'text-green-400'}>
              {animationLevel}
            </span>
          </div>
        </div>

        {/* React 19 상태 */}
        <div className="mt-2 text-blue-400 text-center">
          React 19 RC + Next.js 15
        </div>
      </div>
    )
  }

  return null
}

// 성능 메트릭 분석 유틸리티
export function analyzePerformance(metrics: PerformanceMetrics) {
  const scores = {
    lcp: metrics.lcp ? (metrics.lcp <= 1200 ? 100 : metrics.lcp <= 2500 ? 50 : 0) : 0,
    inp: metrics.inp ? (metrics.inp <= 40 ? 100 : metrics.inp <= 200 ? 50 : 0) : 0,
    fid: metrics.fid ? (metrics.fid <= 25 ? 100 : metrics.fid <= 100 ? 50 : 0) : 0,
    cls: metrics.cls !== undefined ? (metrics.cls <= 0.1 ? 100 : metrics.cls <= 0.25 ? 50 : 0) : 0,
  }

  const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0) / Object.keys(scores).length

  return {
    scores,
    totalScore,
    grade: totalScore >= 90 ? 'A' : totalScore >= 75 ? 'B' : totalScore >= 50 ? 'C' : 'D',
    recommendations: generateRecommendations(metrics)
  }
}

function generateRecommendations(metrics: PerformanceMetrics): string[] {
  const recommendations: string[] = []

  if (metrics.lcp && metrics.lcp > 2500) {
    recommendations.push('LCP 개선: 이미지 최적화 및 리소스 프리로딩 필요')
  }

  if (metrics.inp && metrics.inp > 200) {
    recommendations.push('INP 개선: JavaScript 실행 시간 단축 및 애니메이션 최적화 필요')
  }

  if (metrics.cls && metrics.cls > 0.25) {
    recommendations.push('CLS 개선: 레이아웃 이동 방지를 위한 요소 크기 명시 필요')
  }

  return recommendations
}