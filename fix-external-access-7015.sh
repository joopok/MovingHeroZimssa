#!/bin/bash

echo "🔧 7015 포트 외부 접속 설정"

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
cd /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

# 기존 컨테이너 중지
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015 2>/dev/null || true
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7015 2>/dev/null || true

# 외부 접속 가능하도록 재시작 (0.0.0.0 바인딩)
echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -v $(pwd):/app \
  -w /app \
  -p 7015:7015 \
  -e PORT=7015 \
  -e HOSTNAME=0.0.0.0 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "npm install --production && npm run build && npm run start"

echo ""
echo "✅ 5-10분 후 접속 가능:"
echo "   http://192.168.0.109:7015"
echo ""
echo "📌 빌드 진행 상황 확인:"
echo "   sudo docker logs -f app-7015"
ENDSSH