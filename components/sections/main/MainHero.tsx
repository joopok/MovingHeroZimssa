"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { memo } from "react"

interface MainHeroProps {
  className?: string
}

const MainHero = memo(function MainHero({ className }: MainHeroProps) {
  return (
    <section 
      className={`relative min-h-[600px] lg:min-h-[700px] overflow-hidden ${className || ''}`}
      aria-label="메인 히어로 섹션"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2832&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="img"
        aria-label="이사 배경 이미지"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="container relative z-10 h-full min-h-[600px] lg:min-h-[700px] flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            새로운 집, 새로운 시작<br />
            믿을 수 있는 이사 파트너
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/90 mb-8">
            전문 파트너와 함께하는 안전한 이사
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all transform hover:scale-105 shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="무료 견적 요청하기"
            >
              <span className="text-lg">무료 견적받기</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/app-download"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              aria-label="모바일 앱 다운로드"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              앱 다운로드
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Performance Optimized */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          repeatType: "reverse"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        role="button"
        aria-label="아래로 스크롤"
        style={{ willChange: "transform" }}
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
})

MainHero.displayName = 'MainHero'

export default MainHero