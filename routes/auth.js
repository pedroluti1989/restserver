const {Router} = require('express');
const {check}  = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router()


router.post('/login',[
    check('correo', 'El correo no es valido').isEmail(), //middleware
    check('password', 'El password es un campo obligatorio').not().isEmpty(), //middleware
    validarCampos,
  ],
   login);

   router.post('/google',[
    check('id_token', 'El token de google es necesario jaja').not().isEmpty(), //middleware
    validarCampos,
  ],
  googleSignIn);




module.exports = router;