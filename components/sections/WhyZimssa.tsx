"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const WHY_ZIMSSA_ITEMS = [
  {
    id: 1,
    backgroundImage: "https://www.zimssa.com/assets/images/img_why_zimssa_01.png",
    mainText: "시장을 합리적으로",
    subText: "이사 시장에 남아있는 불합리성과 정보 불균형을 개선합니다."
  },
  {
    id: 2,
    backgroundImage: "https://www.zimssa.com/assets/images/img_why_zimssa_02.png",
    mainText: "누구나 쉽게 정보를 얻을 수 있도록",
    subText: "모든 이들이 가치 있는 정보를 토대로 의사결정을 할 수 있는 공간을 만들어갑니다."
  },
  {
    id: 3,
    backgroundImage: "https://www.zimssa.com/assets/images/img_why_zimssa_03.png",
    mainText: "사용자 경험을 최우선으로",
    subText: "고객, 파트너 모두에게 이용하기 편한 서비스가 될 수 있도록 고민합니다."
  }
]

export default function WhyZimssa() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % WHY_ZIMSSA_ITEMS.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + WHY_ZIMSSA_ITEMS.length) % WHY_ZIMSSA_ITEMS.length)
  }

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/30 to-transparent h-px top-1/2 -translate-y-1/2" />
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              이사 시장을 바꿔갑니다
            </motion.h1>
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent blur-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
        </div>

        {/* Desktop Grid - Hidden on Mobile */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {WHY_ZIMSSA_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card Container with Background Image */}
              <div 
                className="relative h-[400px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${item.backgroundImage})`
                }}
              >
                {/* Semi-transparent Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.mainText}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {item.subText}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel - Hidden on Desktop */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {WHY_ZIMSSA_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  {/* Card Container with Background Image */}
                  <div
                    className="relative h-[400px] rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${item.backgroundImage})`
                    }}
                  >
                    {/* Semi-transparent Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {item.mainText}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {item.subText}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Mobile Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {WHY_ZIMSSA_ITEMS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/40 w-2 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}