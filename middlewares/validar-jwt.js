const {response, request} = require('express')
const Usuario = require("../models/usuario");

const jwt = require('jsonwebtoken')

const validarJWT =  async(req = request, res = response, next) =>{
 
  const token = req.header('x-token');
  console.log(token)
  if (!token){
    return res.status(401).json({
        msg:'No hay un token en la peticion'
    })
  }
  try {

    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);
    
    if (!usuario){
      return res.status(401).json({
        msg:'El usuario no es valido, no existe en la DB'
      })
    }

    if (!usuario.estado){
      return res.status(401).json({
        msg:'El usuario no es valido, es un usuario inactivo (estado = false)'
      })
    }
    req.usuario = usuario;
    req.uid = uid;

    next()
    
  } catch (error) {
    console.log(error)
    return res.status(401).json({
        msg:'El token no es valido'
    })
  }


}

module.exports = {
    validarJWT
}