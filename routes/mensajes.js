/*

    Path: /api/mensajes
*/

const {Router} = require('express');
const { obtnerChat } = require('../controllers/mensajes');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:de', validarJWT , obtnerChat);





module.exports = router;