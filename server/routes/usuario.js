const express = require('express');

const app = express();

const Usuario=require('../models/usuario');

const bcrypt = require('bcryptjs');

const _ = require('underscore');

const { verificaToken,verificAdminrole } = require('../middlewares/autenticacion')


app.get('/usuario',verificaToken, (req, res) => {

  let desde = req.query.desde || 0;

  desde= Number(desde);

  let limite=req.query.limite || 5;

  limite = Number(limite);
 
Usuario.find({estado:true},'nombre email estado role google img')
         .skip(desde)
         .limit(limite)
         .exec((err,usuarios)=>{

          
        if(err) {
          return res.status(400).json({
             ok:false,
             err,
          
           });
         }
        Usuario.countDocuments({estado:true},(err,conteo)=>{
          res.json({
           ok:true,
           usuarios,
           registrostotales:conteo,
         }); 

        })
        })



  });
  app.post('/usuario',[verificaToken,verificAdminrole] , (req, res)=> {
      
  


      let body = req.body;
       let usuario = new Usuario({
         nombre:body.nombre,
         email:body.email,
         password: bcrypt.hashSync(body.password,10),
         role:body.role
       }); 
      
       usuario.save((err,usuariodb)=>{

        if(err) {
         return res.status(400).json({
            ok:false,
            err
          });
        }

        //usuariodb.password=null;
        res.json({
          ok:true,
          usuario:usuariodb
        })
       })
      
      
      
      
    
    });
    app.put('/usuario/:id',[verificaToken,verificAdminrole], (req, res) => {
     
     let id = req.params.id;
     let body=_.pick(req.body,[ 'nombre','email','img','role','estado']);
    
     Usuario.findByIdAndUpdate(id,body, {new:true,runValidators:true} ,(err,usuariodb)=>{

      if(err) {
        return res.status(400).json({
           ok:false,
           err
         });
       }
     
     
      res.json({
           ok:true,
           usuario:usuariodb
  
       });
     })
     
    });
    app.delete('/usuario/:id', [verificaToken,verificAdminrole] ,(req, res) => {
      
    let id = req.params.id;
  //  let body = _.pick(req.body,['estado'])
    let cambiaEstado={
      estado:false
    }
    //Usuario.findByIdAndRemove
    Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true,runValidators:true},(err,borrado)=>{
      if(err) {
        return res.status(400).json({
           ok:false,
           err
         });
       }
       if (!borrado){
        return res.status(400).json({
          ok:false,
          error:{
            message:'Usuario no encontrado'
          }
        });
       }

       res.json({
        ok:true,
        usuario:borrado

    });
    })


    });

    
module.exports = app;