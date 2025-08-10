# Synology NAS Setup Guide - Fix 403 Error

Complete guide to fix the 403 error for dabang-movers-app on Synology NAS.

## 🎯 Problem Analysis

Your Next.js app is running inside Jenkins Docker container on port 7008, but getting 403 errors when accessing externally. This happens because:

1. The Jenkins container is isolated from external network access
2. No reverse proxy is configured to expose the internal service
3. Port 7008 is not properly exposed or forwarded

## 🚀 Solution Options

We provide 3 different solutions. Choose the one that fits your setup best:

### Option 1: Docker Compose with Nginx (Recommended)
### Option 2: Standalone Nginx Container  
### Option 3: Native Nginx Installation

---

## 📋 Prerequisites

Before starting, SSH into your Synology NAS:

```bash
# SSH into your NAS
ssh admin@192.168.0.109

# Become root user
sudo -i
```

---

## 🛠️ Option 1: Docker Compose with Nginx (Recommended)

This creates a dedicated Nginx reverse proxy container that forwards requests to your Jenkins container.

### Step 1: Prepare the directory

```bash
# Navigate to your project directory
cd /volume1/@docker/volumes/jenkins_home/_data/workspace/dabang-movers-app2

# Create logs directory
mkdir -p logs/nginx

# Set permissions
chmod 755 logs/nginx
```

### Step 2: Create Docker network (if not exists)

```bash
# Create a custom Docker network for communication
docker network create dabang-network 2>/dev/null || echo "Network already exists"

# Connect your Jenkins container to this network
docker network connect dabang-network jenkins 2>/dev/null || echo "Already connected or container not found"
```

### Step 3: Update nginx-proxy.conf for your setup

```bash
# Edit the nginx configuration to point to your Jenkins container
cat > nginx-proxy.conf << 'EOF'
# Nginx Proxy Configuration for Jenkins Container
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" rt=$request_time';
                    
    access_log /var/log/nginx/access.log main;
    
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    client_max_body_size 100M;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Upstream to Jenkins container
    upstream jenkins_app {
        # Try to connect to Jenkins container on the Docker network first
        server jenkins:7008;
        # Fallback to host network if needed
        server 192.168.0.109:7008 backup;
        keepalive 32;
    }
    
    server {
        listen 80;
        server_name _;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        
        # Main proxy
        location / {
            proxy_pass http://jenkins_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            
            # Timeouts
            proxy_connect_timeout 30s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
        
        # Static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            proxy_pass http://jenkins_app;
            proxy_set_header Host $host;
            expires 30d;
            add_header Cache-Control "public, immutable";
        }
        
        # Next.js specific
        location /_next/ {
            proxy_pass http://jenkins_app;
            proxy_set_header Host $host;
            expires 1d;
        }
        
        # API routes
        location /api/ {
            proxy_pass http://jenkins_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        
        # Health check
        location /nginx-health {
            access_log off;
            return 200 "nginx healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
EOF
```

### Step 4: Create simplified Docker Compose

```bash
# Create Docker Compose file for just the Nginx proxy
cat > docker-compose.proxy.yml << 'EOF'
version: '3.8'

services:
  nginx-proxy:
    image: nginx:alpine
    container_name: dabang-nginx-proxy
    ports:
      - "80:80"
    volumes:
      - ./nginx-proxy.conf:/etc/nginx/nginx.conf:ro
      - ./logs/nginx:/var/log/nginx
    networks:
      - dabang-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "nginx", "-t"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  dabang-network:
    external: true
EOF
```

### Step 5: Start the Nginx proxy

```bash
# Stop any existing nginx containers
docker stop dabang-nginx-proxy 2>/dev/null || true
docker rm dabang-nginx-proxy 2>/dev/null || true

# Start the proxy
docker-compose -f docker-compose.proxy.yml up -d

# Check if it's running
docker ps | grep nginx

# Check logs
docker logs dabang-nginx-proxy
```

### Step 6: Test the setup

```bash
# Test locally on the NAS
curl -I http://localhost/nginx-health
curl -I http://localhost/

# Check if the app is accessible
curl -s http://localhost/ | head -20
```

---

## 🛠️ Option 2: Standalone Nginx Container (Alternative)

If Docker Compose is not available or you prefer a single container:

### Step 1: Build and run standalone container

```bash
# Navigate to project directory
cd /volume1/@docker/volumes/jenkins_home/_data/workspace/dabang-movers-app2

# Build the nginx container
docker build -f Dockerfile.nginx -t dabang-nginx-proxy .

# Run the container
docker run -d \
  --name dabang-nginx-proxy \
  --network dabang-network \
  -p 80:80 \
  --restart unless-stopped \
  dabang-nginx-proxy

# Check status
docker ps | grep nginx
docker logs dabang-nginx-proxy
```

---

## 🛠️ Option 3: Native Nginx Installation (Advanced)

If you prefer to install Nginx directly on the NAS:

### Step 1: Install Nginx

```bash
# Update package manager
/usr/syno/bin/synopkg install Docker  # Ensure Docker is installed first

# Install Nginx via Docker (easier on Synology)
# OR use ipkg/opkg if available:
# ipkg update && ipkg install nginx
```

### Step 2: Configure Nginx

```bash
# Copy our configuration
cp nginx.conf /etc/nginx/nginx.conf

# Test configuration
nginx -t

# Start Nginx
nginx -s reload
systemctl enable nginx
systemctl start nginx
```

---

## 🔧 Troubleshooting Guide

### Check if your app is running in Jenkins

```bash
# Check Jenkins container
docker ps | grep jenkins

# Check processes in Jenkins container
docker exec -it jenkins ps aux | grep node

# Check if port 7008 is open in Jenkins container
docker exec -it jenkins netstat -tlnp | grep 7008

# Check app logs in Jenkins
docker exec -it jenkins cat /var/jenkins_home/workspace/dabang-movers-app2/server.log
```

### Check network connectivity

```bash
# Test connection to Jenkins container from NAS host
curl -I http://192.168.0.109:7008

# Test DNS resolution
nslookup 192.168.0.109

# Check Docker networks
docker network ls
docker network inspect dabang-network
```

### Check Nginx proxy status

```bash
# Check Nginx container
docker logs dabang-nginx-proxy

# Check Nginx status
curl -I http://localhost/nginx-health

# Check proxy configuration
docker exec dabang-nginx-proxy nginx -t

# Monitor real-time logs
docker logs -f dabang-nginx-proxy
```

### Common issues and fixes

#### 1. 502 Bad Gateway
```bash
# Check if Jenkins container is running
docker restart jenkins

# Ensure both containers are on same network
docker network connect dabang-network jenkins
docker network connect dabang-network dabang-nginx-proxy
```

#### 2. Connection refused
```bash
# Check if port 7008 is actually open
docker exec jenkins netstat -tlnp | grep 7008

# Restart your Next.js app in Jenkins
docker exec jenkins pkill -f "node.*server"
# Then trigger Jenkins build again
```

#### 3. Nginx won't start
```bash
# Check configuration
docker exec dabang-nginx-proxy nginx -t

# Check if port 80 is available
netstat -tlnp | grep :80

# Stop conflicting services
docker stop $(docker ps -q --filter "expose=80")
```

---

## 🎯 Final Verification

After setting up any option, test with these commands:

### From NAS (SSH):
```bash
# Test Nginx health
curl -I http://localhost/nginx-health

# Test app proxy
curl -I http://localhost/

# Test from external network
curl -I http://192.168.0.109/
```

### From your computer:
```bash
# Open browser and visit:
# http://192.168.0.109

# Or test with curl:
curl -I http://192.168.0.109/
```

### Expected response:
```
HTTP/1.1 200 OK
Server: nginx
Content-Type: text/html; charset=utf-8
...
```

---

## 🔄 Maintenance Commands

### Restart services:
```bash
# Restart Nginx proxy
docker restart dabang-nginx-proxy

# Restart Jenkins (if needed)
docker restart jenkins

# View all logs
docker logs dabang-nginx-proxy
```

### Update configuration:
```bash
# Edit nginx config
nano nginx-proxy.conf

# Reload Nginx without stopping
docker exec dabang-nginx-proxy nginx -s reload
```

### Monitor performance:
```bash
# Real-time logs
docker logs -f dabang-nginx-proxy

# Check resource usage
docker stats dabang-nginx-proxy
```

---

## ✅ Success Checklist

- [ ] SSH access to NAS working
- [ ] Jenkins container running on port 7008
- [ ] Docker network created and connected
- [ ] Nginx proxy container running
- [ ] Port 80 accessible externally
- [ ] App loading at http://192.168.0.109
- [ ] No 403 errors
- [ ] Static assets loading correctly

---

## 📞 Need Help?

If you encounter issues:

1. Check the troubleshooting section above
2. Run the diagnostic commands
3. Check logs: `docker logs dabang-nginx-proxy`
4. Verify network connectivity between containers
5. Ensure Jenkins app is actually running on port 7008

The most likely solution is **Option 1** with Docker Compose, as it's the most straightforward and handles networking automatically.