"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Sparkles, 
  Home, 
  Building2, 
  Calendar, 
  CheckCircle, 
  Star,
  Clock,
  Shield,
  Award,
  Users,
  Phone,
  ArrowRight,
  Zap
} from "lucide-react"
// import HeroSection from "@/components/sections/HeroSection" // Option for unified hero

const CLEANING_SERVICES = [
  {
    id: "move-in",
    title: "입주청소",
    subtitle: "새로운 시작을 위한 완벽한 청소",
    description: "이사 전후 깨끗한 공간을 만들어드립니다",
    icon: Home,
    features: ["입주 전 청소", "이사 후 청소", "원상복구 청소", "보증금 보장"],
    price: "15만원부터",
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "move-out",
    title: "이사청소", 
    subtitle: "깔끔한 퇴거를 위한 마무리",
    description: "보증금 확보를 위한 전문적인 청소",
    icon: Sparkles,
    features: ["생활 얼룩 제거", "주방 기름때", "화장실 물때", "바닥 왁싱"],
    price: "12만원부터",
    rating: 4.8,
    reviews: 1923,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    id: "office",
    title: "사무실청소",
    subtitle: "쾌적한 업무 환경 조성",
    description: "정기/비정기 사무실 청소 서비스",
    icon: Building2,
    features: ["정기 청소", "카펫 청소", "유리창 청소", "화장실 관리"],
    price: "8만원부터",
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    id: "regular",
    title: "정기청소",
    subtitle: "꾸준한 관리로 항상 깨끗하게",
    description: "주기적인 전문 청소로 쾌적한 생활공간",
    icon: Calendar,
    features: ["주 1회/2회", "월 2회/4회", "맞춤 스케줄", "전담 팀 배정"],
    price: "6만원부터",
    rating: 4.9,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50"
  }
]

const CLEANING_BENEFITS = [
  {
    icon: Shield,
    title: "100% 보험가입",
    description: "모든 청소업체가 보험에 가입되어 있어 안심하고 이용하실 수 있습니다.",
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    icon: Award,
    title: "검증된 전문가",
    description: "엄격한 심사를 통과한 전문 청소업체만이 서비스를 제공합니다.",
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    icon: Clock,
    title: "24시간 접수",
    description: "언제든지 편리한 시간에 청소 서비스를 예약하실 수 있습니다.",
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    icon: Users,
    title: "고객만족도 99%",
    description: "실제 이용고객들의 높은 만족도와 재이용률을 자랑합니다.",
    color: "text-pink-600",
    bgColor: "bg-pink-100"
  }
]

const PROCESS_STEPS = [
  {
    step: "01",
    title: "간편 예약",
    description: "앱에서 청소 유형과 날짜를 선택하여 간편하게 예약하세요.",
    icon: Phone
  },
  {
    step: "02",
    title: "업체 매칭",
    description: "AI가 최적의 청소업체를 찾아 즉시 매칭해드립니다.",
    icon: Zap
  },
  {
    step: "03",
    title: "전문 청소",
    description: "숙련된 청소 전문가가 꼼꼼하고 완벽하게 청소합니다.",
    icon: Sparkles
  },
  {
    step: "04",
    title: "만족 확인",
    description: "청소 완료 후 만족도를 확인하고 리뷰를 남겨주세요.",
    icon: Star
  }
]

export default function CleaningPage() {
  return (
    <div className="min-h-screen pt-[80px]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 lg:py-32 overflow-hidden -mt-[80px] pt-[100px] lg:pt-[120px]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 text-yellow-300 opacity-60"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-32 right-20 text-yellow-300 opacity-40"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-5 h-5 mr-2" />
                <span className="text-sm font-semibold">전문 청소 서비스</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                깨끗한 공간,<br />
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  새로운 시작
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
                이사부터 입주청소까지<br />
                전문가의 손길로 완벽하게
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/cleaning/quote"
                  className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  무료 견적 받기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
                >
                  서비스 알아보기
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-3xl font-bold mb-1">50,000+</div>
                  <div className="text-blue-200 text-sm">완료된 청소</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-3xl font-bold mb-1">4.9★</div>
                  <div className="text-blue-200 text-sm">평균 만족도</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="text-3xl font-bold mb-1">1,200+</div>
                  <div className="text-blue-200 text-sm">전문 업체</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="전문 청소 서비스"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                  priority
                />
                
                {/* Floating Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-white text-gray-900 rounded-2xl p-6 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold">청소 완료!</div>
                      <div className="text-sm text-gray-600">만족도 4.9★</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                청소 서비스
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                다양한 청소 서비스를 한 번에 비교하고 선택하세요
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {CLEANING_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${service.bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100`}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {service.title}
                      </h3>
                      <div className="text-right">
                        <div className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                          {service.price}
                        </div>
                      </div>
                    </div>

                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold ml-1">{service.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        리뷰 {service.reviews.toLocaleString()}개
                      </span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/cleaning/${service.id}`}
                      className={`inline-flex items-center justify-center bg-gradient-to-r ${service.color} text-white py-3 px-6 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                    >
                      견적 요청하기
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                왜 짐싸 청소인가요?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                믿을 수 있는 전문가들과 투명한 서비스
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CLEANING_BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                이용 방법
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                간단한 4단계로 완료되는 청소 서비스
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto relative z-10">
                    <step.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="absolute top-2 -inset-2 bg-blue-100 rounded-full"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-blue-200" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-40 h-40 border border-white/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-60 h-60 border border-white/10 rounded-full"
          />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                깨끗한 공간을 만들어보세요
              </h2>
              <p className="text-xl lg:text-2xl text-blue-100 mb-12">
                지금 바로 무료 견적을 받아보세요
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/cleaning/quote"
                  className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  무료 견적 받기
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/app-download"
                  className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-700 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300"
                >
                  앱 다운로드
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}