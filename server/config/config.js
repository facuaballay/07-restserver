



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

 if (process.env.NODE_ENV === 'dev'){
    urldb='mongodb://localhost:27017/cafe'
 }else{
     urldb="mongodb+srv://facu:41112258@restserver-prueba-8s8wy.mongodb.net/cafe?retryWrites=true&w=majority";
 }


process.env.urldb=urldb;
