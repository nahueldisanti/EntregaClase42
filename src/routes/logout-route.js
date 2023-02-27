import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../controller/isAuth.js'
import info from "../controller/info.js"
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

const logoutRoute = Router()


logoutRoute.get('/',isAuth, (req, res) => {
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

export default logoutRoute