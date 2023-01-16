import express from "express"
import session from "express-session"
import 'dotenv/config'
import mongoose from "mongoose"
import passport from "passport"
import routes from './src/routes.js'
import { strategyLogin, strategySignUp } from "./src/middlewares/passport.js"

const app = express();

passport.use('login', strategyLogin);
passport.use('signup', strategySignUp);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.urlencoded({extended: true}))
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

const connectionStringUrl =  process.env.MONGODB

try{
    await mongoose.connect(connectionStringUrl, {
        useUnifiedTopology: true
    })
    console.log('Base de datos conectada')
}catch(error){
    console.log(`Ha habido un error en la config del server mongo ${error}`)
}

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`http://localhost:${PORT}/ecommerce/`)) 