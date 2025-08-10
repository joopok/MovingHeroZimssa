"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function MovingHeroZimssa() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Video management
  useEffect(() => {
    const video = videoRef.current
    if (video && !hasVideoError) {
      video.load()
      
      const playVideo = async () => {
        try {
          await video.play()
          setIsVideoLoaded(true)
        } catch (error) {
          console.log('Video autoplay failed:', error)
          setHasVideoError(true)
          setIsVideoLoaded(false)
        }
      }
      
      // Small delay to ensure video is ready
      const timer = setTimeout(playVideo, 100)
      return () => clearTimeout(timer)
    }
  }, [hasVideoError])

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '680px' }}>
      {/* Video Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => {
            setIsVideoLoaded(true)
          }}
          onError={() => {
            setHasVideoError(true)
            setIsVideoLoaded(false)
          }}
        >
          <source src="/assets/videos/video_service_move.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback Background */}
        {(hasVideoError || !isVideoLoaded) && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="absolute inset-0 opacity-10">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #3D51FF 2px, transparent 2px),
                                   radial-gradient(circle at 75% 75%, #FFE200 1px, transparent 1px)`,
                  backgroundSize: '100px 100px, 50px 50px'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Dark Overlay - Zimssa exact overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0, 0, 0, 0.7)' }} />

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center">
        <div className="w-full max-w-[1140px] mx-auto px-6 lg:px-8">
          <div className="text-center lg:text-left">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white font-bold mb-10"
              style={{
                fontSize: '50px',
                lineHeight: '62px',
                letterSpacing: '-0.02em'
              }}
            >
              믿고 맡길 수 있는 이사 업체<br />
              어떻게 찾아야 할까?
            </motion.h1>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/app-download"
                className="inline-flex items-center justify-center text-white font-bold transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{
                  background: '#3D51FF',
                  borderRadius: '102px',
                  padding: '16px 40px',
                  fontSize: '20px',
                  fontWeight: '700',
                  minWidth: '172px',
                  height: '60px'
                }}
              >
                앱 다운로드
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            height: 560px !important;
          }
          
          h1 {
            font-size: 32px !important;
            line-height: 42px !important;
            text-align: center !important;
          }
          
          .text-center.lg\\:text-left {
            text-align: center !important;
          }
          
          a {
            font-size: 18px !important;
            padding: 16px 24px !important;
            min-width: 168px !important;
            height: 56px !important;
          }
        }
      `}</style>
    </section>
  )
}