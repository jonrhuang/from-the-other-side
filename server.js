import http from'node:http'

const PORT = 8000

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 200
    res.write('<html><h1>The server is working</h1></html>')
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))