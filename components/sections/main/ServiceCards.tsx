"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { memo } from "react"

interface Service {
  id: number
  title: string
  subtitle: string
  description: string
  bgColor: string
  icon: string
  link: string
}

const SERVICES: Service[] = [
  {
    id: 1,
    title: "이사",
    subtitle: "포장이사부터 일반이사까지",
    description: "전문 포장팀이 안전하게 포장하고 운송합니다",
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
    icon: "🏠",
    link: "/moving"
  },
  {
    id: 2,
    title: "청소",
    subtitle: "입주청소부터 이사청소까지",
    description: "깨끗한 새 시작을 위한 전문 청소 서비스",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-700",
    icon: "🧹",
    link: "/cleaning"
  },
  {
    id: 3,
    title: "운송",
    subtitle: "소형화물부터 대형화물까지",
    description: "안전하고 빠른 화물 운송 서비스",
    bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
    icon: "📦",
    link: "/delivery"
  }
]

interface ServiceCardsProps {
  className?: string
}

const ServiceCards = memo(function ServiceCards({ className }: ServiceCardsProps) {
  return (
    <section 
      className={`py-12 lg:py-16 bg-gray-50 ${className || ''}`}
      aria-label="서비스 카드 섹션"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            언제 짐싸를 이용하나요?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link 
                href={service.link}
                className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
                aria-label={`${service.title} 서비스 상세 정보 보기`}
              >
                <div className={`${service.bgColor} rounded-2xl p-8 h-[280px] relative overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full" />
                    <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white rounded-full" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="mb-4">
                      <span className="text-4xl" role="img" aria-label={service.title}>{service.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-white/90 text-sm mb-2">
                      {service.subtitle}
                    </p>
                    <p className="text-white/70 text-xs mt-auto">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Effect Arrow */}
                  <div className="absolute bottom-4 right-4 transform translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

ServiceCards.displayName = 'ServiceCards'

export default ServiceCards