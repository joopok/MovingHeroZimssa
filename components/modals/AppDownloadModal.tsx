"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AppDownloadModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppDownloadModal({ isOpen, onClose }: AppDownloadModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-lg w-[420px] h-[420px] flex flex-col items-center justify-center p-8 m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="모달 닫기"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              {/* QR Code */}
              <div className="mb-6">
                <img
                  src="/assets/images/app/qr-code.png"
                  alt="짐싸 앱 QR코드 이미지"
                  width={160}
                  height={160}
                  className="w-40 h-40"
                />
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h2 className="text-[20px] font-bold text-gray-900">
                  APP 다운로드
                </h2>
                <p className="text-[16px] text-gray-600 leading-relaxed">
                  휴대폰으로 QR코드를 촬영하여<br />
                  앱을 다운로드 하세요.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}