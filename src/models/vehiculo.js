const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    placa: {
      type: String,
      required: true,
      index: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    marca: {
      type: String,
      trim: true,
    },
    modelo: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model('Vehiculo', UserSchema);
