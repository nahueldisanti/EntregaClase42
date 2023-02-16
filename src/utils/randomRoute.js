
import { Router } from 'express'
import { fork } from "child_process"
import { loggerInfo, loggerError, loggerWarn } from './log4js.js'

const randomRoute = Router()

randomRoute.get('/', (req, res) => {
    try{
        loggerInfo.info('Se ha accedido a /random')
        let cant = req.query.cant || 10;
        //let passCant = ['' + cant + '']
        const child = fork('./random.js');
        
        child.send(cant);

        child.on('message', (operation) => {
            res.render('random', {operation: operation});
        });

    }catch (error) {
        loggerError.error('Error en /random: ' + error)
        res.send('Error')
}
})

export default randomRoute