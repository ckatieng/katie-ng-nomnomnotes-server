const knex = require("knex")(require("../knexfile"));

// Get Google Api Key
const getGoogleApiKey = (req, res) => {
    const googleApiKey = process.env.GOOGLE_API_KEY;
    if (!googleApiKey) {
        return res.status(500).json({ error: 'Google API key not found' });
    }
    res.json({ apiKey: googleApiKey });
}

module.exports = {
    getGoogleApiKey
};