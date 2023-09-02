const knex = require("knex")(require("../knexfile"));

// Get all must-try restaurants for a specific user
const getMustTryItems = (req, res) => {
    const userId = req.user.id;

    knex("musttry_items")
        // Filter items by user ID
        .where({ user_id: userId }) 
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => 
            res.status(400).send(`Error retrieving must-try items: ${err}`)
        );
}

// Add a must-try restaurant 
const addMustTryItem = (req, res) => {
    const { google_places_id } = req.body; // Assuming the frontend sends this data
    const userId = req.user.id;

    // Insert a new record into the musttry_items table
    knex("musttry_items")
        .insert({
            user_id: userId,
            google_places_id: google_places_id,
            checked: false,
        })
        .then(() => {
            res.status(201).send("Successfully added must-try restaurant");
        })
        .catch((err) => 
            res.status(400).send(`Error adding must-try restaurant: ${err}`)
        );
}

// Delete a must-try restaurant
const deleteMustTryItem = (req, res) => {
    const itemId = req.params.itemId; // Assuming you pass the item ID as a route parameter

    knex("musttry_items")
        .where({ id: itemId })
        .del()
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => 
            res.status(400).send(`Error deleting must-try restaurant: ${err}`)
        );
}

// Move a restaurant from must-try to favourites
const moveItemToFavourites = async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user.id;
    let trx;

    try {
        // Start a database transaction
        trx = await knex.transaction();

        const mustTryItem = await trx("musttry_items")
            .where({ id: itemId, user_id: userId })
            .first();

        if (!mustTryItem) {
            await trx.rollback();
            return res.status(404).send("Item not found.");
        }

        // Move the item to the favourites table
        await trx("favourites_items").insert({
            user_id: userId,
            google_places_id: mustTryItem.google_places_id,
        });

        // Delete the item from the must-try table
        await trx("musttry_items")
            .where({ id: itemId })
            .del();

        // Commit the transaction
        await trx.commit();
        
        res.status(200).send("Item moved to favourites.");
    } catch (err) {
        // If an error occurs, roll back the transaction
        if (trx) {
            await trx.rollback();
        }
        res.status(500).send("Error moving item to favourites.");
    }
};

// Move a restaurant from must-try to visited
const moveItemToVisited = async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user.id;
    let trx;

    try {
        // Start a database transaction
        trx = await knex.transaction();

        const mustTryItem = await trx("musttry_items")
            .where({ id: itemId, user_id: userId })
            .first();

        if (!mustTryItem) {
            await trx.rollback();
            return res.status(404).send("Item not found.");
        }

        // Move the item to the visited table
        await trx("visited_items").insert({
            user_id: userId,
            google_places_id: mustTryItem.google_places_id,
        });

        // Delete the item from the must-try table
        await trx("musttry_items")
            .where({ id: itemId })
            .del();

        // Commit the transaction
        await trx.commit();
        
        res.status(200).send("Item moved to visited.");
    } catch (err) {
        // If an error occurs, roll back the transaction
        if (trx) {
            await trx.rollback();
        }
        res.status(500).send("Error moving item to visited.");
    }
};

module.exports = {
    getMustTryItems,
    addMustTryItem,
    deleteMustTryItem,
    moveItemToFavourites,
    moveItemToVisited,
};