import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

// Next.js 15 최적화된 폰트 설정
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

// Pretendard 폰트 (한국어)
const pretendardFont = {
  variable: '--font-pretendard'
}

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
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "다방무버스 - 편안한 이사를 도와드릴게요",
    description: "이사, 청소, 운송, 인터넷까지 한 번에! 최대 9개 업체 실시간 견적 비교.",
    url: "https://dabangmovers.com",
    siteName: "다방무버스",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "다방무버스",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "다방무버스 - 편안한 이사를 도와드릴게요",
    description: "이사, 청소, 운송, 인터넷까지 한 번에! 최대 9개 업체 실시간 견적 비교.",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${pretendardFont.variable}`}>
      <head>
        {/* Pretendard 폰트 - Next.js 15 최적화된 로드 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {/* Next.js 15 성능 향상을 위한 메타 태그 */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#3D51FF" />
      </head>
      <body 
        className={`
          min-h-screen bg-background antialiased 
          font-[var(--font-pretendard),var(--font-inter),system-ui,sans-serif]
          selection:bg-primary/20 selection:text-primary-foreground
        `}
        suppressHydrationWarning={true}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}