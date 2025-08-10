"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function ZimssaMovingHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  // const [isMobile, setIsMobile] = useState(false) // Unused variable removed
  const videoRef = useRef<HTMLVideoElement>(null)

  // Check if mobile - Removed as isMobile is not used
  // useEffect(() => {
  //   const checkMobile = () => {
  //     setIsMobile(window.innerWidth <= 768)
  //   }
  //   checkMobile()
  //   window.addEventListener('resize', checkMobile)
  //   return () => window.removeEventListener('resize', checkMobile)
  // }, [])

  // Video management with better error handling
  useEffect(() => {
    const video = videoRef.current
    if (video && !hasVideoError) {
      // Set video to load
      video.load()
      
      // Try to play video
      const playVideo = async () => {
        try {
          await video.play()
          setIsVideoLoaded(true)
        } catch (error) {
          // Video autoplay failed, user interaction may be required
          setHasVideoError(true)
          setIsVideoLoaded(false)
        }
      }
      
      // Add a small delay to ensure video is ready
      const timer = setTimeout(playVideo, 100)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [hasVideoError])

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden">
      {/* Video Background Layer - Zimssa Style */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/images/hero/moving-pc.jpg"
          onLoadedData={() => {
            // Video loaded successfully
            setIsVideoLoaded(true)
          }}
          onError={() => {
            // Video error occurred
            setHasVideoError(true)
            setIsVideoLoaded(false)
          }}
          onCanPlay={() => {
            // Video can play
            setIsVideoLoaded(true)
          }}
        >
          <source src="/assets/videos/video_service_move.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Fallback Image Background */}
        {(hasVideoError || !isVideoLoaded) && (
          <div className="absolute inset-0 w-full h-full">
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet="/assets/images/hero/moving-mobile.jpg"
              />
              <img
                src="/assets/images/hero/moving-pc.jpg"
                alt="이사 서비스 배경"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        )}
      </div>

      {/* Gradient Overlay - Zimssa Style */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10" />


      {/* Content Overlay - Zimssa Layout */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Headline - Zimssa Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white font-bold mb-8 sm:mb-12"
          >
            {/* Desktop Title */}
            <span className="hidden sm:block text-4xl md:text-5xl lg:text-6xl leading-tight">
              믿고 맡길 수 있는 이사 업체<br />
              어떻게 찾아야 할까?
            </span>
            {/* Mobile Title */}
            <span className="block sm:hidden text-3xl leading-tight">
              믿고 맡길 수 있는<br />
              이사 업체<br />
              어떻게 찾아야 할까?
            </span>
          </motion.h1>

          {/* CTA Button - Zimssa Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              href="/app-download"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-bold px-8 sm:px-12 py-4 rounded-lg text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              앱 다운로드
            </Link>
          </motion.div>

          {/* Additional Info - Optional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-white/90"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>리뷰 24만개+</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span>평점 4.9</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span>최대 9개 견적</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Zimssa Style */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  )
}