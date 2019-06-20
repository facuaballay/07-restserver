const express = require('express');

let {verificaToken,verificAdminrole} = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

//mostrar todas las categorias
app.get('/categoria',(req,res)=>{

Categoria.find({})
    .sort('descripcion')
    .populate('usuario', 'nombre email role')
    .exec((err,categorias)=>{
    if(err){
        return res.status(400).json({
            ok:false,
            err
        });
    };
    if(!categorias){
        return res.status(400).json({
            ok:false,
            err:{
                message:'El ID no es Correcto'
            }
        });
    };
    res.json({
        ok:true,
        categorias
    })
});


})
//mostrar una  categoria
app.get('/categoria/:id',verificaToken,(req,res)=>{
//categoria.findbyid
let id = req.params.id;

Categoria.findById(id).exec((err,categoria)=>{
    if(err){
        return res.status(400).json({
            ok:false,
            err
        });
    };
    res.json({
        ok:true,
        categoria
    })
});
})
//crea una nueva categoria
app.post('/categoria',verificaToken,(req,res)=>{

let body = req.body;

let categoria = new Categoria({
    descripcion:body.descripcion,
    usuario:req.usuario._id
})
categoria.save((err,categoriadb)=>{

    if(err){
        return res.status(500).json({
            ok:false,
            err
        });
    };

    if(!categoriadb){
        return res.status(400).json({
            ok:false,
            err
        });
    };

    res.json({
        ok:true,
        categoria:categoriadb
    })


})



})
//actualizar categoria
app.put('/categoria/:id',(req,res)=>{
let id = req.params.id;
let body = req.body;
let desCategoria = {
    descripcion:body.descripcion
}

Categoria.findOneAndUpdate(id,desCategoria,{new:true,runValidators:true},(err,categoriadb)=>{

    if(err){
        return res.status(500).json({
            ok:false,
            err
            
        });
    };

    res.json({
        ok:true,
        categoriadb
    
    })
})



})
//borrar categoria
app.delete('/categoria/:id',[verificaToken,verificAdminrole],(req,res)=>{
//solo un administrador puede borrar la categoria
//categoria.findbyidRemove
let id = req.params.id;


Categoria.findByIdAndRemove(id,(err,categoriaborrado)=>{
    if(err){
        return res.status(500).json({
            ok:false,
            err
        });
    };
    if(!categoriaborrado){
        return res.status(400).json({
            ok:false,
            err
        });
    };
    res.json({
        ok:true,
        categoria:categoriaborrado,
        message:'categoriaBorrada'
    })
});

})


module.exports = app;

