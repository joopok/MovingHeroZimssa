#!/bin/bash

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
# 컨테이너 완전 삭제
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015 2>/dev/null
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm -f app-7015 2>/dev/null

# 새로운 컨테이너 실행 (rm -rf /app 추가)
echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -p 7015:7015 \
  -e PORT=7015 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "apk add --no-cache git && \
         rm -rf /app && \
         git clone https://github.com/joopok/MovingHeroZimssa.git /app && \
         cd /app && \
         npm install && \
         npm run build && \
         npm run start"

echo "✅ 7015 포트로 배포 시작"
echo "📌 빌드 진행 중... 5-10분 소요"
echo "📌 확인: http://192.168.0.109:7015"
ENDSSH