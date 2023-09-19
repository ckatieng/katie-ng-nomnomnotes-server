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
                
                // Send the restaurant name back to the frontend
                res.json({ name: restaurantName });
            })
            .catch((err) => {
                console.error(`Error fetching restaurant name: ${err}`);
                res.status(500).json({ error: `Error fetching restaurant name: ${err.message}` });
            });
}

// Get Restaurant Details
const getRestaurantDetails= (req, res) => {
    const placeId = req.params.placeId;
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const placesApiURL = `https://maps.googleapis.com/maps/api/place/details/json?fields=price_level,name,rating,formatted_address,formatted_phone_number,opening_hours,website,photos,reviews&place_id=${placeId}&key=${googleApiKey}`;
        
    axios.get(placesApiURL)
        .then((response) => {
            const restaurantData = response.data.result;

            // Transform and enrich the photos data with photo URLs
            const photos = restaurantData.photos.map((photo) => {
                return {
                    ...photo,
                    photo_url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${googleApiKey}`
                };
            });

            // Extract restaurant details
            const details = {
                name: restaurantData.name,
                rating: restaurantData.rating,
                priceLevel: restaurantData.price_level,
                address: restaurantData.formatted_address,
                phone: restaurantData.formatted_phone_number,
                hours: restaurantData.opening_hours.weekday_text,
                website: restaurantData.website,
                photos: photos,
                reviews: restaurantData.reviews,
            };
            
            // Send the restaurant details back to the frontend
            res.json(details);
        })
        .catch((err) => {
            console.error(`Error fetching restaurant details: ${err}`);
            res.status(500).send(`Error fetching restaurant details: ${err}`);
        });
}
    
module.exports = {
    getRestaurantName,
    getRestaurantDetails,
};