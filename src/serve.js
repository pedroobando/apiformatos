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

// public router
serve.use(express.static('./public'));

// Rutas
serve.use('/api/auth', require('./routers/auth.route'));
serve.use('/api/user', require('./routers/user.route'));
serve.use('/api/vehiculo', require('./routers/vehiculo.route'));
serve.use('/api/persona', require('./routers/persona.route'));
serve.use('/api/ordsalida', require('./routers/ordSalida.route'));

module.exports = { serve, thePort };
