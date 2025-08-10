import Link from "next/link"
import Image from "next/image"
import { COMPANY_INFO, FOOTER_LINKS, COMPANY_NAME, ASSETS } from "@/lib/constants"
import { Phone, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="font-bold text-3xl text-white">{COMPANY_NAME}</span>
            </div>
            <p className="text-gray-400 mb-6 text-lg">
              이사, 청소, 운송까지<br/>
              생활의 모든 순간을 함께합니다
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">고객센터</p>
                  <p className="text-base font-semibold text-white">{COMPANY_INFO.tel}</p>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p>평일 09:00 - 18:00</p>
                <p>점심시간 12:00 - 13:00</p>
                <p className="text-xs mt-1">(주말/공휴일 휴무)</p>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-3 mt-6">
              <Link href="https://facebook.com" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://youtube.com" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="https://blog.naver.com" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-base">회사 소개</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-base">이용약관</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.service.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-base">고객지원</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-12 pt-12 border-t border-gray-800">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4 text-lg">짐싸 앱 다운로드</h3>
              <p className="text-gray-400 mb-6">
                200만 고객이 선택한 1등 이사 플랫폼<br/>
                지금 바로 다운로드하고 편리하게 이용하세요
              </p>
              <div className="flex gap-3">
                <Link
                  href="https://apps.apple.com/kr/app/zimssa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={ASSETS.app.buttons.appStore}
                    alt="Download on App Store"
                    width={140}
                    height={42}
                    className="hover:opacity-80 transition-opacity"
                  />
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.zimssa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={ASSETS.app.buttons.googlePlay}
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                    className="hover:opacity-80 transition-opacity"
                  />
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4 text-lg">파트너 등록</h3>
              <p className="text-gray-400 mb-6">
                짐싸 파트너가 되어 더 많은 고객을 만나보세요<br/>
                이사, 청소, 운송 전문가를 기다립니다
              </p>
              <Link 
                href="/partner"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                파트너 등록하기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-8">
        <div className="container">
          <div className="space-y-4">
            <div className="text-sm text-gray-500 space-y-1">
              <p className="font-semibold text-gray-400 mb-2">{COMPANY_INFO.name}</p>
              <p>대표이사: {COMPANY_INFO.ceo} | 사업자등록번호: {COMPANY_INFO.businessNumber}</p>
              <p>주소: {COMPANY_INFO.address}</p>
              <p>대표전화: {COMPANY_INFO.tel} | 이메일: {COMPANY_INFO.email}</p>
              <p className="mt-2">통신판매업신고: 제2024-서울강남-1234호 | 화물자동차운송주선사업허가: 제1234호</p>
            </div>
            <div className="pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-600">
                © 2024 {COMPANY_NAME}. All rights reserved. | 짐싸는 통신판매중개자이며 통신판매의 당사자가 아닙니다.<br/>
                따라서 짐싸는 상품·거래 정보 및 거래에 대하여 책임을 지지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}