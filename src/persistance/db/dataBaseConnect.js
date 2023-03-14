import mongoose from "mongoose"
import { loggerError, loggerInfo } from "../../controller/log4js.js";
import DbClient from "./dbClient.js"

const connectionStringUrl = process.env.MONGODB;

class MongoClient extends DbClient {
    constructor() {
        super();
        this.connected = false
        this.client = mongoose
    }

    async connect() {
        try {
            await this.client.connect(connectionStringUrl,
                { useNewUrlParser: true, 
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 100000
            })
            .then(() => loggerInfo.info('Conectado a Mongo'));
            this.connected = true
        } catch (error) {
            loggerError.error(error);
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            .then(() => loggerInfo.info('Desconectado de Mongo'));
            this.connected = false;
        } catch(error) {
            loggerError.error(error)
        }
    }
}

export default MongoClient

