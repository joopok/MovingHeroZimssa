"use client"

import { motion } from "framer-motion"

export default function TrustIndicators() {

  return (
    <section className="py-20 lg:py-24 bg-neutral-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
              믿고 맡길 수 있는 이사 업체
            </h2>
            <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-neutral-900">
              어떻게 찾아야 할까?
            </h2>
            <p className="mt-6 text-xl text-primary font-semibold">
              짐싸 안심+ 프로그램이 지켜드려요
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 보증보험 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <img
                src="https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/trust/ic_main_trust_01.png"
                alt="보증보험"
                className="w-[60px] h-[60px]"
              />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              보증보험
            </h3>
            <p className="text-neutral-600 mb-4">
              이사 중 발생한 사고는 걱정 마세요.<br />
              이사 파트너사가 가입한 보증보험으로<br />
              피해를 보상해드립니다.
            </p>
            <p className="text-sm text-neutral-500">
              * 파트너사별 보증보험 가입 여부가 상이할 수 있습니다.
            </p>
          </motion.div>

          {/* 신원확인 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <img
                src="https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/trust/ic_main_trust_02.png"
                alt="신원확인"
                className="w-[60px] h-[60px]"
              />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              신원확인
            </h3>
            <p className="text-neutral-600 mb-4">
              이사 당일 파트너가 도착하면<br />
              짐싸 앱에서 신원을 확인할 수 있어요.<br />
              안심하고 이사하세요.
            </p>
          </motion.div>

          {/* 고객센터 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="mb-6">
              <img
                src="https://zimssa-static.s3.ap-northeast-2.amazonaws.com/zimssa-web/images/renewal/main/trust/ic_main_trust_03.png"
                alt="고객센터"
                className="w-[60px] h-[60px]"
              />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
              고객센터
            </h3>
            <p className="text-neutral-600 mb-4">
              이사 중 발생한 문제는<br />
              짐싸 고객센터에서 해결해드려요.<br />
              언제든지 연락주세요.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  )
}