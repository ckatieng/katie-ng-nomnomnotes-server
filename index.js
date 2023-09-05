const express = require("express");
const cors = require("cors");
const app = express();

const simulateLoggedInUser = require("./middleware/simulateLoggedInUser");

// Import routes
const usersRoutes = require("./routes/users");
const mustTryRoutes = require("./routes/musttry");
const favouritesRoutes = require("./routes/favourites");
const visitedRoutes = require("./routes/visited");
const ratingsRoutes = require("./routes/ratings");
const googleApiRoutes = require("./routes/googleApi");

// Load environment variables from the .env file
require("dotenv").config();

// Fall back to 5051 if not provided
const PORT = process.env.PORT || 5051;

// Middleware
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.json());
// Serve static files from the 'public' directory
// app.use(express.static("public"));

app.use(simulateLoggedInUser);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/must-try", mustTryRoutes);
app.use("/api/favourites", favouritesRoutes);
app.use("/api/visited", visitedRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/google-api-key", googleApiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});