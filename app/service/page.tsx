"use client"

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ServiceContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  // Handle transportation service type
  if (type === 'delivery') {
    return (
      <div className="min-h-screen pt-[100px]">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">운송 서비스</h1>
          <p className="text-lg text-gray-600">빠르고 안전한 운송 서비스를 제공합니다.</p>
        </div>
      </div>
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