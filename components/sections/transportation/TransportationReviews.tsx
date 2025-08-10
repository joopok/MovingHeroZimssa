"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TransportationReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      rating: 5.0,
      service: "용달",
      partnerName: "김철수 파트너",
      review: "가구 몇 개만 옮기는 거라 용달 서비스를 이용했는데, 정말 빠르고 안전하게 옮겨주셨어요. 기사님도 친절하시고 가격도 합리적이었습니다!",
      date: "2025.08.05",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/customer/review_delivery_1.jpg"
    },
    {
      rating: 4.9,
      service: "화물",
      partnerName: "이영희 파트너",
      review: "대형 가전제품을 옮겨야 했는데 화물 서비스로 안전하게 운송되었습니다. 포장도 꼼꼼하게 해주시고 시간 약속도 정확했어요.",
      date: "2025.08.03",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/customer/review_delivery_2.jpg"
    },
    {
      rating: 5.0,
      service: "퀵서비스",
      partnerName: "박민수 파트너",
      review: "급하게 서류를 보내야 했는데 퀵서비스로 빠르게 해결했습니다. 실시간으로 위치 추적도 되고 정말 편리했어요!",
      date: "2025.08.01",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/customer/review_delivery_3.jpg"
    },
    {
      rating: 4.8,
      service: "용달",
      partnerName: "최지훈 파트너",
      review: "원룸에서 투룸으로 이사하면서 용달 서비스 이용했습니다. 짐이 많지 않아서 용달로 충분했고, 기사님이 정말 꼼꼼하게 챙겨주셨어요.",
      date: "2025.07.28",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/customer/review_delivery_4.jpg"
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            짐싸 이용자들의 진짜 리뷰
          </h2>
          <p className="text-lg text-gray-600">
            실제 운송 서비스를 이용한 고객들의 생생한 후기
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Review Content */}
                      <div>
                        {/* Rating and Service */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-sm font-semibold text-gray-900">
                              {review.rating}
                            </span>
                          </div>
                          <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">
                            {review.service}
                          </span>
                        </div>

                        {/* Partner Name */}
                        <p className="text-sm text-gray-600 mb-4">
                          파트너: {review.partnerName}
                        </p>

                        {/* Review Text */}
                        <p className="text-gray-700 leading-relaxed mb-4">
                          "{review.review}"
                        </p>

                        {/* Date */}
                        <p className="text-xs text-gray-500">
                          {review.date}
                        </p>
                      </div>

                      {/* Review Image */}
                      <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={review.image}
                          alt="리뷰 이미지"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="이전 리뷰"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="다음 리뷰"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-8 bg-primary' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`리뷰 ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}