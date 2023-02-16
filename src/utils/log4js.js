import Log4js from "log4js";

const log4js = Log4js;

log4js.configure({
    appenders: {
        //Soportes de salida
        consola: { type: 'console' },
        archivoErrores: { type: 'file', filename: 'logs/errores.log'},
        archivoWarn: { type: 'file', filename: 'logs/warn.log'},
        //Niveles de loggeo
        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        loggerArchivoErrores: { type: 'logLevelFilter', appender: 'archivoErrores', level: 'error' },
        loggerArchivoWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn' },
},  
    categories: {
        default: { appenders: ["loggerConsola"], level: 'all'},
        categWarn: { appenders: ["loggerArchivoWarn"], level: 'all'},
        categError: { appenders: ["loggerArchivoErrores"], level: 'all'}
}
});

export const loggerInfo = log4js.getLogger('default')
export const loggerWarn = log4js.getLogger('categWarn')
export const loggerError = log4js.getLogger('categError')