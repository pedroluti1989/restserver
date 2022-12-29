

const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs  = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) =>{

    const {correo, password} = req.body;
    try {

     //EL USUARIO EXISTE
      const usuario = await Usuario.findOne({correo})
      if (!usuario){
          return res.status(400).json({
              msg:'El usuario y/o contraseña son incorrectos - correo'
          })
      }

      // EL USUARIO  ESTA ACTIVO
      if (!usuario.estado){
        return res.status(400).json({
            msg:'El usuario y/o contraseña son incorrectos - estado= false'
        })
      }
      //verificar contraseña

      const passwordValido = bcryptjs.compareSync(password, usuario.password)

      if (!passwordValido){
        return res.status(400).json({
            msg:'El usuario y/o contraseña son incorrectos - password incorrecto'
        })
      }

      // generar JWT

      const token = await generarJWT(usuario.id)

      res.json({
       msg:"LOGIN OK",
       usuario,
       token
      });

  }catch(error){
    console.log(error)
    return res.status(500).json({
        msg:'Ha ocurrido un error, contacto con el administrador'
    })
  }
}

const googleSignIn = async(req, res = response) =>{

  const {id_token} = req.body;

  try {
        const {correo, nombre, img} = await  googleVerify(id_token)

        let usuario =  await Usuario.findOne({correo})
        if(!usuario){
          // Si no esta registrado, creo el usuario
          const data = {
            correo,
            nombre,
            img,
            password: ';P',
            google:true
          }

          usuario = Usuario( data )
          await usuario.save()
        }

        res.json({
          msg:'google sign in ok',
          id_token
        })
    
  }catch(error){
    console.log(error)
    return res.status(500).json({
        msg:'Ha ocurrido un error, contacto con el administrador'
    })
  }

    

}

module.exports = {
  login,
  googleSignIn
}