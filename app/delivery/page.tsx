import DeliveryHero from "@/components/sections/delivery/DeliveryHero"
import ServiceProcess from "@/components/sections/delivery/ServiceProcess"
import ServiceTypes from "@/components/sections/delivery/ServiceTypes"
import TrustFeatures from "@/components/sections/delivery/TrustFeatures"
import CustomerReviews from "@/components/sections/delivery/CustomerReviews"
import FinalCTA from "@/components/sections/delivery/FinalCTA"

export default function DeliveryPage() {
  return (
    <>
      <DeliveryHero />
      <ServiceProcess />
      <ServiceTypes />
      <TrustFeatures />
      <CustomerReviews />
      <FinalCTA />
    </>
  )
}