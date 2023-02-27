import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../controller/isAuth.js'
import info from "../controller/info.js"
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

const signupRoute = Router()

signupRoute.get('/', (req, res) => {
    try{
        loggerInfo.info('Accedió correctamente a /signup')
        if (req.isAuthenticated()) return res.redirect('/ecommerce')
        res.render('signup')
    } catch(error) {
        loggerError.error('Error en /signup: ' + error)
        res.send('Error')
    }
})
signupRoute.post('/signup', passport.authenticate('signup', {failureRedirect: '/error-signup'}), (req, res) => res.redirect('/login'))

export default signupRoute