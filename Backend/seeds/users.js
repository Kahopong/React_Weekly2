exports.seed = function(knex) {
  return knex('todo').del()
    .then(()=>{
      return knex('users').del() 
    })
    .then(()=>{
      return knex('users').insert([
        { username: 'try', email:'try@try.com', password: '' },
      ]);
    })
    .then(()=>{
      return knex('todo').insert([
        { users_id: 1, todo: 'buy a', isCompleted: false },
        { users_id: 1, todo: 'buy b', isCompleted: false },
        { users_id: 1, todo: 'buy c', isCompleted: false },
      ]);
    })
};
