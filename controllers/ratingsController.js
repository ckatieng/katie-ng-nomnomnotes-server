const knex = require("knex")(require("../knexfile"));

// Get all ratings
const getAllRatings = (req, res) => {
    knex("ratings")
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => 
            res.status(400).send(`Error retrieving ratings: ${err}`)
        );
}

// Add a rating for a restaurant
const addRating = (req, res) => {
    const { googlePlacesId, rating } = req.body;
    const userId = req.user.id;
    
    // Check if the user has already rated this restaurant
    knex("ratings")
        .where({
            user_id: userId,
            google_places_id: googlePlacesId,
        })
        .first()
        .then((existingRating) => {
            if (existingRating) {
                // If the user has already rated this restaurant, update their rating
                return knex("ratings")
                    .where({
                        user_id: userId,
                        google_places_id: googlePlacesId,
                    })
                    .update({
                        rating: rating,
                    });
            } else {
                // If the user has not rated this restaurant before, insert a new rating
                return knex("ratings").insert({
                    user_id: userId,
                    google_places_id: googlePlacesId,
                    rating: rating,
                });
            }
        })
        .then(() => {
            res.status(201).send("Rating added successfully.");
        })
        .catch((err) => {
            res.status(500).send(`Error adding rating: ${err}`);
        });
}

// Calculate the average rating for a restaurant
const calculateAverageRating = (req, res) => {
    const googlePlacesId = req.params.googlePlacesId;

    knex("ratings")
        .where("google_places_id", googlePlacesId)
        .avg("rating as average_rating")
        .first()
        .then((averageRating) => {
            res.status(200).json(averageRating);
        })
        .catch((err) => {
            res.status(500).send(`Error calculating average rating: ${err}`);
        });
}

// Get the top-rated restaurants (Top 10)
const getTopRatedRestaurants = (req, res) => {
    knex("ratings")
        .select("google_places_id")
        .avg("rating as average_rating")
        .groupBy("google_places_id")
        .orderBy("average_rating", "desc")
        .limit(10) // Limit to the top 10 rated restaurants
        .then((topRatedRestaurants) => {
            res.status(200).json(topRatedRestaurants);
        })
        .catch((err) => {
            res.status(500).send(`Error retrieving top-rated restaurants: ${err}`);
        });
}

module.exports = {
    getAllRatings,
    addRating,
    calculateAverageRating,
    getTopRatedRestaurants,
};