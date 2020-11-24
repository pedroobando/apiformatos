const mongoose = require('mongoose');

const dbConnection = async () => {
  const cnndb =
    process.env.NODE_ENV === 'DEV' ? process.env.DB_CNN : process.env.DB_CNNPRD;
  try {
    await mongoose.connect(cnndb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('DB Online');
  } catch (error) {
    // console.error(error);
    throw new Error('Error a la hora de incializar DB');
  }
  mongoose.set('useFindAndModify', false);
};

module.exports = { dbConnection };
