import type { Metadata } from "next"
import MovingHeroZimssa from "@/components/sections/moving/MovingHeroZimssa"
import MovingSteps from "@/components/sections/moving/MovingSteps"
import MovingTypesSection from "@/components/sections/moving/MovingTypesSection"
import CustomerTestimonials from "@/components/sections/moving/CustomerTestimonials"
import TrustReliability from "@/components/sections/moving/TrustReliability"
import MovingPartners from "@/components/sections/moving/MovingPartners"
import MovingCTA from "@/components/sections/moving/MovingCTA"

export const metadata: Metadata = {
  title: "이사 서비스 | 짐싸에서 안심 이사하세요!",
  description: "믿고 맡길 수 있는 이사 업체 어떻게 찾아야 할까? 포장이사부터 원룸이사까지, 짐싸에서 최대 9개 업체 견적을 한번에 비교하세요.",
  keywords: "이사, 포장이사, 원룸이사, 소형이사, 사무실이사, 이사업체, 이사견적, 짐싸",
  openGraph: {
    title: "이사 서비스 | 짐싸",
    description: "믿고 맡길 수 있는 이사 업체 어떻게 찾아야 할까?",
    images: ["https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/img_zimssa_web_og.png"]
  }
}

export default function MovingPage() {
  return (
    <main className="min-h-screen">
      <MovingHeroZimssa />
      <MovingSteps />
      <MovingTypesSection />
      <CustomerTestimonials />
      <TrustReliability />
      <MovingPartners />
      <MovingCTA />
    </main>
  )
}