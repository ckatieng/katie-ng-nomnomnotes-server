const knex = require("knex")(require("../knexfile"));

const getFavouriteItems = (req, res) => {
    const userId = req.user.id;

    knex("favourites_items")
        // Filter items by user ID
        .where({ user_id: userId }) 
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => 
            res.status(400).send(`Error retrieving must-try items: ${err}`)
        );
}

module.exports = {
    getFavouriteItems
}