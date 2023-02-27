import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../controller/isAuth.js'
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

const loginRoute = Router()

loginRoute.get('/login', (req, res) => {
    try{
        loggerInfo.info('Accedió correctamente a /login')
        if (req.isAuthenticated()) return res.redirect('/')
        res.render('login')
    } catch(error) {
        loggerError.error('Error en /login: ' + error)
        res.send('Error')
    }
})

loginRoute.post('/login', passport.authenticate('login', {failureRedirect: '/error-login'}), (req, res) => res.redirect('/'))



export default loginRoute