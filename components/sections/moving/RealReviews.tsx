"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function RealReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      title: "이사 전문가를 만났어요",
      content: "처음 해보는 장거리 이사라 걱정이 많았는데, 짐싸에서 전문가를 만났어요. 포장부터 정리까지 완벽했습니다.",
      author: "김○○님",
      service: "포장이사",
      rating: 5.0,
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/review/review_move_1.jpg"
    },
    {
      title: "합리적인 가격에 만족",
      content: "여러 업체 견적을 한번에 비교할 수 있어서 좋았어요. 가격도 합리적이고 서비스도 만족스러웠습니다.",
      author: "이○○님",
      service: "원룸이사",
      rating: 4.9,
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/review/review_move_2.jpg"
    },
    {
      title: "친절하고 꼼꼼해요",
      content: "기사님들이 정말 친절하시고 짐도 꼼꼼하게 챙겨주셨어요. 다음에도 짐싸 이용할 예정입니다!",
      author: "박○○님",
      service: "사무실이사",
      rating: 5.0,
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/review/review_move_3.jpg"
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-20 bg-secondary" style={{ backgroundColor: '#FFE200' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                진짜 이용자들의<br />
                진짜 리뷰만
              </h2>
              <p className="text-lg text-gray-800 mb-8">
                실제 짐싸를 통해 이사한 고객님들의<br />
                생생한 후기를 확인해보세요.
              </p>

              {/* Review Carousel */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="relative">
                  <div className="mb-4">
                    <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full mb-2">
                      {reviews[currentIndex]?.service || ''}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {reviews[currentIndex]?.title || ''}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {reviews[currentIndex]?.content || ''}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{reviews[currentIndex]?.author || ''}</span>
                      <div className="flex items-center gap-1">
                        {"★".repeat(Math.floor(reviews[currentIndex]?.rating || 0))}
                        <span className="text-sm font-bold">{reviews[currentIndex]?.rating || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={prevSlide}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      aria-label="이전 리뷰"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      aria-label="다음 리뷰"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Images */}
            <div className="grid grid-cols-2 gap-4">
              {reviews.map((review, index) => (
                <div 
                  key={index}
                  className={`rounded-lg overflow-hidden transition-all ${
                    index === currentIndex ? 'ring-4 ring-white shadow-lg' : 'opacity-70'
                  }`}
                >
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      // Use a simple data URL for a gray placeholder instead of a missing file
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuumrOu3sCDsnbTrr7jsp4A8L3RleHQ+Cjwvc3ZnPgo='
                      target.onerror = null // Prevent infinite loop if the data URL also fails
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}