const jwt = require('jsonwebtoken');


//===================
//Verificar token
//===================

let verificaToken = (req,res,next) =>{

    let token = req.get('token');

    jwt.verify( token, process.env.SEED , (err,decoded)=>{
        
        if(err){
            return res.status(401).json({
                ok:false,
                err:{
                    message:'token no valido'
                }
            })
        }
        
        req.usuario = decoded.usuario
        
        next();
    } )
    
    console.log(token);   
};
//===================
//Verificar admin role
//===================
let verificAdminrole = (req,res,next) =>{

    let usuario=req.usuario;
    
    if(usuario.role === "ADMIN_ROLE"){
        next()
    }else {
        
        res.json({
            ok:false,
            err:{
                message:'El usuario no es administrador'
            }
        });
    }

       

    console.log(usuario.role);
    


}


module.exports={
    verificaToken,
    verificAdminrole
}

