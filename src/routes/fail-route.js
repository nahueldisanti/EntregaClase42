import passport from "passport";
import { Router } from 'express'
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

const failRoute = Router()

failRoute.get('/error-login', (req, res) => {
    try{
        loggerInfo.info('No se ha podido iniciar sesión')
        res.render('error-login')
    } catch(error) {
        loggerError.error('Error en /error-login: ' + error)
        res.send('Error')
    }
})
failRoute.get('/error-signup', (req, res) => {
    try{
        loggerInfo.info('No se ha podido registrar el usuario')
        res.render('error-signup')

    } catch(error) {
        loggerError.error('Error en /error-signup: ' + error)
        res.send('Error')
    }
})

export default failRoute