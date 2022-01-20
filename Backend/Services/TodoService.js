class TodoService {
  constructor(knex) {
      this.knex = knex
  }

  list(usersId) {
    return this.knex('todo').select('*').where('users_id', usersId).orderBy('id')
  }

  add(usersId, todo){
    return this.knex('todo').insert({users_id: usersId, todo: todo, isCompleted: false})
        .then(()=>this.list(usersId))
  }

  edit(usersId, todo, i){
    return this.knex('todo').where('users_id',usersId).orderBy('id').then((data)=>{
        if(data.length > 0){
            return this.knex('todo').where('id',data[i].id).update({users_id: usersId, todo: todo})
            .then(()=>this.list(usersId))
        } else{
            throw new Error('Could not edit, user/todo not exist.')
        }
    })   
  }

  delete(usersId, i){
    return this.knex('todo').where('users_id',usersId).orderBy('id').then((data)=>{
        if(data.length > 0){
            return this.knex('todo').where('id',data[i].id).del()
            .then(()=>this.list(usersId))
        } else{
            throw new Error('Could not delete, user/todo not exist.')
        }
    })   
  }

  complete(usersId, i){
    return this.knex('todo').where('users_id',usersId).orderBy('id').then((data)=>{
      if(data.length > 0){
          return this.knex('todo').where('id',data[i].id)
          .then((todo)=>{
            if(todo[0].isCompleted == false){
              return this.knex('todo').where('id',data[i].id).update({isCompleted : true})
            } else {
              return this.knex('todo').where('id',data[i].id).update({isCompleted : false})
            }
          })
          .then(()=>this.list(usersId))          
      } else{
          throw new Error('Could not complete, user/todo not exist.')
      }
    })
  }

}

module.exports = TodoService;