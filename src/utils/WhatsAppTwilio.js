import dotenv from 'dotenv';
import twilio from "twilio"
import { loggerInfo, loggerError, loggerWarn} from './log4js';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = twilio(accountSid, authToken); 

export async function sendWhatsapp(){
    try {
        await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
            body: `Nueva orden procesada en el dia: ${new Date().toLocaleString()}`,
            to: `whatsapp:${process.env.MY_PHONE_NUMBER}`
        })
        .then(message => loggerInfo.info(message.sid));
    } catch (error) {
        loggerWarn.warn(error)
    }

}