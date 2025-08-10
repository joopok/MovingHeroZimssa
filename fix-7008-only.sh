#!/bin/sh
# 포트 7008만 고치는 스크립트
# 다른 설정 건드리지 않고 7008 포트만 작동하게 함

echo "========================================="
echo "🔧 포트 7008 문제 해결"
echo "========================================="

# Jenkins 컨테이너에서 앱 재시작
echo "📋 Jenkins 컨테이너에서 앱 재시작..."
docker exec jenkins bash -c "cd /var/jenkins_home/workspace/dabang-movers-app2 && pkill -f 'node.*server' || true"
sleep 2
docker exec jenkins bash -c "cd /var/jenkins_home/workspace/dabang-movers-app2 && PORT=7008 NODE_ENV=production nohup node server-simple.js > server.log 2>&1 &"

echo "✅ 앱 재시작됨"

# 잠시 대기
sleep 5

# 테스트
echo ""
echo "📋 포트 7008 테스트..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:7008)
echo "응답 코드: $response"

if [ "$response" = "200" ]; then
    echo "✅ 성공! http://192.168.0.109:7008 접속 가능"
else
    echo "❌ 여전히 문제가 있습니다. ($response)"
    echo ""
    echo "수동으로 실행해보세요:"
    echo "1. sudo docker exec -it jenkins bash"
    echo "2. cd /var/jenkins_home/workspace/dabang-movers-app2"
    echo "3. PORT=7008 node server-simple.js"
fi

echo "========================================="