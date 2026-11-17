
import http from 'http';
import fs from 'fs';

// Create HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.end('Welcome to Online Food Ordering Application!');
});

// Start server on port 3000
server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});
