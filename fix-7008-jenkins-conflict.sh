#!/bin/bash

echo "🚨 Jenkins가 7008 포트를 사용 중입니다!"
echo "📌 해결 방법:"

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
# app-7008 컨테이너 정리
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7008 2>/dev/null || true
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7008 2>/dev/null || true

echo ""
echo "🔍 현재 포트 사용 상황:"
echo "~Asy10131227" | sudo -S /usr/local/bin/docker ps | grep -E "7006|7007|7008|7009"

echo ""
echo "📌 Jenkins 컨테이너가 7008-7014 포트를 모두 사용 중입니다."
echo "   7006 포트로 배포를 시도합니다..."

cd /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

# 7006 포트는 Jenkins가 사용 중이므로 7015 포트 사용
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015 2>/dev/null || true
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7015 2>/dev/null || true

echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -v $(pwd):/app \
  -w /app \
  -p 7015:7015 \
  -e PORT=7015 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "npm install --production && npm run build && PORT=7015 npm run start"

echo ""
echo "✅ 7015 포트로 배포 완료!"
echo "~Asy10131227" | sudo -S /usr/local/bin/docker ps | grep app-7015
echo ""
echo "📌 접속: http://192.168.0.109:7015"
echo ""
echo "⚠️  Jenkins가 7006-7014 포트를 모두 사용 중입니다!"
echo "    시연은 7007 포트로 가능합니다 (Jenkins 내부에서 실행)"
ENDSSH