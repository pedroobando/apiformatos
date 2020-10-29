/*
  Rutas de Personas
  host + /api/persona
*/
const router = require('express').Router();
const { check } = require('express-validator');

const { fieldValid } = require('../middlewares/fieldValid');
// const { validJWT } = require('../middlewares/validJWT');

const {
  getAll,
  getOne,
  crtEntity,
  delEntity,
} = require('../controllers/imagen.controller');

// router.use(validJWT); // => Todas las rutas validaran el token

router.get('/', getAll);
router.get('/:id', getOne);

router.post(
  '/',
  // [
  //   check('nombre', 'El nombre de la persona es requerido').not().isEmpty(),
  //   check('nombre', 'El nombre debe ser contener minimo 5 caracteres').isLength({
  //     min: 5,
  //   }),
  //   check('dni', 'La identificacón (DNI) de la persona es requerida').not().isEmpty(),
  //   fieldValid,
  // ],
  crtEntity
);

router.delete('/:id', delEntity);

module.exports = router;
