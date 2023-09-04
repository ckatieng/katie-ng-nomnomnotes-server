const usersData = require('./seeds_data/users_seed');
const musttryItemsData = require('./seeds_data/musttry_items_seed');
const favouritesItemsData = require('./seeds_data/favourites_items_seed');
const visitedItemsData = require('./seeds_data/visited_items_seed');
const ratingsData = require('./seeds_data/ratings_seed');

exports.seed = async function(knex) {
    // Delete existing data to start fresh
    await knex('ratings').del();
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

    // Insert visited items data
    await knex('ratings').insert(ratingsData);
};
