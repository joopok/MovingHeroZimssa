"use client"

import { useState } from "react"
import AppDownloadModal from "@/components/modals/AppDownloadModal"

export default function MovingCTA() {
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false)

  return (
    <section 
      className="relative py-20 bg-cover bg-center min-h-[500px]"
      style={{
        backgroundImage: 'url(https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/service/bg_service_move_cta.jpg)'
      }}
    >
      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            짐싸와 함께 하는 안심 이사,<br />
            지금 시작하세요!
          </h2>
          
          <p className="text-lg text-gray-600 mb-12">
            믿을 수 있는 파트너들과 함께하는 이사<br />
            합리적인 가격에 만나보세요
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsAppDownloadModalOpen(true)}
              className="inline-flex items-center justify-center bg-primary text-white px-16 py-5 rounded-full text-xl font-bold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
              style={{ borderRadius: '102px' }}
            >
              지금 견적받기
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