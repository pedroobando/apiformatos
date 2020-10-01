const { response } = require('express');
const bcrypt = require('bcryptjs');

const userModel = require('../models/users');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        ok: false,
        data: {
          message: `Email ${email}, ya esta registrado`,
        },
      });
    }
    user = new userModel(req.body);
    // Encriptar Contrasena
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    return res.status(201).json(await respUserToken(true, user.id, user.name));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      data: {
        message: 'Por favor hable con el administrador',
      },
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        data: {
          message: 'Usuario y password no validos',
        },
      });
    }

    // Compare password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        data: {
          message: 'Usuario y password no validos.',
        },
      });
    }

    return res.status(200).json(await respUserToken(true, user.id, user.name));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      data: {
        message: 'Por favor hable con el administrador',
      },
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  return res.status(200).json(await respUserToken(true, uid, name));
};

const listUser = async (req, res = response) => {
  const { uid, name } = req;
  console.log(uid, name);
  try {
    const Users = await userModel.find();
    if (!Users) {
      return res.status(404).json({
        ok: false,
        data: {
          message: 'Problema en mostrar usuarios',
        },
      });
    } else {
      res.status(200).json({
        ok: true,
        data: [
          ...Users.map((item) => ({
            uid: item.id,
            name: item.name,
            fullname: item.fullname,
            email: item.email,
          })),
        ],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      data: {
        message: 'Por favor hable con el administrador',
      },
    });
  }
};

// bueno esto queda pediente
const updateUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        data: {
          message: 'Usuario y password no validos',
        },
      });
    }

    // Compare password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        data: {
          message: 'Usuario y password no validos.',
        },
      });
    }

    return res.status(200).json(await respUserToken(true, user.id, user.name));
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      data: {
        message: 'Por favor hable con el administrador',
      },
    });
  }
};

const respUserToken = async (ok, uid, name) => {
  // Generar JWT
  return {
    ok,
    data: {
      uid,
      name,
      token: await generarJWT(uid, name),
    },
  };
};

module.exports = { createUser, loginUser, renewToken, listUser };
