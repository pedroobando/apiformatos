const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// UserSchema.method('toJSON', function () {
//   const { __v, _id, ...object } = this.toObject();
//   object.uid = _id;
//   return object;
// });

module.exports = model('User', UserSchema);
