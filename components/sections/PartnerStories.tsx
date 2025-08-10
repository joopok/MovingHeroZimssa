"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const PARTNER_STORIES = [
  {
    id: 1,
    name: "김지찬",
    service: "소형이사",
    rating: "짐싸 평점 4.9",
    image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partner_interview/20240118/zimssa2-1c70ff3c-b977-4a93-add1-3b6af14b0307.png",
    quote: "이사경력은 저의 반 평생을 함께했기 때문에 저는 요령이라고 보거든요. 다른 사람들보다 더 빠르고 꼼꼼하게 할 수 있고요. 비가 오면 비올 때의 이사방법, 눈이 오면 눈올 때의 이사방법이 다 달라져요. 그런 노하우들이 쌓여있으니까 어떤 상황이든 대처할 수 있습니다.",
    detail: "더 자세한 이야기 보기"
  },
  {
    id: 2,
    name: "장석봉",
    service: "소형이사",
    rating: "짐싸 평점 4.9",
    image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partner_interview/20240118/zimssa2-bacc4160-cfb2-477f-b129-bda2d70b6d88.png",
    quote: "이사일은 친절한 서비스가 제일 중요하다 생각해요. 고객분들이 이사하시는 날은 정말 힘들고 스트레스 받는 날이잖아요. 그럴 때 저희가 친절하게 도와드리면 고객분들이 정말 고마워하시고, 그게 저에게도 큰 보람이 됩니다.",
    detail: "더 자세한 이야기 보기"
  },
  {
    id: 3,
    name: "서상진",
    service: "청소",
    rating: "짐싸 평점 4.9",
    image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partner_interview/20240118/zimssa2-c67ab61c-493f-4b7b-9e15-291ac89e6bc8.jpg",
    quote: "청소일은 오염된 부분을 없애주는 마술사같은 일이죠. 더러웠던 곳이 깨끗해지는 걸 보면서 고객분들이 기뻐하시는 모습을 볼 때 정말 뿌듯합니다. 특히 입주청소 같은 경우에는 새로운 보금자리를 깨끗하게 만들어드리는 거니까 더욱 책임감을 갖고 일하고 있어요.",
    detail: "더 자세한 이야기 보기"
  },
  {
    id: 4,
    name: "박성민",
    service: "가정이사",
    rating: "짐싸 평점 4.8",
    image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partner_interview/20230726/zimssa2-e93652cb-7fcd-4a44-b317-8f9f3b941a93.png",
    quote: "20년 넘게 이사 일을 해왔는데, 짐싸를 통해서 더 많은 고객분들을 만날 수 있게 되었어요. 투명한 리뷰 시스템 덕분에 정직하게 일하는 업체가 인정받을 수 있어서 좋습니다. 앞으로도 최선을 다해 고객만족을 위해 노력하겠습니다.",
    detail: "더 자세한 이야기 보기"
  },
  {
    id: 5,
    name: "이동현",
    service: "소형이사",
    rating: "짐싸 평점 4.9",
    image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/partner_interview/20240118/zimssa2-1c70ff3c-b977-4a93-add1-3b6af14b0307.png",
    quote: "소형이사 전문으로 일하고 있는데, 원룸이나 작은 공간 이사에 특화된 노하우가 있어요. 큰 업체에서는 놓치기 쉬운 디테일들을 챙겨드리려고 항상 신경 쓰고 있습니다. 고객분들이 만족해하실 때 가장 기뻐요.",
    detail: "더 자세한 이야기 보기"
  }
]

export default function PartnerStories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards] = useState(3) // Desktop shows 3 cards

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % PARTNER_STORIES.length)
  }

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + PARTNER_STORIES.length) % PARTNER_STORIES.length)
  }

  const getVisibleStories = () => {
    const stories = []
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % PARTNER_STORIES.length
      stories.push(PARTNER_STORIES[index])
    }
    return stories
  }

  return (
    <section className="py-28 lg:py-40 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-8">
              짐싸 파트너들의 이야기
            </h2>
          </motion.div>
        </div>

        {/* Partner Stories Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid lg:grid-cols-3 gap-8">
              {getVisibleStories().map((story, index) => {
                if (!story) return null
                return (
                  <motion.div
                    key={`${story.id}-${currentIndex}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    {/* Partner Image */}
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={story.image}
                        alt={`${story.name} 파트너`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Service Badge */}
                      <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold">
                        {story.service}
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="p-8">
                      {/* Partner Info */}
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                          {story.name} 파트너
                        </h3>
                        <div className="flex items-center text-secondary text-sm font-bold mb-4">
                          <Star className="w-4 h-4 mr-1 fill-current" />
                          {story.rating}
                        </div>
                      </div>

                      {/* Quote */}
                      <blockquote className="text-neutral-700 text-base leading-relaxed mb-6 line-clamp-6">
                        "{story.quote}"
                      </blockquote>

                      {/* CTA Button */}
                      <Link
                        href={`/partner-stories/${story.id}`}
                        className="inline-flex items-center text-primary font-bold text-sm hover:text-primary/80 transition-colors"
                      >
                        {story.detail}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Partner Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={PARTNER_STORIES[currentIndex]?.image || ''}
                  alt={`${PARTNER_STORIES[currentIndex]?.name || ''} 파트너`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Service Badge */}
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                  {PARTNER_STORIES[currentIndex]?.service || ''}
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                {/* Partner Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {PARTNER_STORIES[currentIndex]?.name || ''} 파트너
                  </h3>
                  <div className="flex items-center text-secondary text-sm font-bold mb-4">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {PARTNER_STORIES[currentIndex]?.rating || ''}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-neutral-700 text-base leading-relaxed mb-4">
                  "{PARTNER_STORIES[currentIndex]?.quote || ''}"
                </blockquote>

                {/* CTA Button */}
                <Link
                  href={`/partner-stories/${PARTNER_STORIES[currentIndex]?.id || ''}`}
                  className="inline-flex items-center text-primary font-bold text-sm hover:text-primary/80 transition-colors"
                >
                  {PARTNER_STORIES[currentIndex]?.detail || ''}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevStory}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-20 bg-white shadow-xl rounded-full p-4 hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200 z-10"
            aria-label="이전 파트너 스토리"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-700" />
          </button>
          
          <button
            onClick={nextStory}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-20 bg-white shadow-xl rounded-full p-4 hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200 z-10"
            aria-label="다음 파트너 스토리"
          >
            <ChevronRight className="w-6 h-6 text-neutral-700" />
          </button>
        </div>

        {/* Story Indicators */}
        <div className="flex justify-center space-x-3 mt-12">
          {PARTNER_STORIES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8 shadow-lg"
                  : "bg-neutral-300 w-2 hover:bg-neutral-400"
              }`}
              aria-label={`파트너 스토리 ${index + 1}`}
            />
          ))}
        </div>

        {/* Partner Benefits CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-gradient-to-br from-primary to-primary/90 rounded-3xl p-8 lg:p-12 text-white text-center"
        >
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            짐싸 파트너가 되어보세요
          </h3>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            검증된 파트너만이 함께할 수 있는 프리미엄 플랫폼에서<br />
            더 많은 고객과 안정적인 수익을 만나보세요
          </p>
          <Link
            href="/partner-register"
            className="inline-flex items-center bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-white/95 transition-all duration-200 hover:scale-105"
            style={{ borderRadius: '102px' }}
          >
            파트너 등록하기
          </Link>
        </motion.div>
      </div>
    </section>
  )
}