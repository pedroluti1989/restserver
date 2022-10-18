

const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs  = require('bcryptjs');
const { validationResult } = require('express-validator');


const usuariosGet = (req = request, res = response) =>{

    const {nombre, edad}= req.query
    res.json({
        msg : 'GET API',
        nombre
    });
}

const usuariosPost  = async (req, res = response) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty){
        return res.status(400).json(errors)
    }

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //VERIFICAR SI EL CORREO EXISTE

    const existeEmail = Usuario.findOne({correo});
    if (existeEmail){
        return res.status(400).json({
            msg: "Ese correo ya esta registrado"
        });
    }

    //ENCRIPTAR LA CONTRASEÑA

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt );
    await usuario.save()

    res.status(201).json({
        msg : 'POST API',
        usuario
    });
}


const usuariosPut = (req, res = response) =>{

    const {id} = req.params
    res.json({
        msg : 'PUT API',
        id
    });
}

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg : 'DELETE API'
    });
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg : 'DELETE API'
    });
}

module.exports = {

    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}