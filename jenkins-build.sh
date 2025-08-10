#!/bin/bash
set -euo pipefail

PORT=7008
echo "========================================="
echo "📦 dabang-movers-app 자동 배포 시작"
echo "🔧 포트: ${PORT}"
echo "🕐 시작 시간: $(date)"
echo "========================================="

# 1. 의존성 설치
echo ""
echo "📥 [1/5] 의존성 설치 중..."
npm ci --prefer-offline --no-audit --progress=false || npm install

# 2. 프로덕션 빌드
echo ""
echo "🔨 [2/5] Next.js 프로덕션 빌드 중..."
npm run build

# 빌드 성공 확인
if [ ! -d ".next" ]; then
    echo "❌ 빌드 실패: .next 디렉토리가 생성되지 않았습니다."
    exit 1
fi
echo "✅ 빌드 성공"

# 3. 기존 프로세스 종료
echo ""
echo "🔄 [3/5] 기존 프로세스 종료 중..."

# PID 파일로 종료
if [ -f "server.pid" ]; then
    OLD_PID=$(cat server.pid 2>/dev/null || echo "")
    if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
        echo "   기존 서버 종료 (PID: $OLD_PID)"
        kill -9 "$OLD_PID" || true
        sleep 2
    fi
fi

# 프로세스 이름으로 종료 (백업)
pkill -f "node.*server-nas" || true
pkill -f "node.*server.js" || true
pkill -f "next start" || true
sleep 2

# 4. Next.js 서버 시작
echo ""
echo "🚀 [4/5] Next.js 서버 시작 중..."

# server-nas.js 사용
if [ -f "server-nas.js" ]; then
    echo "   Custom server (server-nas.js) 사용"
    PORT=${PORT} NODE_ENV=production nohup node server-nas.js > server.log 2>&1 &
else
    echo "   Next.js 기본 서버 사용"
    PORT=${PORT} nohup npx next start -H 0.0.0.0 -p ${PORT} > server.log 2>&1 &
fi

PID=$!
echo $PID > server.pid
echo "   서버 PID: $PID"

# 5. 서버 시작 대기
echo ""
echo "⏳ [5/5] 서버 시작 확인 중..."
sleep 3

# 6. 헬스체크
SUCCESS=false
for i in {1..30}; do
    if curl -fsS "http://localhost:${PORT}/health" >/dev/null 2>&1 || curl -fsS "http://localhost:${PORT}" >/dev/null 2>&1; then
        SUCCESS=true
        break
    fi
    echo "   대기 중... ($i/30)"
    sleep 2
done

# 7. 결과 출력
echo ""
if [ "$SUCCESS" = true ]; then
    echo "========================================="
    echo "✅ 배포 성공!"
    echo "========================================="
    echo "📍 서버 상태: 실행 중"
    echo "🔗 내부 접속: http://localhost:${PORT}"
    echo "🔗 외부 접속: http://192.168.0.109:${PORT}"
    echo "📝 프로세스 ID: $(cat server.pid)"
    echo "🕐 완료 시간: $(date)"
    echo "========================================="

    echo ""
    echo "📋 서버 로그 (최근 10줄):"
    echo "-----------------------------------------"
    tail -n 10 server.log
    echo "-----------------------------------------"
else
    echo "❌ 배포 실패: 서버가 시작되지 않았습니다."
    echo "📋 에러 로그:"
    tail -n 20 server.log
    exit 1
fi