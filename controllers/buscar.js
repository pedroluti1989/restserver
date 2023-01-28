
const { isValidObjectId } = require("mongoose")
const { Usuario } = require("../models")

const coleccionesExistentes = [
    "usuarios",
    "productos",
    "categorias",
    "roles"
]

const buscarUsuarios = async (termino ='', res=response) =>{
    const esMongoID = isValidObjectId(termino)
    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        res.json({
            results: (usuario)? [usuario]:[]
        })
    }
 
    //busco por busqueda aproximada acorde al Nombre
    const expRegular = RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{nombre:expRegular},{email:expRegular}],
        $and: [{estado:true}],
    })
    res.json({
        results: usuarios
    })
}


const buscar = (req, res =  response) =>{
    
    const {coleccion, termino} = req.params;
    
    if (!coleccionesExistentes.includes(coleccion)){
        return res.status(400).json({
            msg: `No es una coleccion valida, solo se permiten: ${coleccionesExistentes}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)     
        break;
        case 'productos':
            
         break;
        case 'categorias':
            
        break;
    
        default:
            res.status(500).json({
                msg: 'Ocurrio un error al ejecutar la busqueda'
            })
    }

}


module.exports = {
    buscar
}