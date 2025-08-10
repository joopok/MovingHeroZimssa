"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function MovingPartners() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const partners = [
    {
      name: "김철수 파트너",
      company: "안심이사",
      rating: 4.9,
      reviews: 523,
      services: ["포장이사", "원룸이사"],
      introduction: "15년 경력의 이사 전문가입니다. 고객님의 소중한 짐을 안전하게 옮겨드립니다.",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partners/partner1.jpg"
    },
    {
      name: "이영희 파트너",
      company: "프로이사",
      rating: 4.8,
      reviews: 412,
      services: ["포장이사", "사무실이사"],
      introduction: "꼼꼼한 포장과 체계적인 이사 서비스로 고객 만족도 1위를 목표로 합니다.",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partners/partner2.jpg"
    },
    {
      name: "박민수 파트너",
      company: "빠른이사",
      rating: 5.0,
      reviews: 687,
      services: ["원룸이사", "소형이사"],
      introduction: "신속하고 정확한 이사 서비스를 제공합니다. 합리적인 가격으로 만나보세요.",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partners/partner3.jpg"
    },
    {
      name: "최지훈 파트너",
      company: "든든이사",
      rating: 4.9,
      reviews: 892,
      services: ["포장이사", "반포장이사"],
      introduction: "20년 노하우로 안전한 이사를 보장합니다. 믿고 맡겨주세요.",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partners/partner4.jpg"
    },
    {
      name: "정수연 파트너",
      company: "깔끔이사",
      rating: 4.7,
      reviews: 334,
      services: ["원룸이사", "투룸이사"],
      introduction: "여성 고객님들이 편안하게 이용할 수 있는 친절한 서비스를 제공합니다.",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partners/partner5.jpg"
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 3 >= partners.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, partners.length - 3) : prev - 1
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            짐싸 파트너들의 이야기
          </h2>
          <p className="text-lg text-gray-600">
            검증된 이사 전문가들을 만나보세요
          </p>
        </div>

        {/* Partners Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
            >
              {partners.map((partner, index) => (
                <div key={index} className="w-full md:w-1/3 flex-shrink-0">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                    {/* Partner Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">{partner.name}</h3>
                        <p className="text-sm text-gray-600">{partner.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="font-bold">{partner.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">리뷰 {partner.reviews}개</p>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {partner.services.map((service, sIndex) => (
                        <span key={sIndex} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Introduction */}
                    <p className="text-sm text-gray-600 mb-4">
                      {partner.introduction}
                    </p>

                    {/* Action Button */}
                    <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                      프로필 보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="이전"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="다음"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  )
}