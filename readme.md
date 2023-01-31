Comandos para la ejecucion de este servidor realizado para el ejercicio de la clase 30 del curso de BackEnd de CoderHouse (Nahuel Di Santi): 

Para ejecutar el servidor utilizando PM2:
 pm2 start app.js --name="Server1" --watch -- PORT (modo fork) 
 pm2 start app.js --name="Server2" --watch -i max -- PORT (modo cluster)

