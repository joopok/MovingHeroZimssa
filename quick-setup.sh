#!/bin/bash
# Quick Setup Script for Synology NAS - Fix 403 Error
# This script automatically sets up Nginx reverse proxy for dabang-movers-app

set -e

echo "========================================="
echo "🚀 Quick Setup for dabang-movers-app"
echo "   Fixing 403 error on Synology NAS"
echo "========================================="

# Configuration
JENKINS_CONTAINER="jenkins"
APP_PORT="7008"
PROXY_PORT="80"
NAS_IP="192.168.0.109"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root (use: sudo ./quick-setup.sh)"
    exit 1
fi

echo ""
echo "📋 Step 1: Checking Docker status..."
if ! docker version > /dev/null 2>&1; then
    print_error "Docker is not running or not installed"
    exit 1
fi
print_status "Docker is running"

echo ""
echo "📋 Step 2: Creating Docker network..."
docker network create app-network 2>/dev/null || print_warning "Network already exists"

echo ""
echo "📋 Step 3: Connecting Jenkins to network..."
docker network connect app-network ${JENKINS_CONTAINER} 2>/dev/null || print_warning "Already connected"

echo ""
echo "📋 Step 4: Creating Nginx configuration..."
cat > /tmp/nginx-proxy.conf <<'EOF'
upstream app_server {
    server jenkins:7008;
}

server {
    listen 80;
    server_name _;
    
    # Main application
    location / {
        proxy_pass http://app_server;
        proxy_http_version 1.1;
        
        # Headers for WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Real IP forwarding
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $server_name;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Disable buffering for real-time
        proxy_buffering off;
        proxy_request_buffering off;
    }
    
    # Next.js specific paths
    location /_next {
        proxy_pass http://app_server/_next;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Cache static assets
        proxy_cache_valid 200 60m;
        proxy_cache_valid 404 1m;
    }
    
    # API routes
    location /api {
        proxy_pass http://app_server/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health check endpoint
    location /nginx-health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF
print_status "Nginx configuration created"

echo ""
echo "📋 Step 5: Stopping existing proxy containers..."
docker stop nginx-proxy 2>/dev/null || true
docker rm nginx-proxy 2>/dev/null || true

echo ""
echo "📋 Step 6: Starting Nginx proxy container..."
docker run -d \
    --name nginx-proxy \
    --network app-network \
    -p ${PROXY_PORT}:80 \
    -v /tmp/nginx-proxy.conf:/etc/nginx/conf.d/default.conf:ro \
    --restart unless-stopped \
    nginx:alpine

# Wait for container to start
echo ""
echo "⏳ Waiting for Nginx to start..."
sleep 3

echo ""
echo "📋 Step 7: Testing configuration..."

# Check if Nginx is running
if docker ps | grep -q nginx-proxy; then
    print_status "Nginx proxy is running"
else
    print_error "Nginx proxy failed to start"
    echo "Checking logs..."
    docker logs nginx-proxy
    exit 1
fi

# Test internal connectivity
echo ""
echo "Testing internal connectivity..."
if docker exec nginx-proxy wget -q -O- http://${JENKINS_CONTAINER}:${APP_PORT} > /dev/null 2>&1; then
    print_status "Internal connection successful"
else
    print_warning "Internal connection failed - Jenkins might be restarting"
fi

# Test proxy endpoint
echo ""
echo "Testing proxy endpoint..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost/nginx-health | grep -q "200"; then
    print_status "Nginx proxy is working"
else
    print_error "Nginx proxy test failed"
fi

echo ""
echo "========================================="
echo "✅ Setup Complete!"
echo "========================================="
echo ""
echo "📍 Access your app at:"
echo "   Internal: http://localhost/"
echo "   External: http://${NAS_IP}/"
echo ""
echo "🔍 Useful commands:"
echo "   View logs:    docker logs nginx-proxy"
echo "   Restart:      docker restart nginx-proxy"
echo "   Stop:         docker stop nginx-proxy"
echo "   Status:       docker ps | grep nginx"
echo ""
echo "💡 If you still see 403 error:"
echo "   1. Wait 30 seconds for Jenkins to fully start"
echo "   2. Try: docker restart ${JENKINS_CONTAINER}"
echo "   3. Check Jenkins build status in web UI"
echo ""
echo "========================================="

# Optional: Test the actual app
echo ""
read -p "Do you want to test the app now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Testing app at http://localhost/ ..."
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/)
    if [ "$response" = "200" ]; then
        print_status "App is responding correctly! (HTTP $response)"
    elif [ "$response" = "403" ]; then
        print_error "Still getting 403 error"
        echo "Try rebuilding in Jenkins: http://${NAS_IP}:8081"
    else
        print_warning "Got HTTP $response - app might be starting"
    fi
fi

echo ""
echo "✅ Setup script completed successfully!"