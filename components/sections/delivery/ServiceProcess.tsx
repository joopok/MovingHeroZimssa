"use client"

import { motion } from "framer-motion"

const PROCESS_STEPS = [
  {
    number: "01",
    title: "서비스 선택",
    description: "운송 서비스를 선택하고 필요한 정보를 입력하세요",
    icon: "📱",
    color: "bg-blue-100",
    borderColor: "border-blue-300"
  },
  {
    number: "02",
    title: "운송 정보 입력",
    description: "출발지, 도착지, 물품 정보를 상세히 입력해주세요",
    icon: "📝",
    color: "bg-green-100",
    borderColor: "border-green-300"
  },
  {
    number: "03",
    title: "파트너사 견적 비교",
    description: "최대 9개 파트너사의 견적을 한눈에 비교하세요",
    icon: "💰",
    color: "bg-yellow-100",
    borderColor: "border-yellow-300"
  },
  {
    number: "04",
    title: "운송 파트너 확정",
    description: "마음에 드는 파트너를 선택하고 운송을 진행하세요",
    icon: "✅",
    color: "bg-purple-100",
    borderColor: "border-purple-300"
  }
]

export default function ServiceProcess() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            간단한 <span className="text-primary">4단계</span> 프로세스
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            복잡한 절차 없이 간단하게 운송 서비스를 이용하세요
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-yellow-200 to-purple-200" />

          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-4 border-2 ${step.borderColor}`}>
                  <span className="text-4xl">{step.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (except last item) */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg">
            지금 시작하기
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}