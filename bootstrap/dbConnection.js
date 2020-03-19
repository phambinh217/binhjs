'use strict';

const mongoose = require('mongoose');
const databaseConfig = require('@/config/database');

mongoose.connect(databaseConfig.connectionString, databaseConfig.mongooseOptions);
