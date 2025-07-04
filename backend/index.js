const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.json('The Backend is Active');
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});



const tables = ['countries', 'famous_places', 'major_companies', 'reviews'];

// GET all data routes
for (const table of tables) {
    app.get(`/${table}`, async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM ${table}`);
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ Error: err.message });
        }
    });
}

// POST: Countries
app.post('/countries', async (req, res) => {
    const { country_id, name, population, capital, flag_url } = req.body;
    try {
        await pool.query(
            'INSERT INTO countries (country_id, name, population, capital, flag_url) VALUES ($1, $2, $3, $4, $5)',
            [country_id, name, population, capital, flag_url]
        );
        res.status(201).json({ message: 'Country added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Famous Places
app.post('/famous_places', async (req, res) => {
    const { place_id, country_id, name, description } = req.body;
    try {
        await pool.query(
            'INSERT INTO famous_places (place_id, country_id, name, description) VALUES ($1, $2, $3, $4)',
            [place_id, country_id, name, description]
        );
        res.status(201).json({ message: 'Famous place added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Major Companies
app.post('/major_companies', async (req, res) => {
    const { company_id, country_id, name, industry } = req.body;
    try {
        await pool.query(
            'INSERT INTO major_companies (company_id, country_id, name, industry) VALUES ($1, $2, $3, $4)',
            [company_id, country_id, name, industry]
        );
        res.status(201).json({ message: 'Company added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Reviews
app.post('/reviews', async (req, res) => {
    const { review_id, country_id, user_name, rating, review_text } = req.body;
    try {
        await pool.query(
            'INSERT INTO reviews (review_id, country_id, user_name, rating, review_text) VALUES ($1, $2, $3, $4, $5)',
            [review_id, country_id, user_name, rating, review_text]
        );
        res.status(201).json({ message: 'Review added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Connected Successfully on PORT ${PORT}`);
});