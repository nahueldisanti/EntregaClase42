import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { loggerInfo, loggerError} from "../utils/log4js"

const etherealUser = process.env.ETHEREAL_USER
const etheralPass =  process.env.ETHERAL_PASS


async function sendMail (body, username){

    const mailOptions = {
        from: "Libreria NET", 
        to: body.correo,
        subject: "Registro Exitoso", 
        html: `
        <h3>${username}</h3><br>
        <h3>${body.names}</h3><br>
        <h3>${body.direccion}</h3><br>
        <h3>${body.edad}</h3><br>
        <h3>${body.tel}</h3><br>`
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: etherealUser,
            pass: etheralPass
        }
    });
    try {
        const info = await transporter.sendMail(mailOptions)
    } catch (err) {
        loggerError.error (err);
    }
}

module.exports = { sendMail }