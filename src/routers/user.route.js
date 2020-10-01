/*
  Rutas de Usuarios / Auth
  host + /api/user
*/
const router = require('express').Router();
const { check } = require('express-validator');

const { fieldValid } = require('../middlewares/fieldValid');
const { validJWT } = require('../middlewares/validJWT');

const {
  listUser,
  updateUser,
  deleteUser,
  updateUserpass,
} = require('../controllers/auth.controller');

router.get('/', validJWT, listUser);

router.put(
  '/',
  [
    check('name', 'El name es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    fieldValid,
  ],
  validJWT,
  updateUser
);

router.put(
  '/password',
  [
    check('password', 'El password debe ser minimo 6 caracteres').isLength({ min: 6 }),
    fieldValid,
  ],
  validJWT,
  updateUserpass
);

router.delete('/', validJWT, deleteUser);

module.exports = router;
