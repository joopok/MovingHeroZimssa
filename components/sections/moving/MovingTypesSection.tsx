"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const MOVING_TYPES = {
  small: {
    title: "소형이사",
    subtitle: "1인 가구, 원룸, 고시원",
    description: "짐이 적은 소형 이사를 위한 맞춤 서비스",
    features: [
      "원룸/고시원 전문",
      "소형 트럭 이용",
      "2-3시간 내 완료",
      "합리적인 가격"
    ],
    price: "15만원부터",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    icon: "🏠"
  },
  home: {
    title: "가정이사",
    subtitle: "아파트, 빌라, 주택",
    description: "가족 단위 이사를 위한 전문적인 서비스",
    features: [
      "가정용 가구 전문",
      "대형 트럭 이용",
      "포장/해체 서비스",
      "안전한 운송"
    ],
    price: "35만원부터",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    icon: "🏡"
  }
}

export default function MovingTypesSection() {
  const [activeTab, setActiveTab] = useState<'small' | 'home'>('small')
  const { isIntersecting, setRef } = useIntersectionObserver({
    threshold: 0.1,
    once: true
  })
  const shouldReduceMotion = useReducedMotion()

  const currentType = MOVING_TYPES[activeTab]

  return (
    <section 
      ref={setRef}
      className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden"
    >
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            우리집 이사는<br />
            <span className="text-primary">어떻게 진행할까요?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            집의 크기와 이사 규모에 따라 최적화된 서비스를 제공해드립니다
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-full p-2 shadow-lg inline-flex">
            {Object.entries(MOVING_TYPES).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as 'small' | 'home')}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex items-center gap-3 ${currentType.bgColor} ${currentType.textColor} px-4 py-2 rounded-full mb-6`}
              >
                <span className="text-2xl">{currentType.icon}</span>
                <span className="font-bold">{currentType.subtitle}</span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              >
                {currentType.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 mb-8"
              >
                {currentType.description}
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 mb-8"
              >
                {currentType.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: shouldReduceMotion ? 0 : 0.4 + (index * 0.1)
                    }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentType.color} flex items-center justify-center`}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Price & CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div>
                  <span className="text-2xl font-bold text-gray-900">{currentType.price}</span>
                  <span className="text-gray-600 ml-2">기준</span>
                </div>
                <motion.button
                  whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
                  className={`px-6 py-3 bg-gradient-to-r ${currentType.color} text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200`}
                >
                  {currentType.title} 견적받기
                </motion.button>
              </motion.div>
            </div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className={`bg-gradient-to-br ${currentType.color} rounded-3xl p-8 shadow-2xl`}>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{currentType.icon}</div>
                    <h4 className="text-xl font-bold">{currentType.title} 프로세스</h4>
                  </div>
                  
                  {/* Process Steps */}
                  <div className="space-y-3">
                    {[
                      "정보 입력 (2분)",
                      "견적 비교 (5분)",
                      "업체 선택 (3분)",
                      "이사 완료 ✅"
                    ].map((step, index) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: shouldReduceMotion ? 0 : 0.6 + (index * 0.1)
                        }}
                        className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
                      >
                        <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              {!shouldReduceMotion && isIntersecting && (
                <>
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-300 rounded-full opacity-80"
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/40 rounded-full"
                    animate={{
                      x: [0, 10, 0],
                      scale: [1, 0.9, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "2,400+", label: "검증된 파트너" },
            { number: "98.5%", label: "고객 만족도" },
            { number: "15분", label: "평균 견적 시간" },
            { number: "24시간", label: "고객 지원" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isIntersecting ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.5, 
                delay: shouldReduceMotion ? 0 : 0.9 + (index * 0.1)
              }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}