// Enhanced Next.js server for NAS deployment with CSS fix
const { createServer } = require('http')
const { parse } = require('url')
const path = require('path')
const fs = require('fs')
const next = require('next')

const dev = false  // Force production mode
const hostname = '0.0.0.0'
const port = process.env.PORT || 7008

console.log(`🚀 Starting NAS server in production mode on ${hostname}:${port}`)

// Verify build directory exists
const buildDir = path.join(__dirname, '.next')
const cssDir = path.join(buildDir, 'static', 'css')

console.log(`📁 Build directory: ${buildDir}`)
console.log(`🎨 CSS directory: ${cssDir}`)

// Check if CSS files exist
if (fs.existsSync(cssDir)) {
  const cssFiles = fs.readdirSync(cssDir)
  console.log(`✅ Found CSS files:`, cssFiles)
} else {
  console.error('❌ CSS directory not found! Run npm run build first.')
  process.exit(1)
}

const app = next({ 
  dev,
  dir: __dirname,
  conf: {
    distDir: '.next',
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
  }
})

const handle = app.getRequestHandler()

// MIME type mapping for CSS files
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.map': 'application/json',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

// Static file handler with proper headers
function serveStaticFile(req, res, filePath) {
  const ext = path.extname(filePath)
  const mimeType = mimeTypes[ext] || 'application/octet-stream'
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Static file not found: ${filePath}`)
    return false
  }

  try {
    const stat = fs.statSync(filePath)
    const fileContent = fs.readFileSync(filePath)
    
    // Set proper headers
    res.setHeader('Content-Type', mimeType)
    res.setHeader('Content-Length', stat.size)
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    res.setHeader('ETag', `"${stat.mtime.getTime()}-${stat.size}"`)
    
    // Handle conditional requests
    const ifNoneMatch = req.headers['if-none-match']
    const etag = res.getHeader('ETag')
    if (ifNoneMatch === etag) {
      res.statusCode = 304
      res.end()
      return true
    }
    
    res.statusCode = 200
    res.end(fileContent)
    console.log(`✅ Served static file: ${req.url} (${mimeType})`)
    return true
  } catch (error) {
    console.error(`❌ Error serving static file ${filePath}:`, error)
    return false
  }
}

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const startTime = Date.now()
      
      // Enhanced logging with timing
      console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.url}`)
      
      // Add CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      
      // Handle OPTIONS requests
      if (req.method === 'OPTIONS') {
        res.statusCode = 200
        res.end()
        return
      }
      
      // Enhanced static file serving for Next.js assets
      if (req.url.startsWith('/_next/static/')) {
        const staticPath = path.join(__dirname, '.next', 'static', req.url.replace('/_next/static/', ''))
        
        if (serveStaticFile(req, res, staticPath)) {
          const duration = Date.now() - startTime
          console.log(`⚡ Static file served in ${duration}ms`)
          return
        }
      }
      
      // Special handling for CSS files
      if (req.url.startsWith('/_next/static/css/')) {
        const cssFileName = req.url.replace('/_next/static/css/', '')
        const cssPath = path.join(cssDir, cssFileName)
        
        console.log(`🎨 CSS request: ${req.url}`)
        console.log(`🔍 Looking for: ${cssPath}`)
        
        if (serveStaticFile(req, res, cssPath)) {
          const duration = Date.now() - startTime
          console.log(`✅ CSS file served in ${duration}ms`)
          return
        } else {
          // List available CSS files for debugging
          try {
            const availableFiles = fs.readdirSync(cssDir)
            console.log(`❌ CSS file not found. Available files:`, availableFiles)
          } catch (err) {
            console.log(`❌ Could not read CSS directory`)
          }
        }
      }
      
      // Health check endpoint
      if (req.url === '/health') {
        res.setHeader('Content-Type', 'application/json')
        const cssExists = fs.existsSync(cssDir) && fs.readdirSync(cssDir).length > 0
        const health = {
          status: 'ok',
          timestamp: new Date().toISOString(),
          css: {
            directory: cssExists,
            files: cssExists ? fs.readdirSync(cssDir) : []
          },
          build: {
            directory: fs.existsSync(buildDir)
          }
        }
        res.statusCode = 200
        res.end(JSON.stringify(health, null, 2))
        return
      }
      
      // Default Next.js handler
      try {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl).then(() => {
          const duration = Date.now() - startTime
          console.log(`📤 Request completed in ${duration}ms`)
        })
      } catch (error) {
        console.error('❌ Request handling error:', error)
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    })
    .listen(port, hostname, (err) => {
      if (err) throw err
      console.log(`✅ Server ready on http://${hostname}:${port}`)
      console.log(`🌐 Also accessible at http://192.168.0.109:${port}`)
      console.log(`🏥 Health check at http://192.168.0.109:${port}/health`)
      
      // Log initial CSS status
      if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir)
        console.log(`🎨 CSS files ready:`, cssFiles)
      }
    })
  })
  .catch((err) => {
    console.error('❌ Failed to start server:', err)
    process.exit(1)
  })

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Gracefully shutting down server...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Server terminated')
  process.exit(0)
})