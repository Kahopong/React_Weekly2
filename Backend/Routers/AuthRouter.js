const bcrypt = require("bcrypt");

class AuthRouter {
    constructor(express, axios, jwt, knex, config) {
      this.express = express;
      this.axios = axios;
      this.jwt = jwt;
      this.knex = knex;
      this.config = config;
    }

    router() {
      let router = this.express.Router();
      router.post("/api/login", this.postLogin.bind(this));
      router.post("/api/signup", this.postSignup.bind(this));
      router.post("/api/login/facebook", this.postFacebook.bind(this));
      return router;
    }
  
    //Login Post request
    //==================
    async postLogin(req, res) {
      if (req.body.email || req.body.password) {
        let email = req.body.email;
        let password = req.body.password;

        //Checking knex, get user's email
        let user = await this.knex.select("*").from("users").where({ email: email })
        .then((data) => {
            return data[0]
        });

        //Compare knex password with bcrypt password, if true, generate token
        if (await user && bcrypt.compare(password, user.password)) {
            let payload = {id: user.id};
            let token = this.jwt.sign(payload, this.config.jwtSecret);
            let name = user.username
            res.json({ token, name });
        } else {
          // Handling Wrong email/password
          let message = 'Incorrect username/password. Please try again!'
          res.json({message})
        }
     } else {
         //Cannot receive email/password input
         let message = 'Incorrect username/password. Please try again!'
         res.json({message})
       }
    }
  
    //Sign up Post request
    //==================
    async postSignup(req, res) {
    // we have no logic to handle if the username/ email is taken. 
      if (req.body.name && req.body.email && req.body.password) {
        let username = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        //Search knex for registered email
        let findEmail = await this.knex("users").select('*').where('email', email)
        if(findEmail.length > 0){
          let message = 'Sorry, this email has already been registered'
          res.json({ message });
        } else {
        // email is available
          //hash the password input by the user
          let hashedPassword = await bcrypt.hash(password, 10);
          password = hashedPassword;
  
          //Creating new user object
          let userInfo = {username, email, password};
  
          //Insert new user into knex and return new user's id
          let userId = await this.knex("users").insert(userInfo).returning("id");
  
          //Directly login after sign up, generated token
          let payload = {id: userId};
          let token = this.jwt.sign(payload, this.config.jwtSecret);
          res.json({ token });
        }        
      } else {
        //Not inputting all the fields
         let message = 'Please input all the fields for a valid sign up.'
        //  res.status(402);
         res.json({ message });
      }
    }
  
    //Login Facebook Post request
    //===========================
    async postFacebook(req, res) {
     // add in condition to check for user
      if (req.body.info) {
        let accessToken = req.body.info.accessToken;

        //Get request from facebook
        this.axios
          .get(`https://graph.facebook.com/me?access_token=${accessToken}`)
          .then(async(data) => {
            // if no error on request -> success auth by facebook
            if (!data.data.error) {
              
              //Check knex to see if user has previously logged in with facebook 
              let oldUser = await this.knex("users").select('*').where('facebookid', req.body.info.id)
              if(oldUser.length >= 1) {
                let payload = {id: oldUser[0].id};
                let token = this.jwt.sign(payload, this.config.jwtSecret);
                let name = oldUser[0].username
                res.json({ token, name });
              } else {
                //Not an old fb users
                //Creating a new fb user
                let newFbUser = {
                    username: req.body.info.name, // better to use data or profile to check the facebook user name
                    email: req.body.info.email, // better to use data or profile to check the email
                    password: 'Get them to insert pw',
                    facebookid: req.body.info.id,
                    facebookaccesstoken:req.body.info.accessToken,
                };
                
                //Insert new FB user into knex and return new user's id
                let userId = await this.knex("users").insert(newFbUser).returning("id");
                let user = await this.knex("users").select('*').where('id', userId[0].id)

                //Create token
                let payload = {id: userId[0].id};
                let token = this.jwt.sign(payload, this.config.jwtSecret);
                let name = user[0].username
                res.json({ token, name });
              }
            } else {
            //Error on requeseting from facebook
            console.log('Error on requeseting from facebook')
            res.sendStatus(401);
          }
        })
        .catch((err)=>{
          console.log('Error fb:',err)
        }) // end of axios
    }}// end of postFacebook
}
  
  module.exports = AuthRouter;