const axios = require("axios");
const knex = require("knex")(require("../knexfile"));

// Get Google Api Key
const getGoogleApiKey = (req, res) => {
    const googleApiKey = process.env.GOOGLE_API_KEY;
    if (!googleApiKey) {
        return res.status(500).json({ error: 'Google API key not found' });
    }
    res.json({ apiKey: googleApiKey });
}

// Get Location Details
const getLocationDetails = (req, res) => {
    const placeId = req.params.placeId;
    const googleApiKey = process.env.GOOGLE_API_KEY;
    const placesApiURL = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${googleApiKey}`;

    axios.get(placesApiURL)
        .then((response) => {
            if (response.data.status === 'OK' && response.data.results.length > 0) {
                const locationData = response.data.results[0].geometry.location;
                const details = {
                    latitude: locationData.lat,
                    longitude: locationData.lng,
                };
                // Send the location details back to the frontend
                res.json(details);
            } else {
                res.status(500).json({ error: 'Location details not found' });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: `Error fetching location details: ${err.message}` });
        });
};

module.exports = {
    getGoogleApiKey,
    getLocationDetails,
};