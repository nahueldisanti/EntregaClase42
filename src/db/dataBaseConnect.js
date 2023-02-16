import mongoose from "mongoose"
import { loggerError, loggerInfo } from "../utils/log4js.js";

const connectionStringUrl = process.env.MONGODB;

export const dbConnect = mongoose.connect(connectionStringUrl,
    { useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 100000
})
.then(() => loggerInfo.info('Conectado a Mongo'))
.catch(err => loggerError.error(err));