import HeroSection from "@/components/sections/HeroSection"
import WhyZimssa from "@/components/sections/WhyZimssa"
import TrustIndicators from "@/components/sections/TrustIndicators"
import ParallaxDevices from "@/components/sections/ParallaxDevices"
import ServicesSection from "@/components/sections/ServicesSection"
import AppDownloadCTA from "@/components/sections/AppDownloadCTA"
import ValueProposition from "@/components/sections/ValueProposition"
import CustomerReviews from "@/components/sections/CustomerReviews"
import PartnerStories from "@/components/sections/PartnerStories"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyZimssa />
      <TrustIndicators />
      <ParallaxDevices />
      <ServicesSection />
      <AppDownloadCTA />
      <ValueProposition />
      <CustomerReviews />
      <PartnerStories />
    </>
  )
}