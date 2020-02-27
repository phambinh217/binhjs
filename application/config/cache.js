'use strict';
require('dotenv').config();

module.exports = {
	driver: process.env.CACHE_DRIVER || 'file'
}
