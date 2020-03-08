'use strict';

require('dotenv').config();

module.exports = {
    connectionString: process.env.MONGODB_CONNECTION_STRING,
    mongooseOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}
