"use client"

import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface InternetPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function InternetPopup({ isOpen, onClose }: InternetPopupProps) {
  const [phone, setPhone] = useState('')
  const [agreePrivacy, setAgreePrivacy] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !agreePrivacy) {
      alert('휴대폰 번호를 입력하고 개인정보 수집에 동의해주세요.')
      return
    }
    
    // Handle form submission
    alert('상담 신청이 완료되었습니다. 빠른 시간 내에 연락드리겠습니다.')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[3000] flex items-center justify-center"
          >
            {/* Popup Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl w-[90%] max-w-[760px] max-h-[90vh] overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-2">인터넷/TV 가입 상담</h2>
                <p className="text-blue-100 text-lg">최대 48만원 현금지원!</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    🎉 특별 혜택 안내
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="text-3xl mb-2">💰</div>
                      <h4 className="font-bold text-lg mb-2">최대 48만원 현금지원</h4>
                      <p className="text-sm text-gray-600">신규/이전 가입시 현금 지원</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <div className="text-3xl mb-2">📺</div>
                      <h4 className="font-bold text-lg mb-2">인터넷+TV 결합</h4>
                      <p className="text-sm text-gray-600">결합상품 추가 할인 혜택</p>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg">
                      <div className="text-3xl mb-2">⚡</div>
                      <h4 className="font-bold text-lg mb-2">빠른 설치</h4>
                      <p className="text-sm text-gray-600">당일 설치 가능 (지역별 상이)</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <div className="text-3xl mb-2">🎁</div>
                      <h4 className="font-bold text-lg mb-2">추가 혜택</h4>
                      <p className="text-sm text-gray-600">와이파이, 셋톱박스 무료 제공</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      휴대폰 번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="'-' 없이 숫자만 입력해주세요"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Privacy Consent */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={agreePrivacy}
                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        required
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-700">
                        <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span>
                        <span className="text-red-500"> *</span>
                        <div className="mt-2 text-xs text-gray-500">
                          • 수집목적: 인터넷/TV 가입 상담 서비스 제공<br />
                          • 수집항목: 휴대폰번호<br />
                          • 보유기간: 상담 완료 후 1년<br />
                          • 동의 거부권: 개인정보 수집에 대한 동의를 거부할 수 있으며, 동의 거부 시 서비스 이용이 제한됩니다.
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                  >
                    무료 상담 신청하기
                  </button>
                </form>

                {/* Footer Note */}
                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>• 상담 신청 후 담당자가 빠른 시간 내에 연락드립니다.</p>
                  <p>• 지역 및 건물 여건에 따라 혜택이 달라질 수 있습니다.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}