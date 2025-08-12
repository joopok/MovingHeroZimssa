#!/bin/bash

# NAS 7008 포트 배포 (sudo 비밀번호 자동 입력)

echo "🚀 7008 포트 배포 시작 (sudo 사용)"

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
cd /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

# Git 최신 코드
git pull origin main

# 기존 컨테이너 정리
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7008 2>/dev/null || true
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7008 2>/dev/null || true

# 새 컨테이너 실행
echo "🔧 7008 포트 Docker 컨테이너 실행 중..."
echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7008 \
  -v $(pwd):/app \
  -w /app \
  -p 7008:7008 \
  -e PORT=7008 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "npm install --production && npm run build && npm run start"

# 상태 확인
echo ""
echo "✅ 배포 완료!"
echo "~Asy10131227" | sudo -S /usr/local/bin/docker ps | grep app-7008
echo ""
echo "📌 접속: http://192.168.0.109:7008"
ENDSSH