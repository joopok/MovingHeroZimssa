#!/bin/bash

ssh joopok@192.168.0.109 'bash -s' << 'ENDSSH'
echo "~Asy10131227" | sudo -S /usr/local/bin/docker stop app-7015
echo "~Asy10131227" | sudo -S /usr/local/bin/docker rm app-7015

echo "~Asy10131227" | sudo -S /usr/local/bin/docker run -d \
  --name app-7015 \
  -p 7015:7015 \
  -e PORT=7015 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  node:20-alpine \
  sh -c "apk add git && \
         rm -rf /app && \
         git clone https://github.com/joopok/MovingHeroZimssa.git /app && \
         cd /app && \
         npm install && \
         npm run build && \
         npm run start"

echo "✅ 재배포 완료"
ENDSSH