"use client"

import { useState } from "react"
import AppDownloadModal from "@/components/modals/AppDownloadModal"

export default function FinalCta() {
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
      <div className="container mx-auto px-4 text-center">
        {/* Main Message */}
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
          이제 믿고 맡길 수 있는<br />
          이사 업체를 찾았습니다
        </h2>
        
        <p className="text-lg text-white/90 mb-8">
          최대 9개 업체의 견적을 한번에 비교하고<br />
          나에게 딱 맞는 파트너를 선택하세요
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">2,024,271</div>
            <div className="text-white/80 text-sm">앱 누적 다운로드</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">4.9</div>
            <div className="text-white/80 text-sm">고객 만족도</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">241,814</div>
            <div className="text-white/80 text-sm">누적 리뷰</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
          {/* App Download Button */}
          <button
            onClick={() => setIsAppDownloadModalOpen(true)}
            className="inline-flex items-center justify-center bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
            style={{ borderRadius: '102px' }}
          >
            앱 다운로드
          </button>

          {/* Web Service Button */}
          <button className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-primary transition-all w-full sm:w-auto"
            style={{ borderRadius: '102px' }}
          >
            웹으로 견적 받기
          </button>
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