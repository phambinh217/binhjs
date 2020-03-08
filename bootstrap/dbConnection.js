'use strict';

let mongoose = require('mongoose');
let databaseConfig = require('@/config/database');

mongoose.connect(databaseConfig.connectionString, databaseConfig.mongooseOptions);
