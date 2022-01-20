
class TodoRouter {
  constructor(todoService, auth, express, axios, jwt, config) {
    this.todoService = todoService;
    this.auth = auth;
    this.express = express;
    this.axios = axios;
    this.jwt = jwt;
    this.config = config;
  }
  router() {
    let router = this.express.Router();
    router.get("/", this.auth.authenticate(), this.get.bind(this));
    router.post("/", this.auth.authenticate(), this.post.bind(this));
    router.put("/:id", this.auth.authenticate(), this.put.bind(this));
    router.delete("/:id", this.auth.authenticate(), this.delete.bind(this));
    router.post("/complete/:id", this.auth.authenticate(), this.complete.bind(this));
    return router;
  }
  // user ID: req.user[0].id  
  get(req, res) {
    return this.todoService.list(req.user[0].id)
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            res.status(500)
            console.log(err)
        })
  }

  post(req,res) {
    return this.todoService.add(req.user[0].id,req.body.todo)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(500)
        console.log(err)
    })
  }

  put(req,res) {
    return this.todoService.edit(req.user[0].id, req.body.todo, req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(500)
        console.log(err)
    })
  }
  
  delete(req,res) {
    return this.todoService.delete(req.user[0].id, req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(500)
        console.log(err)
    })
  }

  complete(req,res) {
    return this.todoService.complete(req.user[0].id, req.params.id)
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        res.status(500)
        console.log(err)
    })
  }
}

module.exports = TodoRouter;