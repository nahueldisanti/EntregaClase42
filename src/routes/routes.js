import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../controller/isAuth.js'
import info from "../controller/info.js"
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

const routes = Router()

//INDEX
routes.get('/', isAuth, (req, res) => {
    try {
        loggerInfo.info('Se accedió correctamente a productos')
        res.render('products', {
            user: req.user
        })
    }catch(error) {
        loggerError.error('Error en productos: ' + error)
        res.send('Error')
    }
})

//LOGIN
routes.get('/login', (req, res) => {
    try{
        loggerInfo.info('Accedió correctamente a /login')
        if (req.isAuthenticated()) return res.redirect('/')
        res.render('login')
    } catch(error) {
        loggerError.error('Error en /login: ' + error)
        res.send('Error')
    }
})

routes.post('/login', passport.authenticate('login', {failureRedirect: '/error-login'}), (req, res) => res.redirect('/'))

//SIGNUP
routes.get('/signup', (req, res) => {
    try{
        loggerInfo.info('Accedió correctamente a /signup')
        if (req.isAuthenticated()) return res.redirect('/ecommerce')
        res.render('signup')
    } catch(error) {
        loggerError.error('Error en /signup: ' + error)
        res.send('Error')
    }
})
routes.post('/signup', passport.authenticate('signup', {failureRedirect: '/error-signup'}), (req, res) => res.redirect('/login'))

//LOGOUT
routes.get('/logout',isAuth, (req, res) => {
    try {
        loggerInfo.info('Se ha deslogueado la sesión correctamente')
        req.logout(err => {
            if (err) return err
            res.redirect('/login')
        })
    } catch (error) {
        loggerError.error('Error en /logout: ' + error)
        res.send('Error')
    }
})

//FAIL ROUTE
routes.get('/error-login', (req, res) => {
    try{
        loggerInfo.info('No se ha podido iniciar sesión')
        res.render('error-login')
    } catch(error) {
        loggerError.error('Error en /error-login: ' + error)
        res.send('Error')
    }
})
routes.get('/error-signup', (req, res) => {
    try{
        loggerInfo.info('No se ha podido registrar el usuario')
        res.render('error-signup')

    } catch(error) {
        loggerError.error('Error en /error-signup: ' + error)
        res.send('Error')
    }
})

//INFO ROUTES

routes.get('/info', (req,res) => {
    try{
        res.render('/info', {info: info()});
        loggerInfo.info('Accedió correctamente a /info');
    } catch(error) {
        loggerError.error('Error en /info: ' + error)
        res.send('Error')
    }
});

routes.get('/*', (req, res, next) => {
    try {
    loggerWarn.warn("Ruta inexistente");
    res.redirect('/login')
    next();
    } catch (error) {
        loggerError.error('Error en la ruta: ' + error.message)
        res.send('Error')
    }
})



export default routes