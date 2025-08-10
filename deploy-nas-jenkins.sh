#!/bin/bash

# NAS Jenkins 배포 스크립트 - 정확한 경로 버전
# joopok@192.168.0.109:/volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

set -e

echo "🚀 NAS 서버 배포 시작 (Jenkins 경로)"
echo "📁 경로: /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2"
echo "========================================="

# 설정
NAS_USER="joopok"
NAS_IP="192.168.0.109"
NAS_PORT="7008"
REMOTE_DIR="/volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2"

# 1단계: 로컬 빌드
echo ""
echo "📦 1단계: 로컬에서 앱 빌드..."
npm run build

# 2단계: CSS 파일 확인
echo ""
echo "✅ 2단계: CSS 파일 확인..."
CSS_FILE=$(ls .next/static/css/*.css | head -1 | xargs basename)
echo "📄 CSS 파일: $CSS_FILE"

# 3단계: NAS로 파일 전송
echo ""
echo "🚀 3단계: NAS로 파일 전송..."

# 기존 서버 중지
echo "🛑 기존 서버 중지..."
ssh $NAS_USER@$NAS_IP "pkill -f 'node.*server' || true"
sleep 2

# .next 폴더 전체 전송
echo "📤 .next 폴더 업로드 중..."
rsync -avz --delete .next/ $NAS_USER@$NAS_IP:$REMOTE_DIR/.next/

# 서버 파일 전송
echo "📤 서버 파일 전송..."
scp server-nas.js package.json $NAS_USER@$NAS_IP:$REMOTE_DIR/

# public 폴더 전송
if [ -d "public" ]; then
  echo "📤 public 폴더 전송..."
  rsync -avz public/ $NAS_USER@$NAS_IP:$REMOTE_DIR/public/
fi

# 4단계: NAS에서 서버 시작
echo ""
echo "🔧 4단계: NAS 서버 시작..."
ssh $NAS_USER@$NAS_IP "cd $REMOTE_DIR && npm install --production"
ssh $NAS_USER@$NAS_IP "cd $REMOTE_DIR && nohup node server-nas.js > server.log 2>&1 &"

# 5단계: 작동 확인
echo ""
echo "✅ 5단계: 배포 확인..."
sleep 3

# 메인 페이지 테스트
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$NAS_IP:$NAS_PORT/" || echo "000")
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ 메인 페이지: 정상 (HTTP $HTTP_STATUS)"
else
    echo "❌ 메인 페이지: 실패 (HTTP $HTTP_STATUS)"
fi

# CSS 테스트
CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://$NAS_IP:$NAS_PORT/_next/static/css/$CSS_FILE" || echo "000")
if [ "$CSS_STATUS" = "200" ]; then
    echo "✅ CSS 파일: 정상 작동!"
    echo "🎨 CSS URL: http://$NAS_IP:$NAS_PORT/_next/static/css/$CSS_FILE"
else
    echo "❌ CSS 파일: 로드 실패 (HTTP $CSS_STATUS)"
fi

echo ""
echo "🎉 배포 완료!"
echo "========================"
echo "🌐 웹사이트: http://$NAS_IP:$NAS_PORT/"
echo "📋 로그 확인: ssh $NAS_USER@$NAS_IP 'tail -f $REMOTE_DIR/server.log'"
echo ""
echo "✨ 브라우저에서 http://$NAS_IP:$NAS_PORT/ 접속해서 CSS 확인!"