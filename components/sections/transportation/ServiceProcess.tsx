export default function ServiceProcess() {
  const steps = [
    {
      number: "01",
      title: "서비스 선택하기",
      description: "앱 메인 화면에서 이용하고자 하는 서비스를 선택해 주세요",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/service_step/delivery/step1_512.png"
    },
    {
      number: "02", 
      title: "운송 정보 입력하기",
      description: "이동하시는 관련 정보들을 꼼꼼하게 입력해 주세요",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/service_step/delivery/step2_512.png"
    },
    {
      number: "03",
      title: "운송 견적 비교하기",
      description: "고객님의 정보를 토대로 보내주는 짐싸 파트너들의 견적을 확인해요",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/service_step/delivery/step3_512.png"
    },
    {
      number: "04",
      title: "운송 확정하기",
      description: "합리적인 서비스 견적을 확인하고 함께할 파트너를 확정해요",
      image: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/service_step/delivery/step4_512.png"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            몇 번의 탭이면 끝나는 운송 준비
          </h2>
          <p className="text-lg text-gray-600">
            간단한 정보 입력으로 운송 견적을 받아보세요
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              {/* Step Image */}
              <div className="mb-6 relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full max-w-[200px] mx-auto h-auto"
                />
                {/* Step Number */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <span className="text-primary text-5xl font-bold opacity-20">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}