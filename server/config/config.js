



//=====================
//Puerto
//=====================
process.env.PORT = process.env.PORT || 3000;


//=====================
//Entorno
//=====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//=====================
//Seed de autenticacion
//=====================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarollo';

//=====================
//Base de datos
//=====================

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> variable de entorno mongo
 if (process.env.NODE_ENV === 'dev'){
    urldb='mongodb://localhost:27017/cafe'
 }else{
     urldb=process.env.MONGO_URI;
 }
<<<<<<< HEAD
=======
>>>>>>> Update config.js
=======
>>>>>>> variable de entorno mongo


process.env.urldb=urldb;

//=====================
//Vencimento del token
//=====================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

