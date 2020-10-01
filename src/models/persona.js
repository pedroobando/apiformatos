const { Schema, model } = require('mongoose');

const UserSchema = Schema(
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
    aprovador: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('Persona', UserSchema);
