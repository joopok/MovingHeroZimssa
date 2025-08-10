# DSM Web Station 가상 호스트 설정 가이드

## 📋 가상 호스트로 설정 가능 여부: ✅ 가능

DSM Web Station에서 가상 호스트를 사용하여 Next.js 앱을 서비스할 수 있습니다.

## 🔧 DSM 웹 인터페이스 설정 방법

### 1. DSM 로그인
- 브라우저: `http://192.168.0.109:5000`
- 관리자 계정으로 로그인

### 2. Web Station 설정

#### Step 1: Web Station 패키지 확인
1. **패키지 센터** 열기
2. **Web Station** 설치 확인 (없으면 설치)
3. **Node.js** 패키지도 설치 필요

#### Step 2: 가상 호스트 생성
1. **제어판 → Web Station** 열기
2. **웹 서비스 포털** 탭 클릭
3. **생성** 버튼 클릭
4. 다음 설정 입력:

```
서비스 포털 설정:
- 포털 유형: 이름 기반
- 호스트 이름: movers.local (또는 원하는 도메인)
- 포트: HTTP - 80, HTTPS - 443

또는

- 포털 유형: 포트 기반
- 포트: 7007
- 프로토콜: HTTP
```

5. **문서 루트** 설정:
   - `/web/dabang-movers` 선택 (새 폴더 생성)

#### Step 3: 백엔드 서버 설정
1. **백엔드 서버** 탭에서
2. **Node.js** 선택
3. 다음 설정:
```
- Node.js 버전: 최신 버전 선택
- 시작 스크립트: server.js
- 포트: 7008
```

### 3. 역방향 프록시 설정 (권장)

#### 제어판 → 응용 프로그램 포털 → 역방향 프록시

1. **생성** 클릭
2. **일반 설정**:
```
설명: Dabang Movers App
프로토콜: HTTP
호스트 이름: * (모든 호스트)
포트: 7007
HSTS 활성화: 선택 해제
HTTP/2 활성화: 선택
```

3. **소스**:
```
프로토콜: HTTP
호스트 이름: 192.168.0.109
포트: 7007
```

4. **대상**:
```
프로토콜: HTTP
호스트 이름: localhost
포트: 7008
```

5. **사용자 지정 헤더** 탭:
- **생성** 클릭
- WebSocket 지원을 위한 헤더 추가:
```
Upgrade: $http_upgrade
Connection: upgrade
```

### 4. 파일 배포 방법

#### Option A: 직접 파일 복사
```bash
# SSH로 NAS 접속
ssh admin@192.168.0.109

# 웹 폴더 생성
sudo mkdir -p /volume1/web/dabang-movers

# Jenkins workspace에서 복사
sudo cp -r /volume1/@docker/volumes/jenkins_home/_data/workspace/dabang-movers-app2/* /volume1/web/dabang-movers/

# 권한 설정
sudo chown -R http:http /volume1/web/dabang-movers
sudo chmod -R 755 /volume1/web/dabang-movers
```

#### Option B: 심볼릭 링크 사용
```bash
# 심볼릭 링크 생성
sudo ln -s /volume1/@docker/volumes/jenkins_home/_data/workspace/dabang-movers-app2 /volume1/web/dabang-movers

# 권한 설정
sudo chown -R http:http /volume1/web/dabang-movers
```

### 5. 가상 호스트 직접 설정 파일

`/usr/local/etc/nginx/conf.d/dabang-virtual-host.conf`:

```nginx
server {
    listen 7007;
    server_name movers.local 192.168.0.109;
    
    # 로그 설정
    access_log /var/log/nginx/dabang-movers-access.log;
    error_log /var/log/nginx/dabang-movers-error.log;
    
    # 문서 루트
    root /volume1/web/dabang-movers;
    
    # Node.js 앱 프록시
    location / {
        proxy_pass http://127.0.0.1:7008;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 정적 파일 직접 서빙
    location /_next/static {
        alias /volume1/web/dabang-movers/.next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /public {
        alias /volume1/web/dabang-movers/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🚀 PM2를 사용한 Node.js 앱 실행 (권장)

### PM2 설치 및 설정
```bash
# Node.js 패키지 설치 (DSM 패키지 센터에서)
# SSH 접속 후
sudo npm install -g pm2

# PM2 설정 파일 생성
cat > /volume1/web/dabang-movers/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'dabang-movers',
    script: './server-simple.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 7008
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}
EOF

# PM2로 앱 시작
cd /volume1/web/dabang-movers
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🔍 문제 해결

### 403 오류 해결
1. **권한 확인**:
```bash
# 웹 서버 사용자 확인
ps aux | grep nginx
# 보통 http 또는 www-data

# 권한 수정
sudo chown -R http:http /volume1/web/dabang-movers
sudo chmod -R 755 /volume1/web/dabang-movers
```

2. **방화벽 규칙**:
- 제어판 → 보안 → 방화벽
- 포트 7007, 7008 허용

3. **Web Station PHP 설정**:
- Web Station → PHP 설정
- open_basedir 제한 해제

### 상태 확인 명령어
```bash
# nginx 설정 테스트
sudo nginx -t

# 서비스 재시작
sudo synoservice --restart pkgctl-WebStation

# 포트 확인
netstat -tlnp | grep -E "7007|7008"

# 로그 확인
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/dabang-movers-error.log
```

## ✅ 예상 결과

설정 완료 후:
- `http://192.168.0.109:7007` - 가상 호스트 접속
- `http://movers.local:7007` - 도메인 접속 (hosts 파일 설정 필요)
- `http://192.168.0.109:7008` - Node.js 앱 직접 접속

## 💡 추가 팁

### hosts 파일 설정 (클라이언트 PC)
Windows: `C:\Windows\System32\drivers\etc\hosts`
Mac/Linux: `/etc/hosts`

추가:
```
192.168.0.109 movers.local
```

### SSL 인증서 설정
1. 제어판 → 보안 → 인증서
2. Let's Encrypt 인증서 생성
3. Web Station에서 HTTPS 활성화

## 📌 요약

**가상 호스트 사용: ✅ 가능**

방법:
1. DSM Web Station에서 가상 호스트 생성
2. 역방향 프록시로 7007 → 7008 포워딩
3. PM2로 Node.js 앱 관리
4. 정적 파일은 nginx가 직접 서빙

이 방법이 가장 안정적이고 DSM과 잘 통합됩니다!