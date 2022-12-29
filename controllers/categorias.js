const { response } = require("express");
const { Categoria } = require("../models");

const obtenerCategorias =  async (req, res) =>{
    const {limite = 3} = req.body;
    const query = {estado:true};

    const [total, categorias] = await Promise.all([ // permiten que las promesas se ejecuten en simultaneo y no hya bloqueos
        Categoria.countDocuments(query),
        Categoria.find(query)
         .limit(Number(limite))

    ])
    res.json({
        total,
        categorias
    });
}

const obtenerCategoria =  async ( req, res = response) =>{
    const {id} = req.params
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre')
    res.json(categoria)
}

const crearCategoria = async (req, res = response) =>{
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = Categoria.findOne({nombre})
    console.log('este es la categoria q quiero crear',nombre)

    if(categoriaDB){
        return res.status(400).json({
            msg: `La Categoria ${nombre}, ya existe`

         
        })
    }

    //Generar la info a guardar
    const data = {
        nombre,
        usuario : req.usuario._id
    }

    // Guardo en db
    const categoria = new Categoria(data)
    await categoria.save()

    res.status(201).json(categoria)

}

const actualizarCategoria = async (req, res = response) =>{
   
    const {id} = req.params;
    const {estado, usuario,...data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true})
    

    res.status(201).json(categoria)

}

const borrarCategoria = async (req, res=response) =>{
  const {id} = req.params;
  const categoria = await Categoria.findByIdAndUpdate(id, {estado :false}, {new:true})
  res.status(201).json(categoria)
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}