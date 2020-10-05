const { Schema, model } = require('mongoose');
const CounterModel = require('./counter');

const OrdSalidaSchema = Schema(
  {
    numerosec: {
      type: Number,
      // default: 0,
    },
    fechaemision: {
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
    retornara: {
      type: Boolean,
      default: true,
    },
    destino: {
      type: String,
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
    creador: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comentarios: [
      {
        fecha: {
          type: Date,
          default: Date.now,
        },
        nota: {
          type: String,
          trim: true,
        },
        usuario: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

OrdSalidaSchema.method('toJSON', function () {
  const { comentarios, __v, _id, ...object } = this.toObject();
  object.id = _id;

  object.comentarios = comentarios.map((item) => ({
    id: item._id,
    fecha: item.fecha,
    nota: item.nota,
    usuario: item.usuario,
  }));
  return object;
});

// OrdSalidaSchema.pre('save', (next) => {
//   let doc = this;
//   CounterModel.findOneAndUpdate(
//     { name: 'ordsalida' },
//     { $inc: { seq: 1 } },
//     (error, counter) => {
//       if (!error) {
//         console.log(!error);
//         doc.numerosec = counter.seq;
//       }
//       //   // return next(error);
//       // } else {
//       //   doc.numerosec = counter.seq;
//       //   // console.log(counter.seq);
//       // }
//       next();
//     }
//   );
// });

module.exports = model('OrdSalida', OrdSalidaSchema);
