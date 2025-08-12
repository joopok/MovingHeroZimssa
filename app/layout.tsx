import type { Metadata, Viewport } from "next"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "다방무버스 - 편안한 이사를 도와드릴게요",
  description: "이사, 청소, 운송, 인터넷까지 한 번에! 최대 9개 업체 실시간 견적 비교. 안심플러스로 더욱 안전하게.",
  keywords: "이사, 포장이사, 반포장이사, 원룸이사, 사무실이사, 청소, 입주청소, 운송, 용달, 화물, 인터넷설치",
  authors: [{ name: "Dabang Movers" }],
  creator: "Dabang Movers",
  publisher: "Dabang Movers",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://dabangmovers.com',
    siteName: '다방무버스',
    title: '다방무버스 - 편안한 이사를 도와드릴게요',
    description: '이사, 청소, 운송, 인터넷까지 한 번에! 최대 9개 업체 실시간 견적 비교',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '다방무버스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '다방무버스 - 편안한 이사를 도와드릴게요',
    description: '이사, 청소, 운송, 인터넷까지 한 번에! 최대 9개 업체 실시간 견적 비교',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}