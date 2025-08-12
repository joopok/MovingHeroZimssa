#!/bin/bash

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7015

# 완전히 새로운 컨테이너로 시작
echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -p 7015:7015 \
  -e PORT=7015 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "apk add --no-cache git && \
         git clone https://github.com/joopok/MovingHeroZimssa.git /app && \
         cd /app && \
         ls -la components/sections/main/ && \
         ls -la components/layout/ && \
         npm install && \
         npm run build && \
         npm run start"

echo "✅ 완전히 새로운 컨테이너로 재시작"
ENDSSH