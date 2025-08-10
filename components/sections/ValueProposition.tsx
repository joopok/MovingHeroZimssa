"use client"

import { motion } from "framer-motion"

const VALUES = [
  {
    title: "투명한 가격",
    description: "실시간 견적 비교로\n합리적인 가격 선택",
    icon: "💰",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "검증된 파트너",
    description: "꼼꼼한 검증을 거친\n믿을 수 있는 파트너사",
    icon: "✅",
    color: "from-green-500 to-green-600"
  },
  {
    title: "실제 리뷰",
    description: "24만개 이상의\n실제 이용 후기",
    icon: "⭐",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    title: "안심 보장",
    description: "보증보험과 고객센터로\n안전한 서비스 보장",
    icon: "🛡️",
    color: "from-purple-500 to-purple-600"
  }
]

export default function ValueProposition() {
  return (
    <section className="py-20 lg:py-24 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            왜 <span className="text-primary">짐싸</span>를 선택해야 할까요?
          </h2>
          <p className="text-lg text-gray-600">
            이사, 청소, 운송 서비스의 새로운 기준을 제시합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="relative p-8">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {value.description}
                  </p>
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-700 mb-6">
            지금 바로 짐싸 앱에서 견적을 받아보세요
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white font-bold px-10 py-4 rounded-full text-lg transition-colors">
            무료 견적 받기
          </button>
        </motion.div>
      </div>
    </section>
  )
}