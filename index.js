import express from "express"
import session from "express-session"
import 'dotenv/config'
import mongoose from "mongoose"
import passport from "passport"
import routes from './src/routes.js'
import {
    strategyLogin,
    strategySignUp
} from "./src/middlewares/passport.js"

import cluster from 'cluster'
import os from 'os'
import { loggerInfo } from './utils/log4js.js'

import randomRoute from './src/randomRoute.js'

const PORT = parseInt(process.argv[3]) || process.env.PORT


const app = express();

passport.use('login', strategyLogin);
passport.use('signup', strategySignUp);

app.set('view engine', 'ejs');
app.set('views', './src/middlewares/views');
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(session({
    secret: process.env.SECRET,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: Number(process.env.TIEMPO_EXPIRACION)
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/ecommerce', routes)
app.use('/random', randomRoute)

const connectionStringUrl = process.env.MONGODB


async function connectToMongo() {
    await mongoose.connect(connectionStringUrl,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log('Connected to MongoDB');
    
    });
}

connectToMongo();

//MASTER

const modoServer = process.argv[2] || 'FORK';

if (modoServer == 'CLUSTER') {
    if (cluster.isPrimary) {
        const numCPUs = os.cpus().length;
        
        loggerInfo.info(`Master ${process.pid} id running. Numero de procesadores ${numCPUs}`)

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', worker => {
            loggerInfo.info(`worker ${worker.process.pid} died`);
            //cluster.fork();
        })
    } else {

        const server = app.listen(PORT, () => {
            loggerInfo.info(`http://localhost:${PORT}/ecommerce/ o http://localhost:${PORT}/random/random - PID ${process.pid}`);
            server.on('error', error => console.log(`Error en servidor ${error}`));
            loggerInfo.info(`Worker ${process.pid} started`);
        });
    } 

} else {

        
    const server = app.listen(PORT, () => {
        loggerInfo.info(`http://localhost:${PORT}/ecommerce/ o http://localhost:${PORT}/random/random - PID ${process.pid}`);
    });
    server.on('error', error => console.log(`Error en servidor ${error}`));
}

