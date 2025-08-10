export default function ServiceAdvantages() {
  const advantages = [
    {
      title: "견적 요청",
      description: "간단한 정보 입력으로\n견적을 요청하세요",
      number: "01"
    },
    {
      title: "견적 비교",
      description: "최대 9개 업체의\n견적을 비교하세요",
      number: "02"
    },
    {
      title: "파트너 선택", 
      description: "리뷰와 평점을 보고\n마음에 드는 파트너를 선택하세요",
      number: "03"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            이사 시작을 어떻게해야?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-50 rounded-2xl p-8 h-full border">
                <div className="text-primary text-4xl font-bold mb-4">{advantage.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 whitespace-pre-line text-sm">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}