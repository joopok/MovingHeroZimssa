"use client"

import { useState } from "react"
import AppDownloadModal from "@/components/modals/AppDownloadModal"

export default function TransportationHero() {
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false)

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden pt-[100px]">
      {/* Background gradient matching Zimssa */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #3D51FF 0%, #5B6AFF 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            애매한 짐, 운송도<br />
            불편 없이 빠르게
          </h1>
          
          <p className="text-lg lg:text-xl text-white/90 mb-12 leading-relaxed">
            이사라고 하기엔 애매한 짐이나,<br />
            혼자 옮기긴 버거운 물건이 있다면? 운송으로 충분합니다.
          </p>

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

          {/* Service illustration */}
          <div className="mt-16 max-w-2xl mx-auto">
            <img
              src="/assets/images/img_reserve_type_delivery.png"
              alt="운송 서비스"
              className="w-full h-auto"
              onError={(e) => {
                // Fallback to a placeholder if image doesn't exist
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
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