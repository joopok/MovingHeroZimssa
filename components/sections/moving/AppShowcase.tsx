"use client"

import { useState } from "react"
import AppDownloadModal from "@/components/modals/AppDownloadModal"

export default function AppShowcase() {
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false)

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              이사는 물론,<br />
              청소, 운송까지 한번에!
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              이사와 관련된 모든 서비스를 짐싸 하나로 해결하세요.<br />
              포장이사, 원룸이사부터 입주청소, 운송까지<br />
              필요한 서비스를 한 곳에서 비교하고 선택할 수 있습니다.
            </p>
            
            {/* App Download Button */}
            <button
              onClick={() => setIsAppDownloadModalOpen(true)}
              className="inline-flex items-center justify-center bg-white text-primary px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all transform hover:scale-105"
              style={{ borderRadius: '102px' }}
            >
              앱 다운로드
            </button>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/device/img_main_device01.png"
                alt="짐싸 앱"
                className="w-full max-w-[300px] h-auto"
              />
            </div>
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