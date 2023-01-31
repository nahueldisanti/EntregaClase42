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




const app = express();

passport.use('login', strategyLogin);
passport.use('signup', strategySignUp);

app.set('view engine', 'ejs');
app.set('views', './src/views');
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


const connectionStringUrl = process.env.MONGODB

//MASTER

const modoServer = args.modo || 'FORK';

if (modoServer == 'CLUSTER') {
    if (cluster.isPrimary) {
        const numCPUs = os.cpus().length;

        console.log(`Primary ${process.pid} id running`);
        console.log(`número de procesadores: ${numCPUs}`);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', worker => {
            console.log(`Worker ${worker.process.pid} died`, new Date().toLocaleString());
            cluster.fork();
        })
    }
} else {

    const app = express();
    const PORT = parseInt(process.argv[2]) || process.env.PORT
    const STATIC = process.argv[4] == 'STATIC';

    if (STATIC) {

        app.use(express.static('/public'));
        app.use(express.json());
        app.use(express.urlencoded({
            extended: true
        }));
    }

    const server = app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}/ecommerce/ o http://localhost:${PORT}/api/random/ - PID ${process.pid}`);
    });
    server.on('error', error => console.log(`Error en servidor ${error}`));

}