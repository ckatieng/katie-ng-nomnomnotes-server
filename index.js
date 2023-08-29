const express = require("express");
const cors = require("cors");
const app = express();

// Import routes


// Load environment variables from the .env file
require("dotenv").config();

// Fall back to 5051 if not provided
const PORT = process.env.PORT || 5051;

// Middleware
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.json());
// Serve static files from the 'public' directory
// app.use(express.static("public"));

// Routes


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});