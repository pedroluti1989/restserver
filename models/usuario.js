const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema ({
    nombre:{
        type:String,
        required:[true, 'el nombre es obligatorio']

    },
    correo:{
        type:String,
        required:[true, 'el correo es obligatorio'],
        unique:true

    },
    password:{
        type:String,
        required:[true, 'La contraseña es obligatoria']

    },
    img:{
        type:String

    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROL', 'USER_ROL']

    },
    estado:{
        type:Boolean,
        default:true

    },
    google:{
        type:Boolean,
        default:false

    }
})

module.exports = model('Usuario', UsuarioSchema)