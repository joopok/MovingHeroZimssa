"use client"

import { motion } from "framer-motion"

const FEATURES = [
  {
    icon: "🛡️",
    title: "안전한 운송",
    description: "철저한 포장과 안전 운전으로 물품을 안전하게 운송합니다",
    stats: "파손율 0.01%"
  },
  {
    icon: "⏰",
    title: "정시 도착",
    description: "약속한 시간에 정확하게 도착하여 고객님의 시간을 지킵니다",
    stats: "정시율 98.5%"
  },
  {
    icon: "💰",
    title: "투명한 가격",
    description: "숨겨진 비용 없이 투명하고 합리적인 가격을 제공합니다",
    stats: "추가비용 0원"
  },
  {
    icon: "⭐",
    title: "검증된 파트너",
    description: "엄격한 심사를 통과한 전문 운송 파트너만 서비스를 제공합니다",
    stats: "평균평점 4.9"
  },
  {
    icon: "📍",
    title: "실시간 추적",
    description: "운송 과정을 실시간으로 확인하고 안심할 수 있습니다",
    stats: "GPS 추적 100%"
  },
  {
    icon: "🤝",
    title: "보험 적용",
    description: "모든 운송에 자동으로 보험이 적용되어 안심하고 이용 가능합니다",
    stats: "최대 1억원"
  }
]

export default function TrustFeatures() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
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
            짐싸 운송이 <span className="text-primary">특별한 이유</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            200만 고객이 선택한 1등 운송 플랫폼의 차별화된 서비스
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{feature.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-2xl font-bold text-primary">
                    {feature.stats}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-primary rounded-3xl p-8 lg:p-12"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">2M+</p>
              <p className="text-blue-100">누적 이용자</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">15만</p>
              <p className="text-blue-100">월간 운송 건수</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">2,400</p>
              <p className="text-blue-100">검증된 파트너</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-white mb-2">4.9</p>
              <p className="text-blue-100">평균 만족도</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}