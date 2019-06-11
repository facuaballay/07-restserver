const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let rolesValidos={
    values:['ADMIN_ROLE','USER_ROLE'],
    message:' {VALUE} no es un rol Valido'
}

let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es un campo requerido']
    },
    email:{
        type:String,
        required:[true,'El correo es un campo requerido'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es un campo requerido']
    },
    img:{
        type:String,
        required:false
    },
    role: {
        type:String,
        default:'USER_ROLE',
        enum:rolesValidos
    },//default:'user_role
    estado:{
        type:Boolean,
        default:true
        },//boolean,
    google:{
        type:Boolean,
        default:false
    }//boolean
});
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userobject= user.toObject();
    delete userobject.password;
    return userobject;
}

usuarioSchema.plugin(uniqueValidator,{ message:' {PATH} debe de ser unico ' });

module.exports=mongoose.model('Usuario',usuarioSchema);