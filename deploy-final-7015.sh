#!/bin/bash

echo "🚀 최종 7015 포트 배포"

# 파일 전송
scp deploy-fixed.tar.gz joopok@192.168.0.109:/tmp/

# NAS에서 실행
ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
cd /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

# 백업
cp -r app /tmp/app-backup 2>/dev/null || true

# 압축 해제
tar -xzf /tmp/deploy-fixed.tar.gz
rm /tmp/deploy-fixed.tar.gz

# Docker 재시작
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7015

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
echo "✅ 배포 완료!"
echo "~Asy10131227" | sudo -S /usr/local/bin/docker ps | grep app-7015

echo ""
echo "📌 5분 후 접속: http://192.168.0.109:7015"
echo "📌 로그 확인: sudo docker logs -f app-7015"
ENDSSH