const validator = require("express-validator");
const user = require("../models/user");
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt');

module.exports = {
  Iindex: (req, res) => res.send (user.all(),{
    title: "Index"
  }),
  login: (req, res) => res.render("users/login", {
    title: "Home",
    
  }),
  register: (req, res) => res.render("users/register", {
    title: "Register"
  }),
  profile: (req, res) => res.render("users/profile",  {
    title: "Profile"}),

  acces: (req, res) => {
    let errors = validator.validationResult(req); //trae los errores del resultado de las validciones

    if (!errors.isEmpty()) {
      return res.render("user/login", {
        errors: errors.mapped() 
      });
    }


    let exist = user.search("email", req.body.email);
    if (!exist) {
      return res.render("user/login", {
        errors: {
          email: {
            msg: "email sin registrar",
          }
        }
      })
    }

    if (!bcrypt.compareSync(req.body.password, exist.password)){ 
      return res.render("user/login", {
        errors: {
          password: {
            msg: "Contraseña invalida",
          }
        }
      })
    }

    if(req.body.remember){
        res.cookie("email",req.body.email,{maxAge:1000*60*60*24*30})
    }
    req.session.user = exist

    return res.redirect ("/") 
  },
  save: (req, res) => {
    let errors = validator.validationResult(req); //trae los errores del resultado de las validciones

    if (!errors.isEmpty()) {
      return res.render("user/register", {
        errors: errors.mapped() 
      })
    }

    let exist = user.search("email", req.body.email);

    if (exist) {
      return res.render("user/register", {
        errors: {
          email: {
            msg: "email ya registrado",
          },
        },
      });
    }

    let userRegistred = user.create(req.body);

    return res.redirect("/users/login")
  },
  logout: (req, res) => {
      delete req.session.user
      res.cookie ("email", null, { maxAge: -1 })
      return res.redirect("/")
},
}
