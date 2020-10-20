const { Schema, model } = require('mongoose');

const DepartamentoSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    abreviacion: {
      type: String,
      required: true,
      index: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    nrosalida: {
      type: Number,
      default: 1,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

DepartamentoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Departamento', DepartamentoSchema);
