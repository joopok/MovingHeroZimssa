#!/bin/sh
# DSM 가상 호스트 빠른 설정 스크립트
# Web Station 가상 호스트로 Next.js 앱 배포

echo "========================================="
echo "🚀 DSM 가상 호스트 설정"
echo "   Dabang Movers App"
echo "========================================="

# 설정 변수
WEB_ROOT="/volume1/web/dabang-movers"
JENKINS_WORKSPACE="/volume1/@docker/volumes/jenkins_home/_data/workspace/dabang-movers-app2"
PORT=7008
PROXY_PORT=7007

# 색상 코드
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 함수
print_success() {
    echo "${GREEN}✅ $1${NC}"
}

print_error() {
    echo "${RED}❌ $1${NC}"
}

print_warning() {
    echo "${YELLOW}⚠️  $1${NC}"
}

# Root 권한 확인
if [ "$EUID" -ne 0 ]; then 
    print_error "Root 권한이 필요합니다. sudo를 사용하세요."
    exit 1
fi

echo ""
echo "📋 Step 1: 웹 디렉토리 생성..."
if [ ! -d "$WEB_ROOT" ]; then
    mkdir -p "$WEB_ROOT"
    print_success "웹 디렉토리 생성됨: $WEB_ROOT"
else
    print_warning "웹 디렉토리가 이미 존재합니다"
fi

echo ""
echo "📋 Step 2: Jenkins 빌드 파일 복사..."
if [ -d "$JENKINS_WORKSPACE" ]; then
    # 기존 파일 백업
    if [ -d "$WEB_ROOT.backup" ]; then
        rm -rf "$WEB_ROOT.backup"
    fi
    if [ -d "$WEB_ROOT" ] && [ "$(ls -A $WEB_ROOT)" ]; then
        mv "$WEB_ROOT" "$WEB_ROOT.backup"
        mkdir -p "$WEB_ROOT"
        print_warning "기존 파일을 백업했습니다"
    fi
    
    # 파일 복사
    cp -r "$JENKINS_WORKSPACE/"* "$WEB_ROOT/"
    print_success "파일 복사 완료"
else
    print_error "Jenkins workspace를 찾을 수 없습니다"
    print_warning "Jenkins에서 먼저 빌드하세요"
fi

echo ""
echo "📋 Step 3: 권한 설정..."
# http 사용자 확인
if id "http" >/dev/null 2>&1; then
    WEB_USER="http"
elif id "www-data" >/dev/null 2>&1; then
    WEB_USER="www-data"
else
    WEB_USER="nobody"
fi

chown -R ${WEB_USER}:${WEB_USER} "$WEB_ROOT"
chmod -R 755 "$WEB_ROOT"
print_success "권한 설정 완료 (user: $WEB_USER)"

echo ""
echo "📋 Step 4: Nginx 가상 호스트 설정..."

# Nginx 설정 디렉토리 찾기
if [ -d "/usr/local/etc/nginx/conf.d" ]; then
    NGINX_CONF_DIR="/usr/local/etc/nginx/conf.d"
elif [ -d "/usr/syno/etc/packages/WebStation/nginx/conf.d" ]; then
    NGINX_CONF_DIR="/usr/syno/etc/packages/WebStation/nginx/conf.d"
else
    NGINX_CONF_DIR="/etc/nginx/conf.d"
fi

# 가상 호스트 설정 생성
cat > "$NGINX_CONF_DIR/dabang-virtual-host.conf" << EOF
# Dabang Movers Virtual Host Configuration
server {
    listen $PROXY_PORT;
    server_name _;
    
    # 로그
    access_log /var/log/nginx/dabang-movers-access.log;
    error_log /var/log/nginx/dabang-movers-error.log;
    
    # 최대 업로드 크기
    client_max_body_size 100M;
    
    # 타임아웃 설정
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
    
    # Node.js 앱 프록시
    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        
        # WebSocket 지원
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass \$http_upgrade;
        
        # 헤더 설정
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header X-Forwarded-Host \$server_name;
        
        # 버퍼링 비활성화
        proxy_buffering off;
    }
    
    # Next.js 정적 파일
    location /_next/static {
        alias $WEB_ROOT/.next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Public 파일
    location /public {
        alias $WEB_ROOT/public;
        expires 30d;
        add_header Cache-Control "public";
    }
    
    # 헬스체크
    location /health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}
EOF

print_success "Nginx 설정 파일 생성됨"

echo ""
echo "📋 Step 5: PM2 설정 (Node.js 프로세스 관리)..."

# PM2 설치 확인
if ! command -v pm2 > /dev/null 2>&1; then
    print_warning "PM2가 설치되어 있지 않습니다. 설치 중..."
    npm install -g pm2
fi

# PM2 ecosystem 파일 생성
cat > "$WEB_ROOT/ecosystem.config.js" << EOF
module.exports = {
  apps: [{
    name: 'dabang-movers',
    script: './server-simple.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: $PORT
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# 로그 디렉토리 생성
mkdir -p "$WEB_ROOT/logs"
chown -R ${WEB_USER}:${WEB_USER} "$WEB_ROOT/logs"

print_success "PM2 설정 파일 생성됨"

echo ""
echo "📋 Step 6: Node.js 앱 시작..."

# 기존 프로세스 종료
pm2 stop dabang-movers 2>/dev/null || true
pm2 delete dabang-movers 2>/dev/null || true

# Jenkins 컨테이너 내 프로세스도 종료
docker exec jenkins pkill -f "node.*server" 2>/dev/null || true

# PM2로 앱 시작
cd "$WEB_ROOT"
pm2 start ecosystem.config.js
pm2 save

print_success "Node.js 앱이 PM2로 시작되었습니다"

echo ""
echo "📋 Step 7: Nginx 재시작..."

# Nginx 설정 테스트
nginx -t
if [ $? -eq 0 ]; then
    # Nginx 재시작
    if command -v synoservicecfg > /dev/null 2>&1; then
        synoservicecfg --restart nginx
    elif command -v synoservice > /dev/null 2>&1; then
        synoservice --restart pkgctl-WebStation
    else
        nginx -s reload
    fi
    print_success "Nginx가 재시작되었습니다"
else
    print_error "Nginx 설정에 오류가 있습니다"
fi

echo ""
echo "📋 Step 8: 상태 확인..."

# PM2 상태
echo ""
echo "PM2 프로세스 상태:"
pm2 status

# 포트 확인
echo ""
echo "포트 상태:"
netstat -tlnp 2>/dev/null | grep -E "$PROXY_PORT|$PORT" || netstat -tln | grep -E "$PROXY_PORT|$PORT"

# 테스트
echo ""
echo "📋 연결 테스트..."
sleep 3

response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT)
if [ "$response" = "200" ]; then
    print_success "Node.js 앱 응답 정상 (포트 $PORT)"
else
    print_warning "Node.js 앱 응답: $response"
fi

response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$PROXY_PORT)
if [ "$response" = "200" ]; then
    print_success "가상 호스트 응답 정상 (포트 $PROXY_PORT)"
else
    print_warning "가상 호스트 응답: $response"
fi

echo ""
echo "========================================="
echo "✅ 가상 호스트 설정 완료!"
echo "========================================="
echo ""
echo "📍 접속 주소:"
echo "   가상 호스트: http://192.168.0.109:$PROXY_PORT"
echo "   직접 접속:   http://192.168.0.109:$PORT"
echo ""
echo "🔍 유용한 명령어:"
echo "   PM2 상태:    pm2 status"
echo "   PM2 로그:    pm2 logs dabang-movers"
echo "   PM2 재시작:  pm2 restart dabang-movers"
echo "   Nginx 로그:  tail -f /var/log/nginx/dabang-movers-error.log"
echo ""
echo "💡 DSM Web Station에서 추가 설정:"
echo "   1. 제어판 → Web Station"
echo "   2. 가상 호스트 생성"
echo "   3. 포트 $PROXY_PORT 설정"
echo ""
echo "========================================="