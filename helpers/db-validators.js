const { Categoria }= require("../models");
const Role = require("../models/role");
const Usuario = require("../models/usuario");



const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
       throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
  }

  const existeEmail = async (correo = '')=>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }

    }

    const existeUsuarioPorId = async (id)=>{
        const existeUsuario = await Usuario.findById(id);
        if (!existeUsuario){
            throw new Error(`El Usuario con id: ${id} no esta registrado, no existe en la BD`);
        }
    
        }

   const existeCategoriaPorId = async (id)=>{
          const existe = await Categoria.findById(id);
          if (!existe){
              throw new Error(`La Categoria con id: ${id} no esta registrado, no existe en la BD`);
          }
      
          }

module.exports ={
  esRolValido, 
  existeEmail,
  existeUsuarioPorId,
  existeCategoriaPorId
} 