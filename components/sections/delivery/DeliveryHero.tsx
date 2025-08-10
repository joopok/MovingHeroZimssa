"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function DeliveryHero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233D51FF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              애매한 짐,<br />
              운송도 <span className="text-primary">불편 없이 빠르게</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              한 두개의 가전, 가구나 화분도 이사라고 하기엔 애매한 짐이나,<br />
              혼자 옮기긴 버거운 물건이 있다면? <strong className="text-gray-900">운송으로 충분합니다.</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/app-download"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg">앱 다운로드</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                전화 문의
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">검증된 파트너</p>
                  <p className="text-lg font-bold text-gray-900">2,400+</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">평균 평점</p>
                  <p className="text-lg font-bold text-gray-900">4.9/5.0</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Truck Illustration */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
                  <div className="text-center">
                    <div className="text-6xl lg:text-8xl mb-4">🚚</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">빠른 운송</h3>
                    <p className="text-gray-600">원하는 시간에 안전하게</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-200 rounded-full opacity-50"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"
              />

              {/* Service Icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute top-10 -left-20 bg-white rounded-2xl shadow-lg p-3"
              >
                <span className="text-3xl">📦</span>
                <p className="text-xs font-bold mt-1">소량 화물</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-20 -right-16 bg-white rounded-2xl shadow-lg p-3"
              >
                <span className="text-3xl">🪴</span>
                <p className="text-xs font-bold mt-1">화분 운송</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-5 left-10 bg-white rounded-2xl shadow-lg p-3"
              >
                <span className="text-3xl">🛋️</span>
                <p className="text-xs font-bold mt-1">가구 운송</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}