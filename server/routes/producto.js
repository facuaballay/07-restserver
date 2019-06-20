const express = require('express');

const {verificaToken} = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

//
//Obtener todos los productos
//
app.get('/productos',(req,res) => {
    //trae todos los productos
    //populate:usuario categoria
    //paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite)
    
    Producto.find({})
            .populate('usuario','nombre email role')
            .populate('categoria','descripcion')
            .skip(desde)
            .limit(limite)
            .exec((err,productos)=>{
                if(err){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                };
                if(!productos){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            message:'El ID no es Correcto'
                        }
                    });
                };
            res.json({ok:true,productos})
    
            })



} )

//
//Obtener producto por id
//
app.get('/productos/:id',(req,res) => {
    //populate:usuario categoria
    let id = req.params.id;
    Producto.findById(id)
    .populate('usuario','nombre email role')
    .populate('categoria','descripcion')
    .exec((err,producto)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        };

       res.json({ok:true,producto}) 

    })
     })
//
//Crea un nuevo producto
//
app.post('/productos',verificaToken,(req,res)=>{
//grabar usuario 
//grabar categoria del listado.
let body = req.body;

let producto = new Producto ({
    nombre:body.nombre,
    precioUni:body.precio,
    disponible:body.disponible,
    categoria:body.categoria,
    usuario:req.usuario._id

})
producto.save((err,productodb)=>{
    
    if(err){
        return res.status(500).json({
            ok:false,
            err
        });
    };
    if(!productodb){
        return res.status(400).json({
            ok:false,
            err
        })
    }
    res.json({
        ok:true,
        producto:productodb
    })

})


})
//
//Actualizar nuevo producto
//
app.put('/productos/:id',(req,res)=>{
    //actualizar usuario 
    //actualizar categoria del listado.
   let id = req.params.id;
   let body = req.body;
   
    Producto.findOneAndUpdate(id,body,(err,productodb)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
                
            });
        };
        if(!productodb){
            return res.status(500).json({
                ok:false,
                err
                
            });
        };
    
        res.json({
            ok:true,
            productodb
        
        })
        console.log(productodb);
    })
    
    })

//
//Borrar nuevo producto
//
app.delete('/productos/:id',(req,res)=>{
    //borrar usuario : disponible false.
    //borrar categoria del listado.
    let id = req.params.id
    let cambiaDisponible={
        disponible:false
      }
    Producto.findOneAndUpdate(id,cambiaDisponible,(err,productodb)=>{

        if(err){
            return res.json({ ok:false, err})
        }

        res.json({
            ok:true,
            productodb
        })


    })
    
    })
//================
//Buscar Productos
//================
app.get('/productos/buscar/:termino',verificaToken,(req,res)=>{
    let termino = req.params.termino;

    let regex = new RegExp(termino,'i');
   
    Producto.find({nombre:regex})
            .populate('categoria','descripcion')
            .exec((err,productos)=>{
                if(err){
                    return res.json({ ok:false, err})
                } 
                
               res.json({
                   ok:true,
                   productos
               }) 

            })





});


module.exports = app;
