"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { memo } from "react"
interface BlogPost {
  id: number
  category: string
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
}

interface BaseProps {
  className?: string
}

const POSTS: BlogPost[] = [
  {
    id: 1,
    category: "이사 가이드",
    title: "이사 견적 받을 때 꼭 확인해야 할 5가지",
    excerpt: "합리적인 이사 비용을 위해 견적서에서 반드시 체크해야 할 항목들을 알려드립니다.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    date: "2024.11.15",
    readTime: "5분"
  },
  {
    id: 2,
    category: "청소 팁",
    title: "입주청소 체크리스트 완벽 가이드",
    excerpt: "새집 입주 전 깨끗한 시작을 위한 청소 체크리스트와 전문가 팁을 공유합니다.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
    date: "2024.11.14",
    readTime: "7분"
  },
  {
    id: 3,
    category: "운송 정보",
    title: "소형 화물 운송, 이렇게 준비하세요",
    excerpt: "안전하고 효율적인 소형 화물 운송을 위한 포장 방법과 주의사항을 알아봅니다.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    date: "2024.11.13",
    readTime: "4분"
  }
]

const BlogPosts = memo(function BlogPosts({ className }: BaseProps) {
  return (
    <section 
      className={`py-20 lg:py-32 bg-white ${className || ''}`}
      aria-label="블로그 포스트 섹션"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            함께 이용자들의 진짜 리뷰
          </h2>
          <p className="text-lg text-gray-600">
            실제 서비스를 이용한 고객님들의 생생한 후기를 확인하세요
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link 
                href={`/blog/${post.id}`}
                className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                aria-label={`${post.title} 블로그 글 읽기`}
              >
                <div className="group cursor-pointer">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${post.image}&auto=format&fit=crop)` }}
                      role="img"
                      aria-label={post.category}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.readTime} 읽기</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            aria-label="블로그 더 보기"
          >
            더 많은 콘텐츠 보기
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
})

BlogPosts.displayName = 'BlogPosts'

export default BlogPosts