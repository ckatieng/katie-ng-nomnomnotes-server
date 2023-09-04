exports.up = function (knex) {
    return knex.schema.createTable('ratings', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
        table.string('google_places_id').notNullable(); 
        table.decimal('rating', 2, 1).notNullable(); 
        table.timestamps(true, true); 
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTable('ratings');
};