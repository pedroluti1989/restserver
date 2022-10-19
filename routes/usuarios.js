const {Router} = require('express');
const {check}  = require('express-validator')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()


router.get('/', usuariosGet);

router.post('/',[
  check('nombre', 'El Nombre es un campo obligatorio').not().isEmpty(), //middleware
  check('correo', 'El correo no es valido').isEmail(), //middleware
  check('password', 'El password debe contener al menos 6 caracteres').isLength({min:6}), //middleware
 // check('rol', 'El Rol no es Valido').isIn(['ADMIN_ROL', 'USER_ROL']), //middleware
 check('rol'). custom (esRolValido),
 check('correo'). custom (existeEmail),
  validarCampos,
]
,usuariosPost);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id'). custom (existeUsuarioPorId),
    check('rol'). custom (esRolValido),
    validarCampos,
],
 usuariosPut);

 router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id'). custom (existeUsuarioPorId),
    validarCampos,
],
 usuariosDelete);

router.delete('/', usuariosPatch);





module.exports = router;