export default function PartnerRecruit() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            짐싸 파트너를 모집합니다
          </h2>
          
          {/* Description */}
          <p className="text-lg text-white/90 mb-12 leading-relaxed">
            비즈니스 성장을 함께 만들어갈 파트너 업체를 기다립니다<br />
            운송 전문가님들의 많은 관심 부탁드립니다
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                안정적인 수익
              </h3>
              <p className="text-white/80 text-sm">
                매일 새로운 고객과의<br />
                만남을 보장합니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                체계적인 교육
              </h3>
              <p className="text-white/80 text-sm">
                서비스 품질 향상을 위한<br />
                교육을 제공합니다
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                파트너 지원
              </h3>
              <p className="text-white/80 text-sm">
                성장을 위한 다양한<br />
                지원 프로그램 운영
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            className="inline-flex items-center justify-center bg-white text-primary px-12 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            style={{ borderRadius: '102px' }}
          >
            파트너 지원하기
          </button>
        </div>
      </div>
    </section>
  )
}