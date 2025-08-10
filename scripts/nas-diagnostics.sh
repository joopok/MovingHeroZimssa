#!/bin/bash
# Diagnostic Script for NAS 403 Error
# This script helps identify the root cause of 403 errors

echo "========================================="
echo "🔍 NAS Diagnostics for dabang-movers-app"
echo "   Identifying 403 error causes"
echo "========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Status functions
check_pass() { echo -e "${GREEN}✅ $1${NC}"; }
check_fail() { echo -e "${RED}❌ $1${NC}"; }
check_warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
check_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

echo ""
echo "📋 System Information:"
echo "------------------------"
check_info "Date: $(date)"
check_info "User: $(whoami)"
check_info "Hostname: $(hostname)"

echo ""
echo "📋 Docker Status:"
echo "------------------------"
if docker version > /dev/null 2>&1; then
    check_pass "Docker is running"
    check_info "Docker version: $(docker version --format '{{.Server.Version}}')"
else
    check_fail "Docker is not accessible"
    echo "Try: sudo $0"
    exit 1
fi

echo ""
echo "📋 Container Status:"
echo "------------------------"
# Check Jenkins container
if docker ps | grep -q jenkins; then
    check_pass "Jenkins container is running"
    jenkins_id=$(docker ps | grep jenkins | awk '{print $1}')
    check_info "Jenkins container ID: $jenkins_id"
    
    # Check Jenkins port mapping
    ports=$(docker port jenkins 2>/dev/null)
    if [ ! -z "$ports" ]; then
        check_info "Jenkins ports: $ports"
    fi
else
    check_fail "Jenkins container is not running"
    echo "Start with: docker start jenkins"
fi

# Check nginx-proxy container
if docker ps | grep -q nginx-proxy; then
    check_pass "Nginx proxy is running"
else
    check_warn "Nginx proxy is not running (this might be the issue)"
    echo "Fix with: sudo ./quick-setup.sh"
fi

echo ""
echo "📋 Network Configuration:"
echo "------------------------"
# Check Docker networks
if docker network ls | grep -q app-network; then
    check_pass "app-network exists"
    
    # Check if Jenkins is connected
    if docker inspect jenkins 2>/dev/null | grep -q app-network; then
        check_pass "Jenkins is connected to app-network"
    else
        check_warn "Jenkins not connected to app-network"
        echo "Fix with: docker network connect app-network jenkins"
    fi
else
    check_warn "app-network doesn't exist"
    echo "Fix with: docker network create app-network"
fi

echo ""
echo "📋 Port Availability:"
echo "------------------------"
# Check port 80
if netstat -tln 2>/dev/null | grep -q ":80 "; then
    check_pass "Port 80 is listening"
    check_info "Process: $(lsof -i :80 2>/dev/null | grep LISTEN | head -1)"
else
    check_warn "Port 80 is not listening"
fi

# Check port 7008
if netstat -tln 2>/dev/null | grep -q ":7008 "; then
    check_pass "Port 7008 is listening"
else
    check_warn "Port 7008 is not listening (app might not be running)"
fi

# Check port 8081 (Jenkins UI)
if netstat -tln 2>/dev/null | grep -q ":8081 "; then
    check_pass "Port 8081 (Jenkins) is listening"
else
    check_warn "Port 8081 is not listening"
fi

echo ""
echo "📋 Application Status:"
echo "------------------------"
# Check if app is built
workspace="/volume1/@docker/volumes/jenkins_home/_data/workspace/dabang-movers-app2"
if [ -d "$workspace" ]; then
    check_pass "Workspace exists"
    
    if [ -d "$workspace/.next" ]; then
        check_pass "Next.js build exists"
    else
        check_fail ".next directory not found (app not built)"
        echo "Build in Jenkins: http://192.168.0.109:8081"
    fi
    
    if [ -f "$workspace/server.pid" ]; then
        pid=$(cat "$workspace/server.pid" 2>/dev/null)
        check_info "Server PID file: $pid"
        
        # Check if process exists in container
        if docker exec jenkins ps aux 2>/dev/null | grep -q "node.*server"; then
            check_pass "Node server is running in container"
        else
            check_warn "Node server not found in container"
        fi
    else
        check_warn "No server.pid file"
    fi
else
    check_fail "Workspace not found at expected location"
    # Try alternate location
    alt_workspace="/volume1/docker/jenkins/jenkins_home/workspace/dabang-movers-app2"
    if [ -d "$alt_workspace" ]; then
        check_info "Found workspace at: $alt_workspace"
    fi
fi

echo ""
echo "📋 Connection Tests:"
echo "------------------------"
# Test localhost
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null)
if [ "$response" = "200" ]; then
    check_pass "http://localhost/ - OK (200)"
elif [ "$response" = "403" ]; then
    check_fail "http://localhost/ - Forbidden (403)"
elif [ "$response" = "502" ]; then
    check_warn "http://localhost/ - Bad Gateway (502) - App not running"
else
    check_warn "http://localhost/ - Response: $response"
fi

# Test port 7008 directly
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:7008/ 2>/dev/null)
if [ "$response" = "200" ]; then
    check_pass "http://localhost:7008/ - OK (200)"
elif [ "$response" = "403" ]; then
    check_fail "http://localhost:7008/ - Forbidden (403)"
else
    check_warn "http://localhost:7008/ - Response: $response"
fi

# Test Jenkins
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081/ 2>/dev/null)
if [ "$response" = "200" ] || [ "$response" = "403" ]; then
    check_pass "Jenkins UI is accessible"
else
    check_warn "Jenkins UI - Response: $response"
fi

echo ""
echo "📋 Log Analysis:"
echo "------------------------"
# Check server logs if available
if [ -f "$workspace/server.log" ]; then
    check_info "Last 5 lines of server.log:"
    tail -5 "$workspace/server.log" 2>/dev/null | sed 's/^/    /'
else
    check_warn "No server.log found"
fi

# Check nginx logs if running
if docker ps | grep -q nginx-proxy; then
    echo ""
    check_info "Last 5 lines of nginx-proxy logs:"
    docker logs --tail 5 nginx-proxy 2>&1 | sed 's/^/    /'
fi

echo ""
echo "========================================="
echo "📊 Diagnosis Summary:"
echo "========================================="

# Determine likely issue
issue_found=false

if ! docker ps | grep -q nginx-proxy; then
    check_fail "ISSUE: Nginx proxy not running"
    echo "   SOLUTION: Run ./quick-setup.sh"
    issue_found=true
fi

if ! docker ps | grep -q jenkins; then
    check_fail "ISSUE: Jenkins not running"
    echo "   SOLUTION: docker start jenkins"
    issue_found=true
fi

if [ "$response" = "403" ]; then
    check_fail "ISSUE: Still getting 403 error"
    echo "   SOLUTION: "
    echo "   1. Rebuild in Jenkins"
    echo "   2. Check Next.js configuration"
    echo "   3. Review security headers"
    issue_found=true
fi

if [ "$issue_found" = false ]; then
    check_pass "No obvious issues found"
    echo "   Try accessing: http://192.168.0.109/"
fi

echo ""
echo "💡 Quick Fixes:"
echo "------------------------"
echo "1. Run setup script:     sudo ./quick-setup.sh"
echo "2. Restart Jenkins:      docker restart jenkins"
echo "3. View nginx logs:      docker logs nginx-proxy"
echo "4. Rebuild app:          Visit http://192.168.0.109:8081"
echo ""
echo "========================================="