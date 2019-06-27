const express = require('express');

const fs = require('fs');

const path = require('path')

const { verficatokenImg} = require('../middlewares/autenticacion')

let app = express();


app.get('/imagen/:tipo/:img', verficatokenImg, (req,res)=>{

let tipo = req.params.tipo;
let img = req.params.img;


let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);

if(fs.existsSync(pathImagen)){
    res.sendFile(pathImagen)
}else{
    let noImagepath = path.resolve(__dirname,'../assets/no-image.jpg')
    
    res.sendFile(noImagepath)
}






}) 





module.exports = app;
