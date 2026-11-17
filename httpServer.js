
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

    // Route 1: Home
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Online Food Ordering Application!</h1>');
    }

    // Route 2: GET available foods
    else if (req.method === 'GET' && req.url === '/foods') {

        const availableFoods = foods.filter(
            food => food.availability === true
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(availableFoods));
    }

    // Route 3: About
    else if (req.method === 'GET' && req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About Us</h1><p>We provide online food ordering services.</p>');
    }

    // Route 4: Static menu using FS module
    else if (req.method === 'GET' && req.url === '/menu') {

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

    // Route 5: POST new food
    else if (req.method === 'POST' && req.url === '/add-food') {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {

            try {
                const newFood = JSON.parse(body);

                const requiredFields = [
                    'id',
                    'foodName',
                    'category',
                    'price',
                    'availability'
                ];

                const missingFields = requiredFields.filter(
                    field => !Object.hasOwn(newFood, field)
                );

                if (missingFields.length > 0) {
                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify({
                        message: 'Missing required fields',
                        missingFields
                    }));
                    return;
                }

                // Validate data types
                if (
                    typeof newFood.id !== 'number' ||
                    typeof newFood.foodName !== 'string' ||
                    typeof newFood.category !== 'string' ||
                    typeof newFood.price !== 'number' ||
                    typeof newFood.availability !== 'boolean'
                ) {
                    res.writeHead(400, {
                        'Content-Type': 'application/json'
                    });

                    res.end(JSON.stringify({
                        message: 'Invalid food data types'
                    }));
                    return;
                }

                // Add food to array
                foods.push(newFood);

                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Food item added successfully',
                    food: newFood
                }));

            } catch (error) {

                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: 'Invalid JSON format'
                }));
            }
        });
    }

    // Invalid route
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }

});

// Start server
server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});


