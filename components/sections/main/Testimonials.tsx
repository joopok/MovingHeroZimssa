"use client"

import { motion } from "framer-motion"
import { useState, useCallback, memo, useMemo } from "react"

interface Testimonial {
  id: number
  name: string
  location: string
  service: string
  rating: number
  content: string
  date: string
  profileColor: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "김민수",
    location: "서울 강남구",
    service: "포장이사",
    rating: 5,
    content: "처음 이사하는 거라 걱정이 많았는데, 정말 꼼꼼하게 포장해주시고 친절하게 설명해주셔서 너무 좋았어요. 가구 하나하나 신경써주시는 모습에 감동받았습니다.",
    date: "2024.11.15",
    profileColor: "bg-blue-500"
  },
  {
    id: 2,
    name: "이서연",
    location: "경기도 성남시",
    service: "입주청소",
    rating: 5,
    content: "새 아파트 입주 전 청소를 맡겼는데 정말 깨끗하게 해주셨어요. 구석구석 꼼꼼하게 청소해주시고, 특히 화장실이랑 주방이 반짝반짝해져서 만족합니다!",
    date: "2024.11.14",
    profileColor: "bg-purple-500"
  },
  {
    id: 3,
    name: "박준호",
    location: "인천 연수구",
    service: "소형화물 운송",
    rating: 5,
    content: "중고 가구를 구매했는데 운송이 걱정이었어요. 시간 약속도 정확하게 지켜주시고, 무거운 가구도 안전하게 운송해주셔서 감사했습니다. 가격도 합리적이었어요.",
    date: "2024.11.13",
    profileColor: "bg-green-500"
  },
  {
    id: 4,
    name: "최은지",
    location: "서울 마포구",
    service: "원룸이사",
    rating: 5,
    content: "혼자 사는 여자라 걱정이 많았는데, 정말 안심하고 맡길 수 있었어요. 짐도 조심스럽게 다뤄주시고, 새 집에 가구 배치도 도와주셔서 너무 감사했습니다.",
    date: "2024.11.12",
    profileColor: "bg-pink-500"
  },
  {
    id: 5,
    name: "정태영",
    location: "경기도 용인시",
    service: "사무실이사",
    rating: 5,
    content: "사무실 이사를 맡겼는데 전문적으로 처리해주셨어요. 컴퓨터나 서류 같은 중요한 물품들도 안전하게 포장해주시고, 일정도 맞춰주셔서 업무에 지장이 없었습니다.",
    date: "2024.11.11",
    profileColor: "bg-indigo-500"
  }
]

interface TestimonialsProps {
  className?: string
}

const Testimonials = memo(function Testimonials({ className }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonialsPerPage = 3

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => 
      prev + testimonialsPerPage >= TESTIMONIALS.length ? 0 : prev + testimonialsPerPage
    )
  }, [testimonialsPerPage])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => 
      prev - testimonialsPerPage < 0 
        ? Math.max(0, TESTIMONIALS.length - testimonialsPerPage) 
        : prev - testimonialsPerPage
    )
  }, [testimonialsPerPage])

  const visibleTestimonials = useMemo(
    () => TESTIMONIALS.slice(currentIndex, currentIndex + testimonialsPerPage),
    [currentIndex, testimonialsPerPage]
  )

  const totalPages = useMemo(
    () => Math.ceil(TESTIMONIALS.length / testimonialsPerPage),
    [testimonialsPerPage]
  )

  const currentPage = useMemo(
    () => Math.floor(currentIndex / testimonialsPerPage),
    [currentIndex, testimonialsPerPage]
  )

  return (
    <section 
      className={`py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white ${className || ''}`}
      aria-label="고객 후기 섹션"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            고객님들의 생생한 후기
          </h2>
          <p className="text-lg text-gray-600">
            실제 서비스를 이용한 고객님들의 솔직한 이야기를 들어보세요
          </p>
        </motion.div>

        <div className="relative">
          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${testimonial.profileColor} rounded-full flex items-center justify-center text-white font-bold`}>
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                    {testimonial.service}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-600 ml-1">5.0</span>
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-4 line-clamp-4">
                  {testimonial.content}
                </p>

                {/* Date */}
                <div className="text-sm text-gray-500">
                  {testimonial.date}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={prevSlide}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === 0}
              aria-label="이전 후기 보기"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="후기 페이지 선택">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * testimonialsPerPage)}
                  className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-primary ${
                    currentPage === index
                      ? 'w-8 bg-primary'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  role="tab"
                  aria-selected={currentPage === index}
                  aria-label={`후기 ${index + 1}페이지 보기`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex + testimonialsPerPage >= TESTIMONIALS.length}
              aria-label="다음 후기 보기"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'

export default Testimonials