"use client"

import { motion } from "framer-motion"
import { memo } from "react"
interface BaseProps {
  className?: string
}

const AppShowcase = memo(function AppShowcase({ className }: BaseProps) {
  return (
    <div className={className} role="region" aria-label="앱 쇼케이스 섹션">
      {/* First App Section - Blue Background */}
      <section 
        className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden"
        aria-label="앱 기능 소개 1"
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                이사는 물론,<br />
                청소, 운송까지 한번에
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                하나의 앱으로 모든 생활 서비스를 간편하게 이용하세요
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>실시간 견적 비교</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>검증된 전문 파트너</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>안심 보상 프로그램</span>
                </li>
              </ul>
            </motion.div>

            {/* Right Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[3rem] blur-xl" />
                <div className="relative bg-black p-3 rounded-[3rem] shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] p-4 w-[300px] h-[600px]">
                    {/* Phone Screen Content */}
                    <div className="bg-gray-100 rounded-2xl h-full p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xs text-gray-600">9:41</div>
                        <div className="flex gap-1">
                          <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                          <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                          <div className="w-4 h-3 bg-gray-800 rounded-sm"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="text-sm font-bold text-gray-900 mb-2">이사 견적 요청</div>
                          <div className="text-xs text-gray-600">서울 강남구 → 서울 서초구</div>
                        </div>
                        
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-lg p-3 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                                <div>
                                  <div className="text-xs font-medium text-gray-900">파트너 {i}</div>
                                  <div className="text-xs text-gray-500">⭐ 4.9</div>
                                </div>
                              </div>
                              <div className="text-sm font-bold text-blue-600">{35 + i * 5}만원</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second App Section - Black Background */}
      <section className="py-20 lg:py-32 bg-black relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] blur-xl" />
                <div className="relative bg-gray-900 p-3 rounded-[3rem] shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] p-4 w-[300px] h-[600px]">
                    {/* Search Screen */}
                    <div className="bg-gray-50 rounded-2xl h-full p-4">
                      <div className="bg-white rounded-xl p-3 mb-4 shadow-sm flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                          type="text" 
                          placeholder="어디서든 업체명을 검색하세요" 
                          className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none"
                          defaultValue="이사센터 김철수"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-500">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg"></div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-gray-900">이사센터 김철수</div>
                              <div className="text-xs text-gray-500">서울 전지역 • ⭐ 4.9 (241)</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-2">
                            20년 경력의 믿을 수 있는 이사 전문가
                          </div>
                          <div className="flex gap-2">
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">포장이사</span>
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">원룸</span>
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">투룸</span>
                          </div>
                        </div>
                        
                        {[1, 2].map((i) => (
                          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">업체명 {i}</div>
                                <div className="text-xs text-gray-500">서울 • ⭐ 4.8</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white order-1 lg:order-2"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                검색은 업체에 8개까지!
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                원하는 업체를 직접 검색하고 비교해보세요.<br />
                리뷰와 평점으로 신뢰할 수 있는 파트너를 찾을 수 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">2,400+</div>
                  <div className="text-gray-400">검증된 파트너</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">98.5%</div>
                  <div className="text-gray-400">고객 만족도</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Third App Section - Yellow Background */}
      <section className="py-20 lg:py-32 bg-yellow-400 relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-900"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                진짜 이용자들의<br />
                진짜 리뷰만
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                실제 서비스를 이용한 고객들의 솔직한 후기를 확인하세요.<br />
                사진과 함께 남겨진 생생한 리뷰로 믿을 수 있는 선택을 하세요.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">📸</div>
                  <div>
                    <div className="font-bold">포토 리뷰</div>
                    <div className="text-sm text-gray-600">실제 작업 사진으로 확인</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">✍️</div>
                  <div>
                    <div className="font-bold">상세 후기</div>
                    <div className="text-sm text-gray-600">장단점을 솔직하게</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent rounded-[3rem] blur-xl" />
                <div className="relative bg-gray-900 p-3 rounded-[3rem] shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] p-4 w-[300px] h-[600px]">
                    {/* Review Screen */}
                    <div className="bg-white rounded-2xl h-full overflow-hidden">
                      <div className="p-4 border-b">
                        <div className="text-sm font-bold text-gray-900">리뷰 241,798개</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm font-bold text-gray-900">4.9</span>
                        </div>
                      </div>
                      
                      <div className="p-4 space-y-4 overflow-y-auto">
                        <div className="border-b pb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">김**님</div>
                              <div className="text-xs text-gray-500">2024.11.15</div>
                            </div>
                          </div>
                          <div className="flex text-yellow-400 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            정말 꼼꼼하게 포장해주시고 친절하게 응대해주셨어요. 
                            무거운 가구도 안전하게 옮겨주셔서 감사합니다!
                          </p>
                          <div className="grid grid-cols-3 gap-1">
                            <div className="bg-gray-200 rounded h-16"></div>
                            <div className="bg-gray-200 rounded h-16"></div>
                            <div className="bg-gray-200 rounded h-16"></div>
                          </div>
                        </div>
                        
                        <div className="border-b pb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">박**님</div>
                              <div className="text-xs text-gray-500">2024.11.14</div>
                            </div>
                          </div>
                          <div className="flex text-yellow-400 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">
                            시간 약속 정확하고 작업도 깔끔하게 해주셨습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
})

AppShowcase.displayName = 'AppShowcase'

export default AppShowcase