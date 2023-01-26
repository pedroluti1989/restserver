const {Router} = require('express');
const {check}  = require('express-validator');
const { crearProducto, 
        obtenerProductos,
        obtenerProducto, 
        actualizarProducto, 
        borrarProducto} = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router()

//Obtener todos los productos
router.get('/', obtenerProductos );

//Obtener una Producto
router.get('/:id', [
  check('id', 'No es un id Mongo valido').isMongoId(),
  check('id'). custom (existeProductoPorId),
  validarCampos
],
  obtenerProducto
);

//Crear un producto - privado - cualquiera que tengan un web token
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'La categoria es obligatoria').not().isEmpty(),
validarCampos
],
crearProducto
);

//Modificar un producto
router.put('/:id',[
  validarJWT,
  check('nombre', 'El nombre es un campo obligatorio').not().isEmpty(),
  check('categoria', 'La categoria es un campo obligatorio').not().isEmpty(),
  check('id'). custom (existeProductoPorId),
  validarCampos

] ,
actualizarProducto);

//Eliminar una categoria - Admin
router.delete('/:id', [
  validarJWT,
  check('id'). custom (existeProductoPorId),
  validarCampos

],
borrarProducto
);




module.exports = router;