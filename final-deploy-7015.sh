#!/bin/bash

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
cd /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

# 최신 코드 받기
git pull origin main

# 컨테이너 재시작
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7015

echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -v $(pwd):/app \
  -w /app \
  -p 7015:7015 \
  -e PORT=7015 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "rm -rf .next node_modules && npm install && npm run build && npm run start"

echo "✅ 배포 시작됨. 5분 후 확인하세요."
echo "📌 http://192.168.0.109:7015"
ENDSSH