import passport from "passport";
import { Router } from 'express'
import { isAuth } from '../controller/isAuth.js'
import info from "../controller/info.js"
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js'

const infoRoute = Router()

infoRoute.get('/', (req,res) => {
    try{
        res.render('/info', {info: info()});
        loggerInfo.info('Accedió correctamente a /info');
    } catch(error) {
        loggerError.error('Error en /info: ' + error)
        res.send('Error')
    }
});

export default infoRoute