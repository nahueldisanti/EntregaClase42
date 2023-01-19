import passport from "passport";
import { Router } from 'express'
import { isAuth } from './middlewares/isAuth.js'
import { fork } from "child_process"
import info from "./info.js"

const routes = Router()

//INDEX
routes.get('/', isAuth, (req, res) => res.render('products', {
    user: req.user
}))

//LOGIN
routes.get('/login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/ecommerce')
    res.render('login')
})
routes.post('/login', passport.authenticate('login', {failureRedirect: '/ecommerce/error-login'}), (req, res) => res.redirect('/ecommerce/'))

//SIGNUP
routes.get('/signup', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/ecommerce')
    res.render('signup')
})
routes.post('/signup', passport.authenticate('signup', {failureRedirect: '/ecommerce/error-signup'}), (req, res) => res.redirect('/ecommerce/login'))

//LOGOUT
routes.get('/logout', isAuth, (req, res) => {
    req.logout(err => {
        if (err) return err
        res.redirect('/ecommerce/login')
    })
})

//FAIL ROUTE
routes.get('/error-login', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/ecommerce')
    res.render('error-login')
})
routes.get('/error-signup', (req, res) => {
    if (req.isAuthenticated()) return res.redirect('/ecommerce')
    res.render('error-signup')
})

//INFO ROUTES

routes.get('/info', (req,res) => {
    res.render('info', {info: info()})
});

//RANDOM ROUTE

routes.get('/api/randoms', (req, res) => {
    let cant = req.query.cant || 10000;
    const child = fork('./random.js');
    child.send(cant);
    child.on('message', (operation) => {
        res.render('random', {operation: operation});
    });
})

export default routes