require('./config/config');

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

//configuracion global de rutas
app.use(require('./routes/index'));


 


mongoose.connect(process.env.urldb, {useNewUrlParser: true,useCreateIndex:true});




  app.listen(process.env.PORT,()=>{
    console.log("escuchando el puerto: " ,3000);
})
