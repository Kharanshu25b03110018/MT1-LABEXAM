
import http from 'http';
import fs from 'fs';

// Sample food data
const foods = [
    {
        id: 1,
        foodName: 'Pizza',
        category: 'Fast Food',
        price: 250,
        availability: true
    },
    {
        id: 2,
        foodName: 'Burger',
        category: 'Fast Food',
        price: 120,
        availability: true
    },
    {
        id: 3,
        foodName: 'Pasta',
        category: 'Italian',
        price: 180,
        availability: false
    }
];

// Create HTTP server
const server = http.createServer((req, res) => {

    // Route 1: Home page
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end('<h1>Welcome to Online Food Ordering Application!</h1>');
    }

    // Route 2: Display available foods
    else if (req.url === '/foods') {
        const availableFoods = foods.filter(
            food => food.availability === true
        );

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(availableFoods));
    }

    // Route 3: About page
    else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end('<h1>About Us</h1><p>We provide online food ordering services.</p>');
    }

    // Route 4: Serve static menu file
    else if (req.url === '/menu') {
        fs.readFile('./public/menu.html', 'utf8', (err, data) => {

            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.end('Unable to load menu file');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.end(data);
        });
    }

    // Invalid route
    else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('404 - Page Not Found');
    }

});

// Start server
server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});

