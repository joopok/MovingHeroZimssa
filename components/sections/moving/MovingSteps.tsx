"use client"

import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const MOVING_STEPS = [
  {
    step: 1,
    title: "서비스 선택하기",
    description: "이사 유형을 선택하고\n필요한 서비스를 고르세요",
    icon: "📋",
    color: "bg-blue-50 text-blue-600"
  },
  {
    step: 2,
    title: "이사 정보 입력하기",
    description: "이사 날짜, 출발지, 도착지 등\n기본 정보를 입력하세요",
    icon: "📝",
    color: "bg-green-50 text-green-600"
  },
  {
    step: 3,
    title: "이사 견적 비교하기",
    description: "최대 9개 업체의 견적을\n한번에 비교해보세요",
    icon: "📊",
    color: "bg-purple-50 text-purple-600"
  },
  {
    step: 4,
    title: "이사 확정하기",
    description: "마음에 드는 업체를 선택하고\n이사를 확정하세요",
    icon: "✅",
    color: "bg-orange-50 text-orange-600"
  }
]

export default function MovingSteps() {
  const { isIntersecting, setRef } = useIntersectionObserver({
    threshold: 0.1,
    once: true
  })
  const shouldReduceMotion = useReducedMotion()

  return (
    <section 
      ref={setRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-2xl" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            몇 번의 탭이면 끝나는<br />
            <span className="text-primary">간편한 이사 준비</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            복잡한 이사 준비, 이제 스마트폰 하나로 간단하게 해결하세요
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {MOVING_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ 
                duration: 0.8, 
                delay: shouldReduceMotion ? 0 : 0.2 + (index * 0.1) 
              }}
              className="relative"
            >
              {/* Connector Line - Desktop only */}
              {index < MOVING_STEPS.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isIntersecting ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: shouldReduceMotion ? 0 : 0.8 + (index * 0.2)
                  }}
                  className="hidden lg:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 origin-left"
                />
              )}

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group">
                {/* Step Number */}
                <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full text-lg font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {step.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ zIndex: -1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            지금 시작해보세요! 3분이면 견적 요청 완료
          </p>
          <motion.button
            whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
            whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
            className="px-10 py-4 bg-primary text-white font-bold rounded-full text-lg shadow-lg hover:bg-primary/90 transition-all duration-200"
          >
            이사 견적 받기
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}