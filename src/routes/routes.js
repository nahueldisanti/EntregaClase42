import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../controller/isAuth.js'
import info from "../controller/info.js"
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

const routes = Router()

import failRoute from "./fail-route.js"
import productsRoute from './products-route.js'
import infoRoute from "./info-route.js"
import loginRoute from "./login-route.js"
import logoutRoute from './logout-route.js'
import signupRoute from "./signup-route.js"


routes.use('/', productsRoute);
routes.use('/login', loginRoute);
routes.use('/signup', signupRoute);
routes.use('/logout', logoutRoute);
routes.use('/info',infoRoute);
routes.use('/error-login',failRoute);

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

module.exports = routes;

