
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

// B2.1: GET all food items
app.get('/foods', (req, res) => {
    res.status(200).json({
        message: 'Food items retrieved successfully',
        foods: foods
    });
});

// B2.2: GET food item by ID
app.get('/foods/:id', (req, res) => {

    const foodId = Number(req.params.id);

    const food = foods.find(item => item.id === foodId);

    if (!food) {
        return res.status(404).json({
            message: 'Food item not found'
        });
    }

    res.status(200).json({
        message: 'Food item retrieved successfully',
        food: food
    });
});


// B3: POST - Add a new food item
app.post('/foods', (req, res) => {

    const { id, foodName, category, price, availability } = req.body;

    // Check required fields
    if (
        id === undefined ||
        !foodName ||
        !category ||
        price === undefined ||
        availability === undefined
    ) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    // Validate price
    if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
        return res.status(400).json({
            message: 'Price must be a positive number'
        });
    }

    // Create new food object
    const newFood = {
        id,
        foodName,
        category,
        price,
        availability
    };

    // Add food to array
    foods.push(newFood);

    // Send success response
    res.status(201).json({
        message: 'Food item added successfully',
        food: newFood
    });

});


app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});
