#!/bin/bash

# NAS 7006, 7008 포트 자동 배포 스크립트
# 7007 포트는 절대 건드리지 않음 (시연용)

NAS_IP="192.168.0.109"
NAS_USER="joopok"
REMOTE_DIR="/volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2"

echo "🚀 NAS 포트 7006, 7008 배포 시작"
echo "⚠️  7007 포트는 시연용으로 보호됨"

# SSH 명령 실행
ssh $NAS_USER@$NAS_IP << 'ENDSSH'
cd /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

# Git 최신 코드 받기
echo "📥 최신 코드 가져오기..."
git pull origin main || git reset --hard origin/main

# 7006 포트 배포
echo "🔧 포트 7006 배포 중..."
docker stop app-7006 2>/dev/null || true
docker rm app-7006 2>/dev/null || true

docker run -d \
  --name app-7006 \
  -v $(pwd):/app \
  -w /app \
  -p 7006:7006 \
  -e PORT=7006 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "npm install --production && npm run build && npm run start"

# 7008 포트 배포
echo "🔧 포트 7008 배포 중..."
docker stop app-7008 2>/dev/null || true
docker rm app-7008 2>/dev/null || true

docker run -d \
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
echo "✅ 배포 완료 상태:"
docker ps | grep -E "app-7006|app-7008"

echo ""
echo "🔍 7007 포트 상태 (시연용 - 변경 없음):"
docker ps | grep app-7007 || echo "7007 포트는 실행 중이 아닙니다"

echo ""
echo "📌 접속 URL:"
echo "   - http://192.168.0.109:7006"
echo "   - http://192.168.0.109:7008"
echo "   - http://192.168.0.109:7007 (시연용 - 보호됨)"
ENDSSH

echo ""
echo "🎉 배포 스크립트 실행 완료!"