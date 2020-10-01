const { response } = require('express');
const personaModel = require('../models/persona');

const crtEntity = async (req, res = response) => {
  const entity = new personaModel(req.body);
  try {
    const entitySaved = await entity.save();

    return res.status(201).json({
      ok: true,
      data: entitySaved,
    });
  } catch (error) {
    console.log(error);
    const { code, keyValue } = error;
    if (code === 11000) {
      return res.status(400).json({
        ok: false,
        data: { mensaje: `Duplicidad en identificación: ${keyValue.dni}` },
      });
    }

    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const getAll = async (req, res = response) => {
  try {
    const entities = await personaModel.find();

    return res.status(200).json({
      ok: true,
      data: entities,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const getOne = async (req, res = response) => {
  const { id } = req.params;
  try {
    if (id.length <= 10) {
      return res.status(400).json({
        ok: false,
        data: { message: 'Invalido codigo interno de busqueda' },
      });
    }

    const entity = await personaModel.findById(id);
    return res.status(200).json({
      ok: true,
      data: entity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const getByDni = async (req, res = response) => {
  const { dni } = req.params;
  try {
    if (dni.length <= 2) {
      return res.status(404).json({
        ok: false,
        data: { message: 'Invalida identificacion' },
      });
    }

    const entity = await personaModel.findOne({ dni });
    if (!entity) {
      return res.status(404).json({
        ok: false,
        data: { message: `Identificacion ${dni} no localizada` },
      });
    }

    res.status(200).json({
      ok: true,
      data: entity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const updEntity = async (req, res = response) => {
  const personaId = req.params.id;
  try {
    const entityFind = await personaModel.findById(personaId);
    if (!entityFind) {
      return res.status(404).json({
        ok: false,
        data: { message: 'Invalido codigo interno de busqueda' },
      });
    }

    const entity = { ...req.body };
    const entityUpdated = await personaModel.findByIdAndUpdate(personaId, entity, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      data: entityUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

const delEntity = async (req, res = response) => {
  const personaId = req.params.id;
  console.log(personaId);
  if (personaId.length <= 20) {
    return res.status(404).json({
      ok: false,
      data: { message: 'Invalido codigo interno de busqueda' },
    });
  }

  try {
    const entityFind = await personaModel.findById(personaId);
    if (!entityFind) {
      return res.status(404).json({
        ok: false,
        data: { message: 'Invalido codigo interno de busqueda.' },
      });
    }

    await personaModel.findByIdAndDelete(personaId);
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};

module.exports = {
  getAll,
  getOne,
  getByDni,
  crtEntity,
  updEntity,
  delEntity,
};
