"use client"

import { motion } from "framer-motion"

const SERVICE_TYPES = [
  {
    id: "small",
    title: "소형 화물",
    subtitle: "작은 물건도 안전하게",
    description: "박스, 가전제품, 소형 가구 등 혼자 들기 어려운 물건들을 안전하게 운송합니다",
    icon: "📦",
    features: [
      "당일 운송 가능",
      "실시간 위치 추적",
      "포장 서비스 제공",
      "보험 적용"
    ],
    price: "15,000원~",
    popular: false
  },
  {
    id: "furniture",
    title: "가구 운송",
    subtitle: "전문가가 안전하게",
    description: "침대, 소파, 책상 등 대형 가구를 전문 장비로 안전하게 운송합니다",
    icon: "🛋️",
    features: [
      "전문 포장 서비스",
      "조립/해체 서비스",
      "층간 운송 가능",
      "파손 보상 보험"
    ],
    price: "30,000원~",
    popular: true
  },
  {
    id: "appliance",
    title: "가전 운송",
    subtitle: "정밀 기기도 걱정 없이",
    description: "냉장고, 세탁기, TV 등 고가의 가전제품을 안전하게 운송합니다",
    icon: "📺",
    features: [
      "전문 포장재 사용",
      "충격 방지 운송",
      "설치 서비스",
      "A/S 연계"
    ],
    price: "25,000원~",
    popular: false
  },
  {
    id: "plant",
    title: "화분/식물",
    subtitle: "생명을 소중하게",
    description: "화분, 관엽식물 등 식물을 스트레스 없이 안전하게 운송합니다",
    icon: "🪴",
    features: [
      "식물 전용 포장",
      "온도 관리 운송",
      "물주기 서비스",
      "이식 도움"
    ],
    price: "20,000원~",
    popular: false
  }
]

export default function ServiceTypes() {
  return (
    <section className="py-20 lg:py-32 bg-white">
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
            다양한 <span className="text-primary">운송 서비스</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            작은 물건부터 대형 가구까지, 모든 운송을 책임집니다
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICE_TYPES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full ${
                service.popular ? 'ring-2 ring-primary' : ''
              }`}>
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                      인기
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-3xl">{service.icon}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">시작 가격</p>
                        <p className="text-2xl font-bold text-gray-900">{service.price}</p>
                      </div>
                      <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors">
                        견적받기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">원하는 서비스를 찾지 못하셨나요?</p>
          <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
            전체 서비스 보기
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  )
}