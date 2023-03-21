import axios from "axios";
import { loggerInfo, loggerError } from './src/controller/log4js.js'


let url = 'http://localhost:8080/'

let productId = "64191032103305a70517c2e9"

axios(url)
    .then(response => console.log(response.data))
    .then(error => console.log(error));


let productTest = {
    name: 'Lapicera',
    price: 3.4,
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bikabik.com.ar%2Fproduct%2Flapicera-faber-castell-trilux-azul%2F&psig=AOvVaw1qzHrTTXBilRw_I56ku3ck&ust=1679449491347000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJjAtoTz6_0CFQAAAAAdAAAAABAE",
    category:"Utiles", 
    description: "lapicera roller azul",
    stock: 100
}

//Get Test

axios.get(url)
    .then(res => loggerInfo.info(res.data))
    .then(error => loggerError.error(error));

//Post Test

axios.post(url, productTest)
    .then(res => loggerInfo.info(res.data))
    .then(error => loggerError.error(error));

//Delete Test

axios.delete(`${url}/${productId}`)
    .then(res => loggerInfo.info(res.data))
    .then(error => loggerError.error(error));
