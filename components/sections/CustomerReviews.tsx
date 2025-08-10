"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "고OO",
    service: "포장이사",
    company: "청솔이사",
    rating: 5,
    date: "2024.12.09",
    content: "짐싸 서비스를 3번째 이용중인데 이번에도 완전 만족스러웠습니다. 짐도 안전하게 잘 옮겨주시고 친절하셔서 좋았어요. 다음 이사때도 또 이용할 예정입니다!",
    avatar: "고"
  },
  {
    id: 2,
    name: "박OO",
    service: "반포장이사", 
    company: "가자이사",
    rating: 5,
    date: "2024.12.08",
    content: "견적도 빠르게 받을 수 있고 가격 비교가 쉬워서 좋았어요. 이사 당일에도 약속 시간 정확하게 지켜주시고, 꼼꼼하게 포장해주셔서 파손 없이 잘 이사했습니다.",
    avatar: "박"
  },
  {
    id: 3,
    name: "이OO",
    service: "원룸이사",
    company: "한국이사",
    rating: 5,
    date: "2024.12.07",
    content: "첫 자취 이사인데 짐싸 덕분에 쉽게 해결했어요! 업체별로 견적 비교하고 리뷰 보면서 선택할 수 있어서 안심하고 맡길 수 있었습니다.",
    avatar: "이"
  },
  {
    id: 4,
    name: "김OO",
    service: "입주청소",
    company: "깨끗한청소",
    rating: 5,
    date: "2024.12.06", 
    content: "이사와 함께 입주청소도 예약했는데 너무 만족스러워요. 구석구석 깨끗하게 청소해주시고, 친절하게 설명도 해주셔서 좋았습니다. 새집 같아요!",
    avatar: "김"
  },
  {
    id: 5,
    name: "최OO",
    service: "사무실이사",
    company: "프로이사",
    rating: 5,
    date: "2024.12.05",
    content: "사무실 이사는 걱정이 많았는데 전문적으로 잘 처리해주셨어요. 중요한 서류와 장비들도 체계적으로 포장하고 라벨링까지 해주셔서 정리가 쉬웠습니다.",
    avatar: "최"
  },
]

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-20 lg:py-32" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <div className="container">
        {/* Section Header - Exact Zimssa Title */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
              짐싸 이용자들의 진짜 리뷰
            </h2>
            <p className="text-xl lg:text-2xl text-neutral-600">
              실제 경험을 바탕으로 한 솔직한 후기
            </p>
          </motion.div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-200">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 lg:top-12 lg:right-12">
              <Quote className="w-16 h-16 text-primary/10 rotate-180" />
            </div>

            {/* Review Content */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Review Text */}
              <div className="mb-8">
                <p className="text-xl lg:text-2xl text-neutral-800 leading-relaxed font-medium">
                  "{reviews[currentIndex]?.content || ''}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < (reviews[currentIndex]?.rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-neutral-300"
                    }`}
                  />
                ))}
                <span className="ml-3 text-lg font-semibold text-neutral-700">
                  {reviews[currentIndex]?.rating || 0}.0
                </span>
              </div>

              {/* Reviewer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {reviews[currentIndex]?.avatar || ''}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-neutral-900">
                      {reviews[currentIndex]?.name || ''}
                    </p>
                    <p className="text-base text-neutral-600">
                      {reviews[currentIndex]?.service || ''} • {reviews[currentIndex]?.company || ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base text-neutral-500">
                    {reviews[currentIndex]?.date || ''}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-16 bg-white shadow-xl rounded-full p-4 hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="이전 리뷰"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-700" />
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-16 bg-white shadow-xl rounded-full p-4 hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200"
            aria-label="다음 리뷰"
          >
            <ChevronRight className="w-6 h-6 text-neutral-700" />
          </button>
        </div>

        {/* Review Indicators */}
        <div className="flex justify-center space-x-3 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-10 shadow-lg"
                  : "bg-neutral-400 w-3 hover:bg-neutral-500"
              }`}
              aria-label={`리뷰 ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Stats - Matching Zimssa */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-200"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">241,798</p>
              <p className="text-neutral-600 font-medium">앱 리뷰</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.9</p>
              <p className="text-neutral-600 font-medium">앱 만족도</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">89,524</p>
              <p className="text-neutral-600 font-medium">서비스 리뷰</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.9</p>
              <p className="text-neutral-600 font-medium">서비스 만족도</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}