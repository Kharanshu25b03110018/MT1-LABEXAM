
import express from 'express';

// Create Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sample food data
let foods = [
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

// Start Express server
app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});
