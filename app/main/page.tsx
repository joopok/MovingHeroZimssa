import MainHero from "@/components/sections/main/MainHero"
import ServiceCards from "@/components/sections/main/ServiceCards"
import AppShowcase from "@/components/sections/main/AppShowcase"
import Statistics from "@/components/sections/main/Statistics"
import BlogPosts from "@/components/sections/main/BlogPosts"
import Testimonials from "@/components/sections/main/Testimonials"

export default function MainPage() {
  return (
    <main className="min-h-screen">
      <MainHero />
      <ServiceCards />
      <AppShowcase />
      <Statistics />
      <BlogPosts />
      <Testimonials />
    </main>
  )
}