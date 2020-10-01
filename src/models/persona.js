const { Schema, model } = require('mongoose');

const PersonaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    dni: {
      type: String,
      required: true,
      index: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    comentario: {
      type: String,
    },
    aprobadorAdm: {
      type: Boolean,
      default: false,
    },
    aprobadorSeg: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('Persona', PersonaSchema);
