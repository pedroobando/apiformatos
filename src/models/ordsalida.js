const { Schema, model } = require('mongoose');

const OrdSalidaSchema = Schema(
  {
    fechaemision: {
      type: Date,
      default: Date.now,
    },
    material: {
      type: String,
      required: true,
    },
    retornara: {
      type: Boolean,
      default: true,
    },
    destino: {
      type: String,
      required: true,
    },
    persona: {
      type: Schema.Types.ObjectId,
      ref: 'Persona',
      required: true,
    },
    vehiculo: {
      type: Schema.Types.ObjectId,
      ref: 'Vehiculo',
    },
    aprobadorAdm: {
      type: Schema.Types.ObjectId,
      ref: 'Persona',
      required: true,
    },
    aprobadorSeg: {
      type: Schema.Types.ObjectId,
      ref: 'Persona',
      required: true,
    },
    comentario: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

OrdSalidaSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model('OrdSalida', OrdSalidaSchema);
