"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { STATISTICS, ASSETS } from "@/lib/constants"

// TypeScript 5.9: Enhanced type safety with readonly arrays and const assertions
interface HeroSlide {
  readonly video?: string; // Made optional for image-only slides
  readonly fallbackImage: {
    readonly pc: string;
    readonly mobile: string;
  };
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly buttons: readonly {
    readonly text: string;
    readonly href: string;
    readonly primary: boolean;
  }[];
}

// Zimssa hero slides with actual CDN images
const HERO_SLIDES: readonly HeroSlide[] = [
  {
    video: "", // No video for image-based slides
    fallbackImage: {
      pc: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/slide_banner/img_main_slide_banner_01_pc.png",
      mobile: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/slide_banner/img_main_slide_banner_01_mobile.png"
    },
    title: "우리 집 이사는\n리뷰, 평점 보고 깐깐하게",
    subtitle: "200만 고객이 선택한 1등 이사 플랫폼",
    description: "검증된 파트너와 함께하는 안전한 이사",
    buttons: [
      { text: "앱 다운로드", href: "/app-download", primary: true },
      { text: "서비스 엿보기", href: "/moving", primary: false }
    ]
  },
  {
    video: "",
    fallbackImage: {
      pc: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/slide_banner/img_main_slide_banner_02_pc.png",
      mobile: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/slide_banner/img_main_slide_banner_02_mobile.png"
    },
    title: "믿고 맡길 수 있는 이사 업체\n어떻게 찾아야 할까?",
    subtitle: "최대 9개 업체 견적 비교",
    description: "투명한 리뷰와 평점으로 선택하세요",
    buttons: [
      { text: "서비스 엿보기", href: "/moving", primary: true },
      { text: "견적 받기", href: "/moving#quote", primary: false }
    ]
  },
  {
    video: "",
    fallbackImage: {
      pc: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/slide_banner/img_main_slide_banner_03_pc.png",
      mobile: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/slide_banner/img_main_slide_banner_03_mobile.png"
    },
    title: "어디든지,\n새집처럼 깔끔하게",
    subtitle: "청소 전문가가 찾아갑니다",
    description: "입주청소부터 이사청소까지 완벽하게",
    buttons: [
      { text: "서비스 엿보기", href: "/cleaning", primary: true },
      { text: "예약하기", href: "/cleaning#booking", primary: false }
    ]
  },
  {
    video: "",
    fallbackImage: {
      pc: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/slide_banner/img_main_slide_banner_04_pc.png",
      mobile: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/slide_banner/img_main_slide_banner_04_mobile.png"
    },
    title: "애매한 짐,\n운송도 불편 없이 빠르게",
    subtitle: "당일/새벽 배송까지 가능",
    description: "크기와 무게 상관없이 신속한 운송",
    buttons: [
      { text: "서비스 엿보기", href: "/delivery", primary: true },
      { text: "요금 확인", href: "/delivery#pricing", primary: false }
    ]
  }
]

// TypeScript 5.9: Enhanced state typing with strict null checks
type VideoState = Record<number, boolean>;

// TypeScript 5.9: State interface removed as it's not needed

export default function HeroSection(): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState<VideoState>({})
  const [hasVideoError, setHasVideoError] = useState<VideoState>({})
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // TypeScript 5.9: Enhanced effect typing with proper cleanup
  useEffect((): (() => void) => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setCurrentSlide((prev: number) => (prev + 1) % HERO_SLIDES.length)
    }, 7000) // 7 seconds for better video viewing experience
    return (): void => clearInterval(timer)
  }, [])

  // Since we're using images instead of videos, we can simplify the loading logic
  useEffect((): void => {
    // Preload next image for smoother transitions
    const nextSlide = (currentSlide + 1) % HERO_SLIDES.length
    const nextImage = new Image()
    nextImage.src = HERO_SLIDES[nextSlide]?.fallbackImage.pc ?? ''
    
    // Preload mobile version too
    const nextMobileImage = new Image()
    nextMobileImage.src = HERO_SLIDES[nextSlide]?.fallbackImage.mobile ?? ''
  }, [currentSlide])

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden min-h-screen">
      {/* Hero Carousel with seamless header integration */}
      <div className="relative h-screen min-h-[700px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Zimssa-style Image Background with Next.js Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              {/* Desktop Image */}
              <div className="hidden md:block absolute inset-0">
                <Image
                  src={HERO_SLIDES[currentSlide]?.fallbackImage.pc ?? ''}
                  alt={HERO_SLIDES[currentSlide]?.title.replace(/\n/g, ' ') ?? ''}
                  fill
                  priority={currentSlide === 0}
                  quality={90}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
              {/* Mobile Image */}
              <div className="block md:hidden absolute inset-0">
                <Image
                  src={HERO_SLIDES[currentSlide]?.fallbackImage.mobile ?? ''}
                  alt={HERO_SLIDES[currentSlide]?.title.replace(/\n/g, ' ') ?? ''}
                  fill
                  priority={currentSlide === 0}
                  quality={90}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Subtle overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-10" />

            {/* Zimssa-style Hero Content */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    {/* Zimssa-style Subtitle with Badge */}
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm lg:text-base font-medium border border-white/20">
                        {HERO_SLIDES[currentSlide]?.subtitle ?? ''}
                      </span>
                    </motion.div>

                    {/* Main Headline - Zimssa Typography with line breaks */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-[1.2] tracking-[-0.02em] word-break-keep-all">
                      <motion.span
                        className="block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        {HERO_SLIDES[currentSlide]?.title.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < HERO_SLIDES[currentSlide].title.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </motion.span>
                    </h1>

                    {/* Description - Zimssa Style */}
                    <motion.p 
                      className="text-base sm:text-lg lg:text-xl text-white/80 mb-12 leading-[1.6] max-w-2xl mx-auto font-light"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {HERO_SLIDES[currentSlide]?.description ?? ''}
                    </motion.p>

                    {/* Zimssa-style CTA Button */}
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      {(HERO_SLIDES[currentSlide]?.buttons ?? []).map((button, index) => (
                        <Link
                          key={index}
                          href={button.href}
                          className={`group relative inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-3.5 lg:py-4 rounded-full text-base lg:text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                            button.primary 
                              ? 'bg-white text-gray-900 hover:bg-gray-50 shadow-2xl hover:shadow-3xl'
                              : 'bg-white/10 backdrop-blur-sm border border-white/50 text-white hover:bg-white/20 hover:border-white/70'
                          }`}
                          style={{ 
                            borderRadius: '100px',
                            minWidth: '160px'
                          }}
                        >
                          <span className="relative z-10">{button.text}</span>
                          {button.primary && (
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                          <motion.svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity, 
                              repeatType: "loop" 
                            }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </Link>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Zimssa-style Enhanced Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={(): void => setCurrentSlide(index)}
              className={`relative rounded-full transition-all duration-500 overflow-hidden ${
                index === currentSlide
                  ? "bg-white w-12 h-3"
                  : "bg-white/40 w-3 h-3 hover:bg-white/60"
              }`}
              aria-label={`${HERO_SLIDES[index]?.title ?? ''} 슬라이드`}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 7, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Enhanced Scroll Indicator - Zimssa Style */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center p-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-white/80 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <motion.div
            className="text-white/60 text-xs mt-3 tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SCROLL
          </motion.div>
        </motion.div>
      </div>

      {/* Statistics Bar - Seamlessly integrated with hero */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white py-20 relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Title with better integration */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-primary to-gray-800 bg-clip-text text-transparent leading-tight">
                누적 다운로드 수
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mt-4 rounded-full" />
            </motion.div>
              
            {/* Enhanced Download Counter */}
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl scale-110" />
              
              <div className="relative bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm border border-primary/30 rounded-3xl px-12 py-8 shadow-2xl">
                <motion.div 
                  className="flex items-baseline justify-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <motion.span
                    className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 1,
                      type: "spring",
                      stiffness: 100 
                    }}
                  >
                    {STATISTICS.downloads}
                  </motion.span>
                  <span className="text-3xl lg:text-4xl text-gray-600 font-bold">건</span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Enhanced Date Information */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gray-400" />
              <p className="text-base text-gray-600 font-medium px-4 py-2 bg-white/80 rounded-full border border-gray-200">
                2025년 8월 기준
              </p>
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gray-400" />
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="mt-12 flex items-center justify-center gap-8 text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">실시간 업데이트</span>
              </div>
              <div className="w-px h-6 bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">신뢰할 수 있는 파트너</span>
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}