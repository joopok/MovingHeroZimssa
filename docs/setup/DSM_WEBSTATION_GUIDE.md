# DSM Web Station 설정 가이드 - 포트 7007 사용

## 📋 DSM 웹 인터페이스에서 설정하기

### 1. DSM 로그인
- 브라우저에서 `http://192.168.0.109:5000` 접속
- 관리자 계정으로 로그인

### 2. Web Station 설정

#### A. 가상 호스트 생성
1. **제어판 → Web Station** 열기
2. **가상 호스트** 탭 선택
3. **생성** 버튼 클릭
4. 다음 설정 입력:
   - **포트**: HTTP - 7007
   - **문서 루트**: 선택 안함 (리버스 프록시 사용)
   - **백엔드 서버**: HTTP
   - **호스트 이름**: 192.168.0.109 또는 *
   - **포트**: 7008

#### B. 리버스 프록시 설정 (권장)
1. **제어판 → 응용 프로그램 포털 → 역방향 프록시**
2. **생성** 버튼 클릭
3. 설정 입력:

```
설명: dabang-movers-app
소스:
  - 프로토콜: HTTP
  - 호스트 이름: * (또는 192.168.0.109)
  - 포트: 7007
  
대상:
  - 프로토콜: HTTP  
  - 호스트 이름: localhost
  - 포트: 7008
```

4. **사용자 지정 헤더** 탭에서 추가:
   - WebSocket 지원 활성화 ✓
   - HTTP/2 지원 활성화 ✓

### 3. 포트 방화벽 설정

1. **제어판 → 보안 → 방화벽**
2. 규칙 편집
3. 포트 7007, 7008 허용 추가

## 📋 SSH에서 직접 설정하기

### nginx 설정 파일 위치 확인:
```bash
# Web Station nginx 설정 위치
ls -la /usr/local/etc/nginx/conf.d/
ls -la /etc/nginx/sites-enabled/
```

### 수동 설정 파일 생성:
```bash
sudo cat > /usr/local/etc/nginx/conf.d/dabang-movers.conf << 'EOF'
server {
    listen 7007;
    server_name _;
    
    location / {
        proxy_pass http://localhost:7008;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /_next {
        proxy_pass http://localhost:7008/_next;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# nginx 재시작
sudo synoservicecfg --restart nginx
# 또는
sudo nginx -s reload
```

## 📋 Jenkins 설정 변경 (포트 7007 사용)

Jenkins Execute Shell 스크립트에서 포트 변경:
```bash
PORT=7007  # 7008에서 7007로 변경
```

또는 Jenkins가 계속 7008을 사용하고, Web Station이 7007에서 7008로 프록시하도록 설정.

## 🔍 문제 해결

### 현재 설정 확인:
```bash
# Web Station 상태 확인
sudo synoservice --status pkgctl-WebStation

# nginx 설정 테스트
sudo nginx -t

# 포트 사용 확인
sudo netstat -tlnp | grep -E "7007|7008"

# Web Station 로그 확인
tail -f /var/log/nginx/error.log
```

### 서비스 재시작:
```bash
# Web Station 재시작
sudo synoservice --restart pkgctl-WebStation

# nginx만 재시작
sudo synoservicecfg --restart nginx
```

## ✅ 예상 결과

설정 완료 후:
- `http://192.168.0.109:7007` → Jenkins 앱 (프록시됨)
- `http://192.168.0.109:7008` → Jenkins 앱 (직접)
- `http://192.168.0.109:8081` → Jenkins 관리 UI

## 💡 추가 팁

1. **DSM 7.0 이상**: Web Station이 nginx 기반으로 변경됨
2. **DSM 6.x**: Apache 기반이므로 설정이 다를 수 있음
3. **Docker와 충돌**: Web Station과 Docker 컨테이너 포트가 충돌하지 않도록 주의

Web Station이 이미 설정되어 있다면, DSM 웹 인터페이스에서 리버스 프록시 규칙만 추가하면 됩니다!