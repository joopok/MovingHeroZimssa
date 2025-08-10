"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ASSETS } from "@/lib/constants"

export default function AppDownloadCTA() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary via-blue-600 to-primary">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-korean-optimized">
              이사, 청소, 운송<br />
              모든 것을 <span className="text-secondary">짐싸 앱</span>에서
            </h2>
            <p className="text-xl mb-8 text-blue-100 text-korean-relaxed">
              200만 고객이 선택한 1등 이사 플랫폼<br />
              지금 바로 다운로드하고 편리하게 이용하세요
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold mb-1">2,024,271</p>
                <p className="text-sm text-blue-100">누적 다운로드</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-3xl font-bold mb-1">⭐ 4.9</p>
                <p className="text-sm text-blue-100">앱스토어 평점</p>
              </div>
            </div>

            {/* Download Buttons - 터치 최적화 및 접근성 개선 */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://apps.apple.com/kr/app/zimssa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block touch-optimized focus-ring rounded-lg"
              >
                <Image
                  src={ASSETS.app.buttons.appStore}
                  alt="Download on App Store"
                  width={160}
                  height={48}
                  className="hover:opacity-90 hover:scale-105 transition-all duration-200 animate-fade-in-up"
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.zimssa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block touch-optimized focus-ring rounded-lg"
              >
                <Image
                  src={ASSETS.app.buttons.googlePlay}
                  alt="Get it on Google Play"
                  width={160}
                  height={48}
                  className="hover:opacity-90 hover:scale-105 transition-all duration-200 animate-fade-in-up [animation-delay:100ms]"
                />
              </Link>
            </div>
          </motion.div>

          {/* Right Content - App Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative flex justify-center items-end gap-4">
              {/* Main Phone */}
              <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10"
              >
                <Image
                  src={ASSETS.app.mockups.main}
                  alt="짐싸 앱 메인화면"
                  width={280}
                  height={560}
                  className="drop-shadow-2xl"
                />
              </motion.div>

              {/* Secondary Phone */}
              <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative -ml-20"
              >
                <Image
                  src={ASSETS.app.mockups.secondary}
                  alt="짐싸 앱 견적화면"
                  width={240}
                  height={480}
                  className="drop-shadow-xl opacity-90"
                />
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-10 right-10 bg-white rounded-2xl shadow-lg p-3"
            >
              <p className="text-sm font-bold text-gray-900">실시간 견적</p>
              <p className="text-xs text-gray-600">최대 9개까지</p>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
              className="absolute bottom-20 left-0 bg-secondary rounded-2xl shadow-lg p-3"
            >
              <p className="text-sm font-bold text-gray-900">리뷰 241,798개</p>
              <p className="text-xs text-gray-600">실제 이용 후기</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}