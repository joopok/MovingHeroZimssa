"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { ASSETS } from "@/lib/constants"

export default function ParallaxDevices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false, 
    margin: "-50px 0px",
    amount: 0.2
  })
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={ref} className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            언제 어디서나 <span className="text-primary">짐싸</span>와 함께
          </h2>
          <p className="text-lg text-gray-600">
            모바일 앱으로 더욱 편리하게 이용하세요
          </p>
        </motion.div>

        <div className="relative h-[600px] lg:h-[700px]">
          {/* Phone 1 - Left */}
          <motion.div
            style={{ y: y1 }}
            className="absolute left-0 lg:left-10 top-20"
          >
            <div className="relative w-[250px] lg:w-[300px]">
              <Image
                src={ASSETS.app.mockups.main}
                alt="짐싸 앱 화면 1"
                width={300}
                height={600}
                className="drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Phone 2 - Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative w-[280px] lg:w-[340px]">
              <Image
                src={ASSETS.app.mockups.secondary}
                alt="짐싸 앱 메인 화면"
                width={340}
                height={680}
                className="drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Phone 3 - Right */}
          <motion.div
            style={{ y: y2 }}
            className="absolute right-0 lg:right-10 bottom-20"
          >
            <div className="relative w-[250px] lg:w-[300px]">
              <Image
                src={ASSETS.app.mockups.showcase}
                alt="짐싸 앱 화면 3"
                width={300}
                height={600}
                className="drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Optimized Floating UI Elements - Only animate when in view */}
          {isInView && (
            <>
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                }}
                className="absolute top-10 left-20 bg-white rounded-2xl shadow-xl p-4 hidden lg:block"
                style={{ willChange: "transform" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm font-semibold">실시간 견적 도착!</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                  repeatType: "reverse"
                }}
                className="absolute bottom-32 right-20 bg-primary text-white rounded-2xl shadow-xl p-4 hidden lg:block"
                style={{ willChange: "transform" }}
              >
                <p className="text-sm font-semibold">⭐ 4.9 평점</p>
              </motion.div>

              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                  repeatType: "reverse"
                }}
                className="absolute top-1/2 left-10 bg-secondary rounded-full shadow-xl p-6 hidden lg:block"
                style={{ willChange: "transform" }}
              >
                <p className="text-2xl">🚚</p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}