const express = require('express');
const { json } = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const { dbConnection } = require('./database/dbcnn');

// initialization
const serve = express();
dotenv.config();

// base de datos
dbConnection();

const thePort = process.env.PORT || 4000;
serve.use(morgan('dev'));

serve.use(cors());
serve.use(helmet());
serve.use(json());

// Rutas
serve.use('/api/auth', require('./routers/auth.route'));
// serve.use('/api/persona', require('./routers/persona'));
// serve.use('/api/vehiculo', require('./routers/vehiculo'));

module.exports = { serve, thePort };
