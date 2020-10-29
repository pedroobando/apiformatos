const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const ImagenSchema = Schema(
  {
    ordsalida: {
      type: Schema.Types.ObjectId,
      ref: 'Persona',
      required: false,
    },
    fieldname: {
      type: String,
      required: false,
    },
    originalname: {
      type: String,
      required: false,
    },
    encoding: {
      type: String,
      required: false,
    },
    mimetype: {
      type: String,
      required: false,
    },
    destination: {
      type: String,
      required: false,
    },
    filename: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ImagenSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

ImagenSchema.plugin(mongoosePaginate);

module.exports = model('Imagen', ImagenSchema);
