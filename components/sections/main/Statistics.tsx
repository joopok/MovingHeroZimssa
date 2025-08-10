"use client"

import { motion } from "framer-motion"
import { memo } from "react"
interface Statistic {
  icon: string
  number: string
  label: string
  color: string
}

interface Badge {
  title: string
  subtitle: string
  description?: string
  icon?: string
  logo?: string
}

interface BaseProps {
  className?: string
}

const STATS: Statistic[] = [
  {
    icon: "👥",
    number: "2,293,644명",
    label: "누적 이용자",
    color: "bg-blue-100"
  },
  {
    icon: "⭐",
    number: "4.9점",
    label: "평균 만족도",
    color: "bg-yellow-100"
  }
]

const BADGES: Badge[] = [
  {
    title: "2023",
    subtitle: "대한민국 브랜드 대상",
    description: "이사 플랫폼 부문 1위",
    icon: "🏆"
  },
  {
    title: "인증",
    subtitle: "정보보호 관리체계",
    description: "ISMS 인증 획득",
    icon: "🛡️"
  },
  {
    title: "보험",
    subtitle: "손해배상책임보험",
    description: "최대 1억원 보상",
    icon: "📋"
  }
]

const Statistics = memo(function Statistics({ className }: BaseProps) {
  return (
    <section 
      className={`py-20 lg:py-32 bg-gray-50 ${className || ''}`}
      aria-label="통계 및 인증 섹션"
    >
      <div className="container">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            함께한 2백만 고객과<br />
            만들어 온 믿음까지
          </h2>
          <p className="text-lg text-gray-600">
            수많은 고객님들과 함께 성장해온 서비스입니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className={`w-20 h-20 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <span className="text-4xl">{stat.icon}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <div className="grid md:grid-cols-3 gap-6">
          {BADGES.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <div className="text-sm font-bold text-primary mb-1">{badge.title}</div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{badge.subtitle}</div>
                  <div className="text-sm text-gray-600">{badge.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
})

Statistics.displayName = 'Statistics'

export default Statistics