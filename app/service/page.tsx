"use client"

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import TransportationHero from '@/components/sections/transportation/TransportationHero'
import ServiceProcess from '@/components/sections/transportation/ServiceProcess'
import ZimssaSystem from '@/components/sections/transportation/ZimssaSystem'
import TransportationReviews from '@/components/sections/transportation/TransportationReviews'
import PartnerStories from '@/components/sections/transportation/PartnerStories'
import AdditionalServices from '@/components/sections/transportation/AdditionalServices'
import PartnerRecruit from '@/components/sections/transportation/PartnerRecruit'
import FinalCta from '@/components/sections/transportation/FinalCta'

function ServiceContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  // Handle transportation service type
  if (type === 'delivery') {
    return (
      <>
        <TransportationHero />
        <ServiceProcess />
        <ZimssaSystem />
        <TransportationReviews />
        <PartnerStories />
        <AdditionalServices />
        <PartnerRecruit />
        <FinalCta />
      </>
    )
  }

  // Default or other service types can be added here
  return (
    <div className="min-h-screen pt-[100px] flex items-center justify-center">
      <h1 className="text-2xl">Service type not found</h1>
    </div>
  )
}

export default function ServicePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-[100px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <ServiceContent />
    </Suspense>
  )
}