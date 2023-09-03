const knex = require("knex")(require("../knexfile"));

// Check if item already exists in a table
async function checkIfItemExists(userId, googlePlacesId, tableName) {
    // Query the specified table for an existing item
    const existingItem = await knex(tableName)
        .where({ user_id: userId, google_places_id: googlePlacesId })
        .first();
  
    // Return true if an item exists, false otherwise
    return !!existingItem;
}

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
const addMustTryItem = async (req, res) => {
    const { google_places_id } = req.body;
    const userId = req.user.id;

    // Check if the item already exists in must-try
    const isItemInMustTry = await checkIfItemExists(userId, google_places_id, 'musttry_items');
    if (isItemInMustTry) {
        return res.status(400).send("Item already exists in must-try.");
    }

    // Check if the item already exists in favourites
    const isItemInFavourites = await checkIfItemExists(userId, google_places_id, 'favourites_items');
    if (isItemInFavourites) {
        return res.status(400).send("Item already exists in favourites.");
    }

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
    const rating = req.body.rating;
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
            rating: rating,
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
        res.status(500).send(`Error moving item to favourites: ${err}`);
    }
};

// Move a restaurant from must-try to visited
const moveItemToVisited = async (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user.id;
    const rating = req.body.rating;
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
            rating: rating,
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
        res.status(500).send(`Error moving item to visited: ${err}`);
    }
};

module.exports = {
    getMustTryItems,
    addMustTryItem,
    deleteMustTryItem,
    moveItemToFavourites,
    moveItemToVisited,
};