const { Schema, model } = require('mongoose');
const { typeOrdSalida } = require('../types/typeOrdSalida');
// const CounterModel = require('./counter');

const OrdSalidaSchema = Schema(
  {
    numerosec: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    fechaemision: {
      type: Date,
      default: Date.now,
    },
    fecharetorno: {
      type: Date,
      default: Date.now,
    },
    material: {
      type: String,
      required: true,
    },
    motivo: {
      type: String,
      required: true,
    },
    estatus: {
      type: String,
      default: typeOrdSalida.SiRetorna,
    },
    destino: {
      type: String,
      required: true,
    },
    departamento: {
      type: Schema.Types.ObjectId,
      ref: 'Departamento',
      required: true,
    },
    solicitante: {
      type: Schema.Types.ObjectId,
      ref: 'Persona',
      required: true,
    },
    transporte: {
      type: Schema.Types.ObjectId,
      ref: 'Vehiculo',
    },
    aprobadoradm: {
      type: Schema.Types.ObjectId,
      ref: 'Persona',
      required: true,
    },
    aprobadorseg: {
      type: Schema.Types.ObjectId,
      ref: 'Persona',
      required: true,
    },
    creador: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    activo: {
      type: Boolean,
      default: true,
    },
    comentario: {
      type: String,
    },
    // comentarios: [
    //   {
    //     fecha: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //     nota: {
    //       type: String,
    //       trim: true,
    //     },
    //     usuario: {
    //       type: Schema.Types.ObjectId,
    //       ref: 'User',
    //     },
    //   },
    // ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

OrdSalidaSchema.method('toJSON', function () {
  const { comentarios, __v, _id, ...object } = this.toObject();
  object.id = _id;

  // object.comentarios = comentarios.map((item) => ({
  //   id: item._id,
  //   fecha: item.fecha,
  //   nota: item.nota,
  //   usuario: item.usuario,
  // }));

  return object;
});

module.exports = model('OrdSalida', OrdSalidaSchema);
