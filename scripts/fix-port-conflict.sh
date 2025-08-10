#!/bin/sh
# Web Station 포트 충돌 해결 스크립트
# 7008이 Web Station에서 사용 중이므로 7009로 변경

echo "========================================="
echo "🔧 포트 충돌 해결 (7008 → 7009)"
echo "========================================="

NEW_PORT=7009

echo ""
echo "📋 Jenkins 컨테이너에서 7009 포트로 앱 시작..."

# 기존 프로세스 종료
docker exec jenkins bash -c "pkill -f 'node.*server' || true"
sleep 2

# 새 포트로 서버 시작
docker exec jenkins bash -c "cd /var/jenkins_home/workspace/dabang-movers-app2 && PORT=$NEW_PORT NODE_ENV=production nohup node server-simple.js > server.log 2>&1 &"

echo "✅ 포트 $NEW_PORT로 앱 시작됨"

# 잠시 대기
sleep 5

# 테스트
echo ""
echo "📋 포트 $NEW_PORT 테스트..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$NEW_PORT)
echo "응답 코드: $response"

if [ "$response" = "200" ]; then
    echo ""
    echo "========================================="
    echo "✅ 성공!"
    echo "========================================="
    echo "접속 주소: http://192.168.0.109:$NEW_PORT"
    echo "========================================="
else
    echo ""
    echo "❌ 문제가 있습니다."
    echo ""
    echo "Jenkins에서 빌드가 필요합니다:"
    echo "1. http://192.168.0.109:8081 접속"
    echo "2. dabang-movers-app2 빌드"
fi