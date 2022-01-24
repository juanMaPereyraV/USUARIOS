const path = require('path');
const fs = require('fs');   
const bcrypt = require('bcrypt');
const validator = require('express-validator');

const model = {
    file : path.resolve(__dirname, '../data/users.json'),
    read : () => fs.readFileSync(model.file, "utf8"),
    write : data  => fs.writeFileSync(model.file, JSON.stringify(data,null,2),),
    all : () => JSON.parse(model.read()),

    search : (prop,value) => model.all().find(element => element[prop] == value),//busca un solo resultado basado en la lectura de lo que hay actualmente registrado. Primero se lee a través del método ALL, luego buscamos con el FIND, aquellos elementos (cb) que dentro de su propiedad tengan el valor que nosotros especificamos. 
    generated : data => Object({ // para generar nuevo usuario, creamos un objeto con la estructura que queremos de ese dato
        id : model.all.length == 0 ? 1 : model.all().pop().id + 1,   //pop es metodo de array que almancena o elimina el último elemento
        email : String(data.email), 
        password : bcrypt.hashSync(data.password,10),
        isAdmin : String(data.email).includes("@digitalhouse.com"), //también se puede poner false y cambiarlo a mano en JSON
        isActive: true    
    }),
    create : data => {
        let all = model.all();
        let user = model.generated(data); //viene usuario
        all.push(user); //agregamos usuario que vino
        model.write(all); //escribo el arhvio con el usuario que vino
        return user
    },
    validate: [
        validator.body('email').isEmail().withMessage('Invalid Email'),
        validator.body('password').isLength({ min: 5 }).withMessage('Min 5 characters')
    ],
}


         

module.exports = model;