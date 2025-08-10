#!/bin/sh
# DSM Web Station용 설정 스크립트
# 포트 7007 사용 설정

echo "========================================="
echo "🔧 DSM Web Station 설정 for port 7007"
echo "========================================="

# 현재 설정 확인
echo ""
echo "📋 현재 Web Station 설정 확인..."

# Web Station nginx 설정 디렉토리 찾기
if [ -d "/usr/local/etc/nginx/conf.d" ]; then
    NGINX_CONF_DIR="/usr/local/etc/nginx/conf.d"
elif [ -d "/usr/syno/etc/packages/WebStation/nginx/conf.d" ]; then
    NGINX_CONF_DIR="/usr/syno/etc/packages/WebStation/nginx/conf.d"
elif [ -d "/etc/nginx/sites-enabled" ]; then
    NGINX_CONF_DIR="/etc/nginx/sites-enabled"
else
    echo "❌ nginx 설정 디렉토리를 찾을 수 없습니다."
    echo "DSM 웹 인터페이스에서 직접 설정하세요."
    exit 1
fi

echo "✅ nginx 설정 디렉토리: $NGINX_CONF_DIR"

# 설정 파일 생성
CONFIG_FILE="$NGINX_CONF_DIR/dabang-movers-7007.conf"

echo ""
echo "📋 리버스 프록시 설정 생성..."

cat > /tmp/dabang-movers-7007.conf << 'EOF'
# Dabang Movers App - Port 7007 to 7008 Proxy
server {
    listen 7007;
    listen [::]:7007;
    server_name _;
    
    # 로그 설정
    access_log /var/log/nginx/dabang-movers-access.log;
    error_log /var/log/nginx/dabang-movers-error.log;
    
    # 기본 프록시 설정
    location / {
        proxy_pass http://127.0.0.1:7008;
        proxy_http_version 1.1;
        
        # 헤더 설정
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $server_name;
        
        # 타임아웃 설정
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # 버퍼링 비활성화
        proxy_buffering off;
        proxy_request_buffering off;
    }
    
    # Next.js static files
    location /_next/static {
        proxy_pass http://127.0.0.1:7008/_next/static;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        
        # 정적 파일 캐싱
        proxy_cache_valid 200 60m;
        proxy_cache_valid 404 1m;
        add_header Cache-Control "public, max-age=3600, immutable";
    }
    
    # Next.js image optimization
    location /_next/image {
        proxy_pass http://127.0.0.1:7008/_next/image;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
    
    # API routes
    location /api {
        proxy_pass http://127.0.0.1:7008/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# 설정 파일 복사
echo ""
echo "📋 설정 파일 설치..."
sudo cp /tmp/dabang-movers-7007.conf "$CONFIG_FILE"

if [ $? -eq 0 ]; then
    echo "✅ 설정 파일 생성됨: $CONFIG_FILE"
else
    echo "❌ 설정 파일 생성 실패"
    echo "수동으로 복사하세요: sudo cp /tmp/dabang-movers-7007.conf $CONFIG_FILE"
fi

# nginx 설정 테스트
echo ""
echo "📋 nginx 설정 테스트..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ nginx 설정이 올바릅니다"
else
    echo "❌ nginx 설정에 오류가 있습니다"
    exit 1
fi

# nginx 재시작
echo ""
echo "📋 nginx 서비스 재시작..."

# DSM 버전에 따라 다른 명령 시도
if command -v synoservicecfg > /dev/null 2>&1; then
    sudo synoservicecfg --restart nginx
elif command -v synoservice > /dev/null 2>&1; then
    sudo synoservice --restart nginx
else
    sudo nginx -s reload
fi

echo "✅ nginx가 재시작되었습니다"

# 포트 확인
echo ""
echo "📋 포트 상태 확인..."
netstat -tln | grep -E "7007|7008" | while read line; do
    echo "  $line"
done

# Jenkins 컨테이너 내부에서 앱 재시작
echo ""
echo "📋 Jenkins 앱 재시작..."
if docker ps | grep -q jenkins; then
    docker exec jenkins bash -c "cd /var/jenkins_home/workspace/dabang-movers-app2 && pkill -f 'node.*server' || true"
    sleep 2
    docker exec jenkins bash -c "cd /var/jenkins_home/workspace/dabang-movers-app2 && PORT=7008 NODE_ENV=production nohup node server-simple.js > server.log 2>&1 &"
    echo "✅ Jenkins 앱이 재시작되었습니다"
else
    echo "⚠️  Jenkins 컨테이너가 실행 중이 아닙니다"
fi

echo ""
echo "========================================="
echo "✅ 설정 완료!"
echo "========================================="
echo ""
echo "📍 접속 주소:"
echo "   http://192.168.0.109:7007  (Web Station 프록시)"
echo "   http://192.168.0.109:7008  (직접 접속)"
echo "   http://192.168.0.109:8081  (Jenkins UI)"
echo ""
echo "🔍 로그 확인:"
echo "   sudo tail -f /var/log/nginx/dabang-movers-error.log"
echo "   docker logs jenkins"
echo ""
echo "💡 문제가 지속되면:"
echo "   1. DSM 웹에서 역방향 프록시 설정 확인"
echo "   2. Jenkins에서 앱 다시 빌드"
echo ""
echo "========================================="