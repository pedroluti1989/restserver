const { response } = require("express");
const { body } = require("express-validator");
const { Producto } = require("../models");

const obtenerProductos =  async (req, res) =>{
    const {limite = 3} = req.body;
    const query = {estado:true};

    const [total, productos] = await Promise.all([ // permiten que las promesas se ejecuten en simultaneo y no hya bloqueos
        Producto.countDocuments(query),
        Producto.find(query)
         .limit(Number(limite))

    ])
    res.json({
        total,
        productos
    });
}

const obtenerProducto =  async ( req, res = response) =>{
    const {id} = req.params
    const producto = await Producto.findById(id)
                                   .populate('usuario', 'nombre')
                                   .populate('categoria', 'nombre')
    res.json(producto)
}

const crearProducto = async (req, res = response) =>{
    const nombre = req.body.nombre.toUpperCase()
    const productoBD = Producto.findOne({nombre})
    console.log('Este es el producto que quiero crear',nombre)
  /*
    if(productoBD){
        return res.status(400).json({
            msg: `La Producto ${nombre}, ya existe en la base de datos`

         
        })
    }
    */

    //Generar la info a guardar
    const data = {
        ...req.body,
        nombre: req.body.nombre.toUpperCase(),
        usuario : req.usuario._id,

    }

    // Guardo en db
    const producto = new Producto(data)
    await producto.save()

    res.status(201).json(producto)

}

const actualizarProducto = async (req, res = response) =>{
   
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true})
    

    res.status(201).json(producto)

}

const borrarProducto = async (req, res = response) =>{
  const {id} = req.params;
  const producto = await Producto.findByIdAndUpdate(id, {estado :false}, {new:true})
  res.status(201).json(producto)
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}