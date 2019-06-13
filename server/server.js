require('./config/config');

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const path = require('path')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname,'../public')));

console.log(path.resolve(__dirname,'../public'))
//configuracion global de rutas
app.use(require('./routes/index'));


 


mongoose.connect(process.env.urldb, {useNewUrlParser: true,useCreateIndex:true});




  app.listen(process.env.PORT,()=>{
    console.log("escuchando el puerto: " ,3000);
})
