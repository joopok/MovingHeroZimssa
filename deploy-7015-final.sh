#!/bin/bash

echo "🚀 포트 7015 최종 배포 시작..."

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
# 기존 컨테이너 완전 정리
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015 2>/dev/null
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm -f app-7015 2>/dev/null

# 작업 디렉토리 생성
mkdir -p /tmp/app-7015
cd /tmp/app-7015

# Dockerfile 생성 (빌드와 실행을 한번에)
cat > Dockerfile << 'EOF'
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/joopok/MovingHeroZimssa.git .
RUN npm install
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
ENV PORT=7015
ENV NODE_ENV=production
EXPOSE 7015
CMD ["npm", "run", "start"]
EOF

# Docker 이미지 빌드
echo "🔨 Docker 이미지 빌드 중..."
echo "~Asy10131227" | sudo -S /usr/local/bin/docker build -t app-7015:latest .

# 컨테이너 실행
echo "🚀 컨테이너 실행..."
echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -p 7015:7015 \
  --restart unless-stopped \
  app-7015:latest

# 상태 확인
echo "~Asy10131227" | sudo -S /usr/local/bin/docker ps | grep app-7015

echo "✅ 배포 완료!"
echo "📌 접속 주소: http://192.168.0.109:7015"
echo "📌 로그 확인: sudo docker logs -f app-7015"
ENDSSH