export default function CustomerReviews() {
  const reviews = [
    {
      rating: 5.0,
      service: "포장이사",
      partnerName: "노대헌 파트너",
      review: "정말 친절하시고 꼼꼼하게 해주셨습니다. 짐도 하나도 안 잃어버리고 새집에 잘 도착했어요. 다음에도 이사할 일 있으면 또 부탁드리고 싶어요!",
      photo: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/customer/review_moving_1/photo.jpg",
      date: "2025.08.01"
    },
    {
      rating: 4.9,
      service: "원룸이사",
      partnerName: "청년기업모두이사",
      review: "원룸이사라서 짐이 많지 않았는데도 정성스럽게 해주셨어요. 가격도 합리적이고 시간도 정확하게 지켜주셔서 만족합니다.",
      photo: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/customer/review_moving_2/photo.jpg",
      date: "2025.07.28"
    },
    {
      rating: 5.0,
      service: "사무실이사",
      partnerName: "최재영 파트너",
      review: "사무실 이사는 처음인데 서류나 컴퓨터 등 소중한 것들을 정말 조심히 다뤄주셨어요. 직원들도 친절하고 프로페셔널하셨습니다.",
      photo: "https://zimssa-static.s3.ap-northeast-2.amazonaws.com/customer/review_moving_3/photo.jpg",
      date: "2025.07.25"
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            짐싸 이용자들의 진짜 리뷰
          </h2>
          <p className="text-lg text-gray-600">
            실제 이사를 경험한 고객들의 솔직한 후기를 확인해보세요
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Review Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm font-semibold text-gray-900">
                    {review.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                    {review.service}
                  </span>
                  <span className="text-xs text-gray-500">
                    {review.date}
                  </span>
                </div>
              </div>

              {/* Partner Name */}
              <p className="text-sm text-gray-600 mb-3">
                파트너: {review.partnerName}
              </p>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                "{review.review}"
              </p>

              {/* Customer Photo */}
              <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={review.photo}
                  alt="고객 리뷰 사진"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}