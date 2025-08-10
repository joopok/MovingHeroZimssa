#!/bin/sh

# Nginx Entrypoint Script for Better Debugging
set -e

echo "==================================="
echo "🚀 Starting Nginx Reverse Proxy"
echo "==================================="
echo "📅 Time: $(date)"
echo "🏗️  Image: nginx:alpine"
echo "🔧 Config: /etc/nginx/nginx.conf"
echo "==================================="

# Function to check if backend is available
check_backend() {
    local backend_url="$1"
    local max_attempts=30
    local attempt=1
    
    echo "🔍 Checking backend connectivity: $backend_url"
    
    while [ $attempt -le $max_attempts ]; do
        if nc -z -v -w5 $backend_url 2>/dev/null; then
            echo "✅ Backend is reachable at $backend_url"
            return 0
        fi
        echo "⏳ Attempt $attempt/$max_attempts: Backend not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "❌ Backend is not reachable after $max_attempts attempts"
    echo "🔧 This might cause 502/503 errors. Continuing anyway..."
    return 1
}

# Function to validate nginx config
validate_config() {
    echo "🔧 Validating Nginx configuration..."
    if nginx -t 2>&1; then
        echo "✅ Nginx configuration is valid"
        return 0
    else
        echo "❌ Nginx configuration has errors:"
        nginx -t
        return 1
    fi
}

# Function to show configuration summary
show_config_summary() {
    echo ""
    echo "📋 Configuration Summary:"
    echo "=========================="
    echo "📁 Config file: /etc/nginx/nginx.conf"
    echo "📁 Cache directory: /var/cache/nginx/proxy_cache"
    echo "📁 Log directory: /var/log/nginx"
    echo ""
    echo "🌐 Listening on:"
    echo "   - HTTP:  Port 80"
    echo "   - HTTPS: Port 443 (if configured)"
    echo "   - Status: Port 8080/nginx_status"
    echo ""
    echo "🔗 Backend Configuration:"
    grep -A5 "upstream.*backend" /etc/nginx/nginx.conf | head -10 || echo "   Check nginx.conf for upstream details"
    echo ""
}

# Function to monitor logs
start_log_monitoring() {
    echo "📊 Log Monitoring:"
    echo "=================="
    echo "Access logs: tail -f /var/log/nginx/access.log"
    echo "Error logs:  tail -f /var/log/nginx/error.log"
    echo ""
}

# Main execution
main() {
    # Create necessary directories
    mkdir -p /var/log/nginx /var/cache/nginx/proxy_cache
    chown -R nginx:nginx /var/log/nginx /var/cache/nginx/proxy_cache
    
    # Validate configuration
    if ! validate_config; then
        echo "❌ Configuration validation failed. Exiting..."
        exit 1
    fi
    
    # Show configuration summary
    show_config_summary
    
    # Check backend connectivity (non-blocking)
    # Extract backend info from nginx.conf
    BACKEND_HOST=$(grep -oP 'server \K[^;]+' /etc/nginx/nginx.conf | head -1)
    if [ -n "$BACKEND_HOST" ]; then
        BACKEND_IP=$(echo $BACKEND_HOST | cut -d: -f1)
        BACKEND_PORT=$(echo $BACKEND_HOST | cut -d: -f2)
        
        if [ -n "$BACKEND_IP" ] && [ -n "$BACKEND_PORT" ]; then
            check_backend "$BACKEND_IP $BACKEND_PORT" || true
        fi
    fi
    
    # Setup log monitoring info
    start_log_monitoring
    
    # Test nginx startup
    echo "🚀 Starting Nginx..."
    nginx -t && echo "✅ Configuration test passed"
    
    echo "==================================="
    echo "🎯 Nginx is ready to start!"
    echo "==================================="
    echo "📍 Health check: http://localhost/nginx-health"
    echo "📍 App proxy: http://localhost/"
    echo "📊 Status: http://localhost:8080/nginx_status"
    echo "==================================="
    
    # Execute the main command
    exec "$@"
}

# Run main function
main "$@"