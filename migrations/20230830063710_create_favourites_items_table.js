exports.up = function (knex) {
    return knex.schema.createTable('favourites_items', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
        table.string('google_places_id').notNullable();
        table.integer('rating').defaultTo(null);
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTable('favourites_items');
};