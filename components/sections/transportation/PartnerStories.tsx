export default function PartnerStories() {
  const partners = [
    {
      services: ["용달", "화물"],
      companyName: "한국운송",
      rating: 4.9,
      experience: "10년",
      story: "10년간 운송 업계에서 쌓은 노하우로 고객님의 소중한 짐을 안전하고 신속하게 운송해드립니다. 작은 짐부터 큰 짐까지 모두 책임집니다.",
      reviews: 1523,
      completedJobs: 8934
    },
    {
      services: ["퀵서비스"],
      companyName: "스피드퀵",
      rating: 4.8,
      experience: "5년",
      story: "도심 속 가장 빠른 배송을 자랑합니다. 긴급한 서류부터 소형 화물까지, 시간이 생명인 배송은 저희에게 맡겨주세요.",
      reviews: 892,
      completedJobs: 4521
    },
    {
      services: ["용달", "대형화물"],
      companyName: "안전운송",
      rating: 5.0,
      experience: "15년",
      story: "고객님의 짐을 내 짐처럼 소중하게 다룹니다. 15년의 경험으로 어떤 짐도 안전하게 운송해드립니다.",
      reviews: 2341,
      completedJobs: 12453
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            짐싸 파트너들의 이야기
          </h2>
          <p className="text-lg text-gray-600">
            믿을 수 있는 운송 전문가들을 만나보세요
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              {/* Service Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {partner.services.map((service, serviceIndex) => (
                  <span 
                    key={serviceIndex}
                    className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Company Info */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {partner.companyName}
                  </h3>
                  <div className="flex items-center gap-1">
                    {renderStars(partner.rating)}
                    <span className="text-sm font-semibold text-gray-900 ml-1">
                      {partner.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  경력: {partner.experience}
                </p>
              </div>

              {/* Partner Story */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {partner.story}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-primary">{partner.completedJobs.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">완료된 운송</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-primary">{partner.reviews.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">고객 리뷰</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}