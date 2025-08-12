#!/bin/bash

echo "🚀 7015 포트 배포 시작..."

# 먼저 로컬에서 빌드
echo "📦 로컬 빌드 시작..."
npm run build

# 빌드 성공 확인
if [ $? -ne 0 ]; then
    echo "❌ 로컬 빌드 실패"
    exit 1
fi

echo "✅ 로컬 빌드 성공"

# NAS로 전체 프로젝트 전송
echo "📤 NAS로 프로젝트 전송..."
rsync -av --exclude 'node_modules' --exclude '.git' \
  ./ joopok@192.168.0.109:/tmp/dabang-movers-app/

# NAS에서 Docker 실행
ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
# 기존 컨테이너 정리
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015 2>/dev/null
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm -f app-7015 2>/dev/null

# Dockerfile 생성
cat > /tmp/Dockerfile << 'EOF'
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 7015
ENV PORT=7015
ENV NODE_ENV=production
CMD ["npm", "run", "start"]
EOF

# Docker 이미지 빌드
cd /tmp/dabang-movers-app
echo "~Asy10131227" | sudo -S /usr/local/bin/docker build -f /tmp/Dockerfile -t dabang-app:7015 .

# 컨테이너 실행
echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -p 7015:7015 \
  --restart unless-stopped \
  dabang-app:7015

echo "✅ Docker 컨테이너 시작 완료"
ENDSSH

echo "🎉 배포 완료!"
echo "📌 접속 주소: http://192.168.0.109:7015"