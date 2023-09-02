const knex = require("knex")(require("../knexfile"));

// Get all visited restaurants (history) for a specific user
const getVisitedItems = (req, res) => {
    const userId = req.user.id;

    knex("visited_items")
        // Filter items by user ID
        .where({ user_id: userId }) 
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => 
            res.status(400).send(`Error retrieving must-try items: ${err}`)
        );
}

// Delete a visited restaurant
const deleteVisitedItem = (req, res) => {
    const itemId = req.params.itemId;

    knex("visited_items")
        .where({ id: itemId })
        .del()
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => 
            res.status(400).send(`Error deleting visited restaurant: ${err}`)
        );
}

module.exports = {
    getVisitedItems,
    deleteVisitedItem,
};