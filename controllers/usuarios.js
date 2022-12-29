

const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs  = require('bcryptjs');


const usuariosGet = async (req = request, res = response) =>{


    const {limite = 3} = req.body;
    const query = {estado:true};

    const [total, usuarios] = await Promise.all([ // permiten que las promesas se ejecuten en simultaneo y no hya bloqueos
        Usuario.countDocuments(query),
        Usuario.find(query)
         .limit(Number(limite))

    ])
    res.json({
        total,
        usuarios
    });
}

const usuariosPost  = async (req, res = response) =>{



    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //ENCRIPTAR LA CONTRASEÑA

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt );
    await usuario.save()

    res.status(201).json({
        msg : 'POST API',
        usuario
    });
}


const usuariosPut = async (req, res = response) =>{
    const {id} = req.params
    const {_id, password, google, correo, ...resto} = req.body;

    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json({
        msg : 'PUT API',
        usuario
    });
}

const usuariosDelete = async (req, res = response) =>{

    const {id} = req.params;
    const uid = req.uid;
  //  const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    const usuarioAutenticado = req.usuario
    res.json({
       usuario,
       usuarioAutenticado,
       uid
    });
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg : 'PATCH API'
    });
}

module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}