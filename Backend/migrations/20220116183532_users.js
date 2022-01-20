exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username');
        table.string('email').unique();
        table.string('password');
        table.string('facebookid');
        table.string('facebookaccesstoken')
        table.timestamps(false, true);
    }).then(()=>{
        return knex.schema.createTable('todo', (table) => {
            table.increments();
            table.integer("users_id").unsigned()
            table.foreign("users_id").references('users.id');
            table.string("todo");
            table.boolean("isCompleted");
            table.timestamps(false, true);
        })
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('todo').then(()=>{
        return knex.schema.dropTable('users')
    })
};
