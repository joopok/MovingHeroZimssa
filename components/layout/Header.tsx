"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { NAVIGATION_ITEMS, COMPANY_NAME } from "@/lib/constants"
import { cn } from "@/lib/utils"
import AppDownloadModal from "@/components/modals/AppDownloadModal"
import InternetPopup from "@/components/ui/InternetPopup"

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAppDownloadModalOpen, setIsAppDownloadModalOpen] = useState(false)
  const [isInternetPopupOpen, setIsInternetPopupOpen] = useState(false)

  // Check if current page needs opaque header (pages with colored backgrounds)
  const needsOpaqueHeader = ['/cleaning', '/moving', '/delivery'].includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled || needsOpaqueHeader
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" 
          : "bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex h-[80px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(
              "font-bold text-[32px] transition-colors duration-200",
              isScrolled || needsOpaqueHeader ? "text-primary" : "text-white"
            )}>{COMPANY_NAME}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center" style={{ gap: '63.9936px' }}>
            {NAVIGATION_ITEMS.map((item) => {
              // Handle 인터넷 menu click as popup trigger
              if (item.name === '인터넷') {
                return (
                  <button
                    key={item.name}
                    onClick={() => setIsInternetPopupOpen(true)}
                    className={cn(
                      "block no-underline cursor-pointer transition-all",
                      isScrolled || needsOpaqueHeader
                        ? "text-neutral-700" 
                        : "text-white"
                    )}
                    style={{
                      padding: '0px',
                      margin: '0px',
                      textDecoration: 'none',
                      background: 'transparent',
                      border: 'none'
                    }}
                  >
                    <div 
                      className="block cursor-pointer transition-all"
                      style={{
                        width: 'auto',
                        height: '24px',
                        padding: '0px',
                        margin: '0px',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        border: '0px none',
                        borderRadius: '0px',
                        transform: 'none',
                        opacity: 1,
                        position: 'static',
                        zIndex: 'auto'
                      }}
                    >
                      <div 
                        className={cn(
                          "whitespace-nowrap",
                          isScrolled || needsOpaqueHeader ? "text-neutral-700" : "text-white"
                        )}
                        style={{
                          fontSize: '18px',
                          fontWeight: 700,
                          fontFamily: 'var(--font-pretendard), sans-serif',
                          textAlign: 'start',
                          lineHeight: '24px',
                          letterSpacing: 'normal',
                          textDecoration: 'none',
                          textTransform: 'none',
                          wordSpacing: '0px'
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                  </button>
                )
              }
              
              // Handle other menu items as regular links
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_self"
                  className={cn(
                    "block no-underline cursor-pointer transition-all relative",
                    isScrolled || needsOpaqueHeader
                      ? isActive ? "text-primary" : "text-neutral-700" 
                      : "text-white"
                  )}
                  style={{
                    padding: '0px',
                    margin: '0px',
                    textDecoration: 'none'
                  }}
                >
                  <div 
                    className="block cursor-pointer transition-all"
                    style={{
                      width: 'auto',
                      height: '24px',
                      padding: '0px',
                      margin: '0px',
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      border: '0px none',
                      borderRadius: '0px',
                      transform: 'none',
                      opacity: 1,
                      position: 'static',
                      zIndex: 'auto'
                    }}
                  >
                    <div 
                      className={cn(
                        "whitespace-nowrap",
                        isScrolled || needsOpaqueHeader
                          ? isActive ? "text-primary" : "text-neutral-700" 
                          : "text-white"
                      )}
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-pretendard), sans-serif',
                        textAlign: 'start',
                        lineHeight: '24px',
                        letterSpacing: 'normal',
                        textDecoration: 'none',
                        textTransform: 'none',
                        wordSpacing: '0px'
                      }}
                    >
                      {item.name}
                    </div>
                    {/* Active indicator underline */}
                    {isActive && (
                      <div 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transition-all"
                        style={{
                          backgroundColor: isScrolled || needsOpaqueHeader ? '#3D51FF' : '#ffffff'
                        }}
                      />
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsAppDownloadModalOpen(true)}
              className={cn(
                "px-10 py-3 rounded-full text-[16px] font-bold transition-all duration-200",
                isScrolled || needsOpaqueHeader
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-secondary hover:text-neutral-900"
              )}
              style={{ borderRadius: '102px' }}
            >
              앱 다운로드
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 rounded-lg transition-colors",
              isScrolled || needsOpaqueHeader ? "hover:bg-neutral-100" : "hover:bg-white/10"
            )}
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <X className={cn(
                "h-6 w-6 transition-colors",
                isScrolled || needsOpaqueHeader ? "text-neutral-700" : "text-white"
              )} />
            ) : (
              <Menu className={cn(
                "h-6 w-6 transition-colors",
                isScrolled || needsOpaqueHeader ? "text-neutral-700" : "text-white"
              )} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[80px] bg-white border-b border-neutral-200 transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <nav className="container py-4">
          <div className="space-y-3">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href
              
              // Handle 인터넷 menu click as popup trigger in mobile
              if (item.name === '인터넷') {
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsInternetPopupOpen(true)
                    }}
                    className="block w-full text-left no-underline cursor-pointer transition-all py-2"
                    style={{
                      textDecoration: 'none',
                      color: 'rgb(55, 55, 55)',
                      background: 'transparent',
                      border: 'none'
                    }}
                  >
                    <div 
                      className="block"
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-pretendard), sans-serif',
                        color: 'rgb(55, 55, 55)',
                        lineHeight: '24px',
                        textAlign: 'start',
                        letterSpacing: 'normal',
                        textDecoration: 'none',
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                        wordSpacing: '0px'
                      }}
                    >
                      {item.name}
                    </div>
                  </button>
                )
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_self"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block no-underline cursor-pointer transition-all py-2 relative",
                    isActive && "bg-primary/5"
                  )}
                  style={{
                    textDecoration: 'none'
                  }}
                >
                  <div 
                    className="block"
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-pretendard), sans-serif',
                      color: isActive ? '#3D51FF' : 'rgb(55, 55, 55)',
                      lineHeight: '24px',
                      textAlign: 'start',
                      letterSpacing: 'normal',
                      textDecoration: 'none',
                      textTransform: 'none',
                      whiteSpace: 'nowrap',
                      wordSpacing: '0px'
                    }}
                  >
                    {item.name}
                  </div>
                  {/* Active indicator */}
                  {isActive && (
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                      style={{ backgroundColor: '#3D51FF' }}
                    />
                  )}
                </Link>
              )
            })}
            <hr className="my-3 border-neutral-200" />
            <Link
              href="/partner"
              target="_self"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block no-underline cursor-pointer transition-all py-2"
              style={{
                textDecoration: 'none',
                color: 'rgb(55, 55, 55)'
              }}
            >
              <div 
                className="block"
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-pretendard), sans-serif',
                  color: 'rgb(55, 55, 55)',
                  lineHeight: '24px',
                  textAlign: 'start',
                  letterSpacing: 'normal',
                  textDecoration: 'none',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  wordSpacing: '0px'
                }}
              >
                파트너 등록
              </div>
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                setIsAppDownloadModalOpen(true)
              }}
              className="block w-full bg-primary text-white text-[16px] text-center py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              앱 다운로드
            </button>
          </div>
        </nav>
      </div>

      {/* App Download Modal */}
      <AppDownloadModal 
        isOpen={isAppDownloadModalOpen}
        onClose={() => setIsAppDownloadModalOpen(false)}
      />
      
      {/* Internet Popup */}
      <InternetPopup
        isOpen={isInternetPopupOpen}
        onClose={() => setIsInternetPopupOpen(false)}
      />
    </header>
  )
}