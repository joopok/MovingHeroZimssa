"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const REVIEWS = [
  {
    id: 1,
    name: "김민수",
    location: "서울 강남구",
    service: "가구 운송",
    rating: 5,
    date: "2024년 11월",
    content: "침대와 책상을 운송했는데 정말 꼼꼼하게 포장해주시고 안전하게 운송해주셨어요. 기사님도 친절하시고 시간 약속도 정확했습니다.",
    helpful: 42
  },
  {
    id: 2,
    name: "이서연",
    location: "경기 성남시",
    service: "가전 운송",
    rating: 5,
    date: "2024년 11월",
    content: "냉장고와 세탁기 운송을 맡겼는데 전문가답게 안전하게 포장하고 운송해주셨습니다. 설치까지 도와주셔서 너무 편했어요!",
    helpful: 38
  },
  {
    id: 3,
    name: "박준호",
    location: "인천 연수구",
    service: "소형 화물",
    rating: 5,
    date: "2024년 10월",
    content: "작은 짐이라 이사업체 부르기 애매했는데 운송 서비스로 해결했어요. 가격도 합리적이고 빠르게 처리되어 만족합니다.",
    helpful: 31
  },
  {
    id: 4,
    name: "최유진",
    location: "서울 마포구",
    service: "화분 운송",
    rating: 5,
    date: "2024년 10월",
    content: "소중한 화분들을 안전하게 운송해주셨어요. 식물 전용 포장으로 하나도 다치지 않고 잘 도착했습니다. 감사해요!",
    helpful: 27
  },
  {
    id: 5,
    name: "정현우",
    location: "경기 용인시",
    service: "가구 운송",
    rating: 5,
    date: "2024년 10월",
    content: "소파 운송을 맡겼는데 생각보다 빠르고 안전하게 운송됐어요. 층간 이동도 전문적으로 처리해주셔서 좋았습니다.",
    helpful: 35
  },
  {
    id: 6,
    name: "강민지",
    location: "서울 송파구",
    service: "가전 운송",
    rating: 5,
    date: "2024년 9월",
    content: "TV와 에어컨 운송했는데 포장부터 설치까지 완벽했어요. 다음에도 꼭 이용하고 싶습니다!",
    helpful: 29
  }
]

export default function CustomerReviews() {
  const [visibleReviews, setVisibleReviews] = useState(3)

  const showMoreReviews = () => {
    setVisibleReviews(prev => Math.min(prev + 3, REVIEWS.length))
  }

  return (
    <section className="py-20 lg:py-32 bg-gray-50">
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
            실제 이용 <span className="text-primary">고객 후기</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            짐싸 운송 서비스를 이용한 고객님들의 생생한 후기
          </p>

          {/* Overall Rating */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.9</span>
            <span className="text-gray-600">(24,831개 리뷰)</span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {REVIEWS.slice(0, visibleReviews).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                    {review.service}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                {/* Content */}
                <p className="text-gray-600 leading-relaxed flex-grow mb-4">
                  {review.content}
                </p>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    도움이 됐어요 ({review.helpful})
                  </button>
                  <button className="text-sm text-gray-500 hover:text-primary transition-colors">
                    신고
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleReviews < REVIEWS.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={showMoreReviews}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all"
            >
              더 많은 후기 보기
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}