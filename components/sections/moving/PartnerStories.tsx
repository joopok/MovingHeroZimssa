export default function PartnerStories() {
  const partners = [
    {
      services: ["포장이사", "반포장이사"],
      companyName: "노대헌 파트너",
      rating: 4.9,
      experience: "15년",
      story: "15년간 이사 업계에서 쌓은 노하우로 고객이 만족할 수 있는 완벽한 이사 서비스를 제공합니다. 고객의 소중한 짐을 내 가족의 짐처럼 정성스럽게 다루겠습니다.",
      link: "#"
    },
    {
      services: ["원룸이사", "소형이사"],
      companyName: "청년기업모두이사",
      rating: 4.8,
      experience: "8년",
      story: "젊고 패기 넘치는 직원들이 모여 만든 청년 기업입니다. 빠르고 정확한 작업으로 고객에게 새로운 시작을 응원하는 마음으로 이사 서비스를 제공합니다.",
      link: "#"
    },
    {
      services: ["사무실이사", "상업공간이사"],
      companyName: "최재영 파트너",
      rating: 5.0,
      experience: "12년",
      story: "사무실과 상업공간 이사 전문가로서 업무에 지장이 없도록 신속하고 체계적인 이사 서비스를 제공합니다. 고객의 비즈니스가 성공할 수 있도록 돕겠습니다.",
      link: "#"
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            짐싸 파트너들의 이야기
          </h2>
          <p className="text-lg text-gray-600">
            경험과 노하우를 바탕으로 최고의 서비스를 제공하는 파트너들을 만나보세요
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6">
              {/* Service Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {partner.services.map((service, serviceIndex) => (
                  <span 
                    key={serviceIndex}
                    className="text-xs bg-primary text-white px-3 py-1 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Company Info */}
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

              {/* Experience */}
              <p className="text-sm text-gray-600 mb-4">
                경력: {partner.experience}
              </p>

              {/* Partner Story */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {partner.story}
              </p>

              {/* View More Link */}
              <a 
                href={partner.link}
                className="text-primary text-sm font-semibold hover:underline"
              >
                자세히 보기 →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}