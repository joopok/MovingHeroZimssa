// Custom Next.js server for production
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'  // 모든 IP에서 접속 허용
const port = process.env.PORT || 7008

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // 디버그 로깅 추가
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Headers:`, req.headers)
      
      // CORS 헤더 추가
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      
      // OPTIONS 요청 처리
      if (req.method === 'OPTIONS') {
        res.statusCode = 200
        res.end()
        return
      }
      
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
  .once('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  .listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> Also accessible at http://192.168.0.109:${port}`)
  })
})