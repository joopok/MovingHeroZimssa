export default function QuoteComparison() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Phone Mockup */}
            <div className="flex justify-center lg:justify-start">
              <img
                src="https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/device/img_main_device02.png"
                alt="견적 한번에 9개까지"
                className="w-full max-w-[300px] h-auto"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                견적은 한번에 9개까지!
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                한 번의 요청으로 최대 9개 업체의 견적을 받아보세요.<br />
                가격, 서비스 내용, 리뷰를 한눈에 비교하고<br />
                나에게 가장 적합한 업체를 선택할 수 있습니다.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <p className="text-gray-700">실시간으로 받아보는 맞춤 견적</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <p className="text-gray-700">업체별 상세 서비스 내용 확인</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl">✓</span>
                  <p className="text-gray-700">실제 이용자 리뷰와 평점 비교</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}