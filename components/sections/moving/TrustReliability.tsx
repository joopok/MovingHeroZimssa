export default function TrustReliability() {
  const stats = [
    {
      icon: "📈",
      number: "2,793,684",
      label: "누적 요청 건수",
      color: "text-blue-600"
    },
    {
      icon: "⭐",
      number: "4.9",
      label: "평균 평점",
      color: "text-yellow-500"
    }
  ]

  const features = [
    {
      title: "안전한 거래",
      description: "안전한 거래를 위한\n에스크로 시스템",
      icon: "🛡️",
      color: "bg-blue-50"
    },
    {
      title: "보장 서비스",
      description: "이용자 보호를 위한\n각종 보장 서비스",
      icon: "✅",
      color: "bg-green-50"
    },
    {
      title: "전문 상담",
      description: "이사 전문가의\n1:1 맞춤 상담",
      icon: "💬",
      color: "bg-yellow-50"
    },
    {
      title: "품질 관리",
      description: "지속적인 품질 관리와\n서비스 개선",
      icon: "⚙️",
      color: "bg-purple-50"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            짐싸와 함께라면<br />
            안심할 수 있습니다
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Features */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`${feature.color} rounded-2xl p-6 h-full`}>
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-600 whitespace-pre-line">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}