const axios = require("axios");
const knex = require("knex")(require("../knexfile"));

// Get Restaurant Name
const getRestaurantName = (req, res) => {
    const placeId = req.params.placeId;
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const placesApiURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleApiKey}`;

        axios.get(placesApiURL)
            .then((response) => {
                const restaurantName = response.data.result.name;
                console.log(response.data.result.name);
                
                // Send the restaurant name back to the frontend
                res.json({ name: restaurantName });
            })
            .catch((err) => {
                console.error(`Error fetching restaurant name: ${err}`);
                res.status(500).send(`Error fetching restaurant name: ${err}`);
            });
}
    
module.exports = {
    getRestaurantName
};