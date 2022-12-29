const {Router} = require('express');
const {check}  = require('express-validator');
const { crearCategoria, 
        obtenerCategorias,
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router()

//Obtener todas las categorias
router.get('/', obtenerCategorias );

//Obtener una categoria
router.get('/:id', [
  check('id', 'No es un id Mongo valido').isMongoId(),
  check('id'). custom (existeCategoriaPorId),
  validarCampos
],
  obtenerCategoria
);

//Crear una categoria - privado - cualquiera que tengan un web token
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
validarCampos
],
crearCategoria
);

//Modificar una Categoria
router.put('/:id',[
  validarJWT,
  check('nombre', 'El nombre es un campo obligatorio').not().isEmpty(),
  check('id'). custom (existeCategoriaPorId),
  validarCampos

] ,
actualizarCategoria);

//Eliminar una categoria - Admin
router.delete('/:id', [
  validarJWT,
  check('id'). custom (existeCategoriaPorId),
  validarCampos

],
borrarCategoria
);




module.exports = router;