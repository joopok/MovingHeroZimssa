"use client"

import { useState } from "react"
import AppDownloadModal from "@/components/modals/AppDownloadModal"
import { ASSETS } from "@/lib/constants"

export default function MovingHeroNew() {
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false)

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${ASSETS.services.moving.hero})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[600px] lg:min-h-[700px] pt-[100px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            믿고 맡길 수 있는 이사 업체<br />
            어떻게 찾아야 할까?
          </h1>

          {/* CTA Button */}
          <button
            onClick={() => setIsAppDownloadModalOpen(true)}
            className="inline-flex items-center justify-center bg-secondary text-neutral-900 px-12 py-4 rounded-full text-lg font-bold hover:bg-secondary/90 transition-all transform hover:scale-105 shadow-lg"
            style={{ 
              backgroundColor: '#FFE200',
              borderRadius: '102px',
              minWidth: '200px'
            }}
          >
            앱 다운로드
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