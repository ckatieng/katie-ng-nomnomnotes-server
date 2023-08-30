const usersData = require('./seeds_data/users');
const musttryItemsData = require('./seeds_data/musttry_items');
const favouritesItemsData = require('./seeds_data/favourites_items');
const visitedItemsData = require('./seeds_data/visited_items');

exports.seed = async function(knex) {
    // Delete existing data to start fresh
    await knex('visited_items').del();
    await knex('favourites_items').del();
    await knex('musttry_items').del();
    await knex('users').del();

    // Insert users data
    await knex('users').insert(usersData);

    // Insert must-try items data
    await knex('musttry_items').insert(musttryItemsData);

    // Insert favourites items data
    await knex('favourites_items').insert(favouritesItemsData);

    // Insert visited items data
    await knex('visited_items').insert(visitedItemsData);
};
