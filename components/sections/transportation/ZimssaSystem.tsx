export default function ZimssaSystem() {
  const systems = [
    {
      icon: "/assets/images/ic_zimssa_system_1.svg",
      title: "ZIMSSA Standard Guide",
      description: "까다로운 심사 기준을 통과한 업체만이 짐싸의 파트너로 활동할 수 있습니다"
    },
    {
      icon: "/assets/images/ic_zimssa_system_2.svg",
      title: "ZIMSSA Education",
      description: "초기 활동 지원, 품질 교육 등을 통해 더 나은 서비스를 제공합니다"
    },
    {
      icon: "/assets/images/ic_zimssa_system_3.svg",
      title: "ZIMSSA Manual",
      description: "파트너 평가 제도와 지속적인 메뉴얼 관리로 최고의 서비스를 제공하기 위해 노력합니다"
    },
    {
      icon: "/assets/images/ic_zimssa_system_4.svg",
      title: "ZIMSSA Customer Service",
      description: "연중무휴 실시간 고객센터를 운영하여, 고객분들의 목소리에 응답합니다"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            짐싸 시스템으로 안심하고 맡기세요
          </h2>
          <p className="text-lg text-gray-600">
            체계적인 관리 시스템으로 품질 높은 서비스를 제공합니다
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {systems.map((system, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center">
              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <img
                  src={system.icon}
                  alt={system.title}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    // Fallback to number if icon doesn't exist
                    const parent = (e.target as HTMLImageElement).parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="text-2xl font-bold text-primary">${index + 1}</span>`
                    }
                  }}
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {system.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {system.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}