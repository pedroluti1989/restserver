

const {response, request} = require('express')


const usuariosGet = (req = request, res = response) =>{

    const {nombre, edad}= req.query
    res.json({
        msg : 'GET API',
        nombre
    });
}

const usuariosPost  = (req, res = response) =>{
    const {nombre, edad} = req.body
    res.status(201).json({
        msg : 'POST API',
        nombre,
        edad
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