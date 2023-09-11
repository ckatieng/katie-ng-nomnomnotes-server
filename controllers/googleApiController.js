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
                const locationData = response.data.results[0];
                const details = {
                    formattedAddress: locationData.formatted_address,
                    latitude: locationData.geometry.location.lat,
                    longitude: locationData.geometry.location.lng,
                };

                // Extract country and province (state) long names from address_components
                locationData.address_components.forEach((component) => {
                    if (component.types.includes('country')) {
                        details.country = component.short_name;
                    } else if (component.types.includes('administrative_area_level_1')) {
                        details.province = component.long_name;
                    }
                });

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

// Set New Location
const setLocation = (req, res) => {
    const userId = req.user.id;
    const { latitude, longitude, placeId, formattedAddress, province, country } = req.body;

    // Create a location object with the new data
    const newLocation = {
        place_id: placeId,
        formatted_address: formattedAddress,
        latitude: latitude,
        longitude: longitude,
        province: province,
        country: country
    };

    console.log(newLocation);

    // Update the user's location in the database
    knex('users')
        .where({ id: userId })
        // Store the location object as a JSON string
        .update({ location: JSON.stringify(newLocation) }) 
        .then(() => {
            res.status(200).json({ message: 'Location updated successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error updating location' });
        });
}

module.exports = {
    getGoogleApiKey,
    getLocationDetails,
    setLocation,
};