"use client"

import { useState } from "react"
import AppDownloadModal from "@/components/modals/AppDownloadModal"

export default function FinalCta() {
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Message */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            지금 바로 운송 견적을<br />
            받아보세요
          </h2>
          
          <p className="text-lg text-gray-600 mb-12">
            최대 9개 업체의 견적을 한번에 비교하고<br />
            가장 합리적인 선택을 하세요
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2,024,271</div>
              <div className="text-sm text-gray-600">앱 누적 다운로드</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9</div>
              <div className="text-sm text-gray-600">평균 평점</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">241,814</div>
              <div className="text-sm text-gray-600">누적 리뷰</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* App Download Button */}
            <button
              onClick={() => setIsAppDownloadModalOpen(true)}
              className="inline-flex items-center justify-center bg-primary text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
              style={{ borderRadius: '102px' }}
            >
              앱 다운로드
            </button>

            {/* Web Service Button */}
            <button className="inline-flex items-center justify-center bg-white text-primary border-2 border-primary px-12 py-4 rounded-full text-lg font-bold hover:bg-primary hover:text-white transition-all w-full sm:w-auto"
              style={{ borderRadius: '102px' }}
            >
              웹으로 견적 받기
            </button>
          </div>
        </div>
      </div>

      {/* App Download Modal */}
      <AppDownloadModal 
        isOpen={isAppDownloadModalOpen}
        onClose={() => setIsAppDownloadModalOpen(false)}
      />
    </section>
  )
}