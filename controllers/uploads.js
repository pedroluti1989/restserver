const { response } = require("express");
const {subirArchivo} = require("../helpers");
const {Usuario, Producto} = require('../models')

const cargarArchivo = async(req, res = response) =>{

    if (!req.files || Object.keys(req.files).length === 0  || !req.files.archivo) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    try{

        const nombre =  await subirArchivo(req.files, undefined, 'imagenes');
        res.json({ nombre });

    }catch(err){
        res.status(400).json({
            err
        })
    }
}

const actualizarImagen = async (req, res = response)=>{

    const {id, coleccion} = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo){
                return res.status(400).json({
                    msg: `NO EXISTE un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
                modelo = await Usuario.findById(id)
                if (!modelo){
                    return res.status(400).json({
                        msg: `NO EXISTE un producto con el id ${id}`
                    })
                }
        break;

        default:
            return res.status(500).json({
                msg: "NO hize esta valkdiacion"
            })
    }

    const nombre =  await subirArchivo(req.files, undefined, coleccion);

    modelo.img = nombre;
    // Actualizo en la base de Mongo
    modelo.save()

    res.json({modelo})


}

module.exports = {
    cargarArchivo,
    actualizarImagen
}