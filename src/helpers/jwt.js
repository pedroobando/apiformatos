const jwt = require('jsonwebtoken');

const generarJWT = (uid, name = '', seccion = '', administrador = true) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name, seccion, administrador };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '1h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se logro resolver el token');
        }
        resolve(token);
      }
    );
  });
};

module.exports = { generarJWT };
