import passport from "passport";
import { Router } from 'express';
import { isAuth } from '../controller/isAuth.js';
import { loggerInfo, loggerError, loggerWarn } from '../controller/log4js.js';
import {getProducts, getMessages} from "../business/productsController.js";


const productsRoute = Router()

productsRoute.get('/', isAuth, (req, res) => {
    try {
        loggerInfo.info('Se accedió correctamente a productos')
        const products = getProducts();
        const messages = getMessages();
        res.render('products', {
            user: req.user, products, messages
        })
    }catch(error) {
        loggerError.error('Error en productos: ' + error)
        res.send('Error')
    }
})

export default productsRoute