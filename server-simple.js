// Simplified Next.js server for NAS deployment
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false  // Force production mode
const hostname = '0.0.0.0'
const port = process.env.PORT || 7008

console.log(`Starting server in production mode on ${hostname}:${port}`)

const app = next({ 
  dev,
  dir: __dirname,
  conf: {
    distDir: '.next'
  }
})

const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    createServer((req, res) => {
      // Log all requests
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
      
      // Simple request handling
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    })
    .listen(port, hostname, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`)
      console.log(`> Server started successfully`)
    })
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })