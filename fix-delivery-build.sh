#!/bin/bash

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
cd /volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2

# Git 완전 초기화
rm -rf .git
git init
git remote add origin https://github.com/joopok/MovingHeroZimssa.git
git fetch origin
git checkout -t origin/main

# 파일 권한 수정
chmod -R 755 components/
chmod -R 755 app/

# 파일 확인
echo "=== 파일 확인 ==="
ls -la components/sections/delivery/
ls -la app/delivery/

# Docker 컨테이너 내부에서 직접 빌드
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7015

# 새로운 방법 - 컨테이너 내부에서 git clone
echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -p 7015:7015 \
  -e PORT=7015 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "apk add git && \
         git clone https://github.com/joopok/MovingHeroZimssa.git /app && \
         cd /app && \
         npm install && \
         npm run build && \
         npm run start"

echo ""
echo "✅ Git 직접 clone으로 재배포"
echo "📌 5-10분 후: http://192.168.0.109:7015"
echo "📌 로그 확인: sudo docker logs -f app-7015"
ENDSSH