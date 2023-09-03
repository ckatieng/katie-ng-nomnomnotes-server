exports.up = function(knex) {
    return knex.schema.table('favourites_items', function(table) {
      table.decimal('rating', 2, 1).alter();
    })
    .table('visited_items', function(table) {
      table.decimal('rating', 2, 1).alter();
    });
};

exports.down = function(knex) {
    return knex.schema.table('favourites_items', function(table) {
      table.float('rating').alter();
    })
    .table('visited_items', function(table) {
      table.float('rating').alter();
    });
};