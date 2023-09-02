const knex = require("knex")(require("../knexfile"));

// Get all favourite restaurants for a specific user
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

// Delete a favourite restaurant
const deleteFavouriteItem = (req, res) => {
    const itemId = req.params.itemId;

    knex("favourites_items")
        .where({ id: itemId })
        .del()
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => 
            res.status(400).send(`Error deleting favourite restaurant: ${err}`)
        );
}

module.exports = {
    getFavouriteItems,
    deleteFavouriteItem,
};