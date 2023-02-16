import passport from 'passport'
import { Strategy } from 'passport-local';
import { User } from "../mongo-models/user-model.js"
import { isValidPassword, createHash } from "../utils/bcrypt.js"
import { Product } from '../mongo-models/product-model.js'
import { sendMail } from "../utils/nodemailer.js"

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

//-------LOGIN-------//
export const strategyLogin = new Strategy(
    (username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
            console.log('Usuario no encontrado: ' + username);
            return done(null, false);
        }
        if (!isValidPassword(user, password)) {
            console.log('Contraseña invalida');
            return done(null, false);
        }
        return done(null, user);
    });
    })

//-------SINGUP-------//
export const strategySignUp = new Strategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        User.findOne({ 'username': username }, function (err, user) {
        if (err) {
            console.log('Error in SingUp: ' + err);
            return done(err);
        }   
        if (user) {
            console.log('El usuario ya existe');
            return done(null, false)
        }

        sendMail(req.body, username);

        const newUser = {
            name: req.body.name,
            username: req.body.username,
            correo: req.body.correo, 
            password: createHash(password),
            domicilio: req.body.domicilio, 
            edad: req.body.edad, 
            tel: req.body.tel, 
            avatar: req.body.avatar
        }
        User.create(newUser, (err, userWithId) => {
            if (err) {
                console.log('Error al guardar el usuario: ' + err);
                return done(err);
            }
            console.log(user)
            console.log('El usuario se registró correctamente');
            return done(null, userWithId);
        });
    });
})
