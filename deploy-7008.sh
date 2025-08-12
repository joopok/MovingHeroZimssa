#!/bin/bash

# NAS 7008 포트 배포 스크립트

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
cd /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

echo "📥 최신 코드 가져오기..."
git pull origin main

echo "🔧 7008 포트 배포 중..."
/usr/local/bin/docker stop app-7008 2>/dev/null || true
/usr/local/bin/docker rm app-7008 2>/dev/null || true

/usr/local/bin/docker run -d \
  --name app-7008 \
  -v $(pwd):/app \
  -w /app \
  -p 7008:7008 \
  -e PORT=7008 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "npm install --production && npm run build && npm run start"

echo ""
echo "✅ 7008 포트 배포 완료!"
/usr/local/bin/docker ps | grep app-7008

echo ""
echo "📌 접속: http://192.168.0.109:7008"
ENDSSH