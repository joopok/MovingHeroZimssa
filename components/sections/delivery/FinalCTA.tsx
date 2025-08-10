"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ASSETS } from "@/lib/constants"

export default function FinalCTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary via-blue-600 to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              지금 바로 운송 견적을 받아보세요!
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              복잡한 절차 없이 간단하게 견적을 비교하고<br />
              원하는 파트너를 선택하세요
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">빠른 견적</h3>
                <p className="text-blue-100">3분 안에 최대 9개 견적</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-white mb-2">투명한 가격</h3>
                <p className="text-blue-100">숨겨진 비용 없이 투명하게</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-white mb-2">안전 보장</h3>
                <p className="text-blue-100">모든 운송에 보험 자동 적용</p>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/app-download"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-gray-900 font-bold rounded-full hover:bg-secondary/90 transition-all transform hover:scale-105 shadow-lg"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                앱 다운로드
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                웹에서 견적받기
              </button>
            </motion.div>

            {/* App Store Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex flex-wrap gap-4 justify-center"
            >
              <Link
                href="https://apps.apple.com/kr/app/zimssa"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={ASSETS.app.buttons.appStore}
                  alt="Download on App Store"
                  width={160}
                  height={48}
                />
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.zimssa"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-90 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={ASSETS.app.buttons.googlePlay}
                  alt="Get it on Google Play"
                  width={160}
                  height={48}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}