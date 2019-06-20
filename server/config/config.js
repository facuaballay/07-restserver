



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
 if (process.env.NODE_ENV === 'dev'){
    urldb='mongodb://localhost:27017/cafe'
 }else{
     urldb=process.env.MONGO_URI;
 }


process.env.urldb=urldb;

//=====================
//Vencimento del token
//=====================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = '48h';

//=====================
//Google client ID
//=====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '22322636000-g640htpg2l8q3qotfmngf12t4pj3eo3t.apps.googleusercontent.com';

