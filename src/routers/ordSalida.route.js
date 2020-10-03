/*
  Rutas de Personas
  host + /api/persona
*/
const router = require('express').Router();
const { check } = require('express-validator');

const { fieldValid } = require('../middlewares/fieldValid');
const { validJWT } = require('../middlewares/validJWT');

const { getAll, getOne, crtEntity } = require('../controllers/ordSalida.controller');

router.use(validJWT); // => Todas las rutas validaran el token

router.get('/', getAll);
router.get('/:id', getOne);
// router.get('/dni/:dni', getByDni);

router.post(
  '/',
  [
    check('fechaemision', 'La fecha elaboracion es requerida').isDate(),
    check('material', 'El nombre del material o equipo es requerido').not().isEmpty(),
    check('material', 'El material o equipo debe contener minimo 5 caracteres').isLength({
      min: 5,
    }),
    check('destino', 'El destino es requerido del equipo es requerido').not().isEmpty(),
    check('persona', 'Es requerido nombre de la persona responsable').not().isEmpty(),
    check('aprobadorAdm', 'El aprovador administrativo es requerido').not().isEmpty(),
    check('aprobadorSeg', 'El aprovador de seguridad es requerido').not().isEmpty(),
    fieldValid,
  ],
  crtEntity
);

// router.put(
//   '/:id',
//   [
//     check('nombre', 'El nombre de la persona es requerido').not().isEmpty(),
//     check('nombre', 'El nombre debe ser contener minimo 5 caracteres').isLength({
//       min: 5,
//     }),
//     check('dni', 'La identificacón (DNI) de la persona es requerida').not().isEmpty(),
//     fieldValid,
//   ],
//   updEntity
// );

// router.delete('/:id', delEntity);

module.exports = router;
