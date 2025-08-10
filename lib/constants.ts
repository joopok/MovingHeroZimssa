export const COMPANY_NAME = "짐싸"
export const COMPANY_NAME_EN = "Zimssa"

export const NAVIGATION_ITEMS = [
  { name: "이사", href: "/moving" },
  { name: "청소", href: "/cleaning" },
  { name: "운송", href: "/service?type=delivery" },
  { name: "인터넷", href: "/?type=internet" },
] as const

export const SERVICES = [
  {
    id: "moving",
    title: "이사",
    description: "포장이사부터 소형이사까지",
    icon: "🚚",
    features: ["포장이사", "반포장이사", "원룸이사", "사무실이사"],
  },
  {
    id: "cleaning",
    title: "청소",
    description: "입주청소, 이사청소 전문",
    icon: "🧹",
    features: ["입주청소", "이사청소", "사무실청소", "정기청소"],
  },
  {
    id: "delivery",
    title: "운송",
    description: "애매한 짐도 빠르게",
    icon: "📦",
    features: ["용달", "화물", "퀵서비스", "대형화물"],
  },
  {
    id: "internet",
    title: "인터넷",
    description: "인터넷 설치 및 이전",
    icon: "🌐",
    features: ["신규설치", "이전설치", "요금비교", "결합상품"],
  },
] as const

export const STATISTICS = {
  downloads: "2,024,271",
  appRating: "4.9",
  reviews: "241,798",
  requests: "2,793,429",
  serviceRating: "4.9",
  maxQuotes: "9",
} as const

export const HERO_MESSAGES = [
  {
    title: "우리 집 이사는 리뷰, 평점 보고 깐깐하게",
    subtitle: "",
    image: "moving"
  },
  {
    title: "믿고 맡길 수 있는 이사 업체 어떻게 찾아야 할까?",
    subtitle: "",
    image: "trust"
  },
  {
    title: "어디든지, 새집처럼 깔끔하게",
    subtitle: "",
    image: "cleaning"
  },
  {
    title: "애매한 짐, 운송도 불편 없이 빠르게",
    subtitle: "",
    image: "delivery"
  }
] as const

export const FOOTER_LINKS = {
  company: [
    { name: "회사소개", href: "/about" },
    { name: "채용", href: "/careers" },
    { name: "제휴문의", href: "/partnership" },
  ],
  service: [
    { name: "이용약관", href: "/terms" },
    { name: "개인정보처리방침", href: "/privacy" },
    { name: "위치기반서비스 이용약관", href: "/location-terms" },
  ],
  support: [
    { name: "고객센터", href: "/support" },
    { name: "자주 묻는 질문", href: "/faq" },
    { name: "파트너 등록", href: "/partner-register" },
  ],
} as const

export const COMPANY_INFO = {
  name: "주식회사 다방무버스",
  ceo: "홍길동",
  businessNumber: "123-45-67890",
  address: "서울특별시 강남구 테헤란로 123, 10층",
  tel: "1588-1234",
  email: "support@dabangmovers.com",
} as const

// Comprehensive Asset Management - Local alternatives to S3 URLs
export const ASSETS = {
  // Hero section videos and fallback images
  hero: {
    videos: {
      cleaning: "/assets/videos/hero-cleaning.mp4",
      moving: "/assets/videos/hero-moving.mp4",
      delivery: "/assets/videos/hero-delivery.mp4",
    },
    images: {
      cleaningPc: "/assets/images/hero/cleaning-pc.jpg",
      cleaningMobile: "/assets/images/hero/cleaning-mobile.jpg",
      movingPc: "/assets/images/hero/moving-pc.jpg",
      movingMobile: "/assets/images/hero/moving-mobile.jpg",
      deliveryPc: "/assets/images/hero/delivery-pc.jpg",
      deliveryMobile: "/assets/images/hero/delivery-mobile.jpg",
    }
  },
  
  // App download and device mockups
  app: {
    mockups: {
      main: "/assets/images/app/app-mockup-main.png",
      secondary: "/assets/images/app/app-mockup-secondary.png",
      showcase: "/assets/images/app/app-showcase.png",
    },
    buttons: {
      appStore: "/assets/images/buttons/app-store-badge.png",
      googlePlay: "/assets/images/buttons/google-play-badge.png",
    }
  },
  
  // Service-related images
  services: {
    moving: {
      hero: "/assets/images/services/moving-hero.jpg",
      process: "/assets/images/services/moving-process.jpg",
      partners: "/assets/images/services/moving-partners.jpg",
    },
    cleaning: {
      hero: "/assets/images/services/cleaning-hero.jpg",
      before: "/assets/images/services/cleaning-before.jpg",
      after: "/assets/images/services/cleaning-after.jpg",
    },
    delivery: {
      hero: "/assets/images/services/delivery-hero.jpg",
      truck: "/assets/images/services/delivery-truck.jpg",
      process: "/assets/images/services/delivery-process.jpg",
    }
  },
  
  // Reviews and testimonials
  reviews: {
    customer1: "/assets/images/reviews/customer-1.jpg",
    customer2: "/assets/images/reviews/customer-2.jpg",
    customer3: "/assets/images/reviews/customer-3.jpg",
    beforeAfter: "/assets/images/reviews/before-after-comparison.jpg",
  },
  
  // Company and partner logos
  logos: {
    partners: [
      "/assets/images/logos/partner-1.png",
      "/assets/images/logos/partner-2.png",
      "/assets/images/logos/partner-3.png",
      "/assets/images/logos/partner-4.png",
    ],
    certifications: [
      "/assets/images/logos/cert-1.png",
      "/assets/images/logos/cert-2.png",
    ]
  },
  
  // UI elements and icons
  ui: {
    placeholder: "/assets/images/ui/placeholder.svg",
    loading: "/assets/images/ui/loading.svg",
    errorFallback: "/assets/images/ui/error-fallback.jpg",
  },
  
  // Videos
  videos: {
    serviceMove: "/assets/videos/video_service_move.mp4",
    howItWorks: "/assets/videos/how-it-works.mp4",
    testimonials: "/assets/videos/customer-testimonials.mp4",
  }
} as const

// Legacy IMAGES constant for backward compatibility
export const IMAGES = ASSETS