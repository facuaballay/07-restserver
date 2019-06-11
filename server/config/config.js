



//=====================
//Puerto
//=====================
process.env.PORT = process.env.PORT || 3000;


//=====================
//Entorno
//=====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


//=====================
//Base de datos
//=====================

<<<<<<< HEAD
 if (process.env.NODE_ENV === 'dev'){
    urldb='mongodb://localhost:27017/cafe'
 }else{
     urldb=process.env.MONGO_URI;
 }
=======
>>>>>>> Update config.js


process.env.urldb=urldb;
