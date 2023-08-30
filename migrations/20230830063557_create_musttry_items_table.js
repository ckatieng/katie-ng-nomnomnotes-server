exports.up = function (knex) {
    return knex.schema.createTable('musttry_items', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
        table.string('google_places_id').notNullable();
        table.boolean('checked').defaultTo(false);
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTable('musttry_items');
};