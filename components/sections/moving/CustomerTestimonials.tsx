"use client"

import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { useState, useEffect } from "react"

const TESTIMONIALS = [
  {
    id: 1,
    name: "김**님",
    location: "서울 강남구",
    type: "원룸이사",
    rating: 5,
    comment: "처음 이사라서 걱정이 많았는데, 친절하게 안내해주시고 꼼꼼하게 포장해주셔서 만족했어요!",
    date: "2024.11.15",
    profileColor: "bg-blue-500"
  },
  {
    id: 2,
    name: "박**님", 
    location: "부산 해운대구",
    type: "가정이사",
    rating: 5,
    comment: "3개 업체 견적을 비교할 수 있어서 좋았고, 선택한 업체도 정말 믿을만했어요. 추천합니다!",
    date: "2024.11.12",
    profileColor: "bg-green-500"
  },
  {
    id: 3,
    name: "최**님",
    location: "대구 중구", 
    type: "소형이사",
    rating: 5,
    comment: "앱으로 간단하게 신청하고 빠르게 견적을 받을 수 있어서 편했어요. 가격도 합리적이었습니다.",
    date: "2024.11.10",
    profileColor: "bg-purple-500"
  },
  {
    id: 4,
    name: "이**님",
    location: "인천 남동구",
    type: "가정이사",
    rating: 5,
    comment: "무거운 가구도 안전하게 운반해주시고, 새집에서도 위치까지 잘 배치해주셔서 감사했어요.",
    date: "2024.11.08",
    profileColor: "bg-orange-500"
  }
]

export default function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { isIntersecting, setRef } = useIntersectionObserver({
    threshold: 0.1,
    once: true
  })
  const shouldReduceMotion = useReducedMotion()

  // Auto slide
  useEffect(() => {
    if (shouldReduceMotion) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  return (
    <section 
      ref={setRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-200/30 rounded-full blur-xl" />
      
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            고객들의 생생한<br />
            <span className="text-primary">이사 후기</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            실제 이용하신 고객들의 솔직한 후기를 확인해보세요
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(currentIndex, currentIndex + 3).map((_, index) => {
              const actualIndex = (currentIndex + index) % TESTIMONIALS.length
              const actualTestimonial = TESTIMONIALS[actualIndex]
              
              if (!actualTestimonial) return null
              
              return (
                <motion.div
                  key={actualTestimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: shouldReduceMotion ? 0 : index * 0.1
                  }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${actualTestimonial.profileColor} rounded-full flex items-center justify-center text-white font-bold`}>
                      {actualTestimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{actualTestimonial.name}</div>
                      <div className="text-sm text-gray-600">{actualTestimonial.location}</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(actualTestimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{actualTestimonial.type}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
                    "{actualTestimonial.comment}"
                  </p>

                  {/* Date */}
                  <div className="text-xs text-gray-500">
                    {actualTestimonial.date}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isIntersecting ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center mt-8 gap-2"
          >
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">4.9</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="text-gray-600">
              <span className="font-bold text-gray-900">12,847</span>개의 후기
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}