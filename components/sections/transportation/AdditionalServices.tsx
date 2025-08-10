import Link from "next/link"

export default function AdditionalServices() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            이사나 청소는 안 필요하세요?
          </h2>
          <p className="text-lg text-gray-600">
            짐싸에서는 운송 외에도 다양한 서비스를 제공합니다
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Moving Service */}
          <Link href="/moving" className="group">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer group-hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <img
                    src="/assets/images/ic_zimssa_service_move.svg"
                    alt="이사 서비스"
                    className="w-8 h-8"
                    onError={(e) => {
                      const parent = (e.target as HTMLImageElement).parentElement
                      if (parent) {
                        parent.innerHTML = '<span class="text-2xl">🚚</span>'
                      }
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  이사 업체를 찾고 있다면?
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                가격 / 리뷰 / 평점 깐깐히 비교하고 고르셔야죠.<br />
                짐싸에서 한 번에 해결하세요!
              </p>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span>이사 서비스 보기</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Cleaning Service */}
          <Link href="/cleaning" className="group">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer group-hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                  <img
                    src="/assets/images/ic_zimssa_service_cleaning.svg"
                    alt="청소 서비스"
                    className="w-8 h-8"
                    onError={(e) => {
                      const parent = (e.target as HTMLImageElement).parentElement
                      if (parent) {
                        parent.innerHTML = '<span class="text-2xl">🧹</span>'
                      }
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  청소는 어떡하지?
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                청소가 고민이시라면, 짐싸에서 청소업체를 찾아보세요.<br />
                짐싸 파트너에게 맡기세요!
              </p>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span>청소 서비스 보기</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}