const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

// API endpoint to fetch images from Pixabay
app.get('/api/images', async (req, res) => {
  const query = req.query.q || 'flower'; //search term
  const page = req.query.page || 1; // Pagination
  const perPage = req.query.per_page || 10; // Number of images per page

  const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(URL);
    const data = response.data;

    if (data.totalHits > 0) {
      res.json(data.hits); // Send the image hits back to the client
    } else {
      res.status(404).json({ message: 'No hits found' });
    }
  } catch (error) {
    console.error('Error fetching images from Pixabay:', error);
    res.status(500).json({ message: 'Error fetching images' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});