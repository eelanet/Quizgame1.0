const mongoose = require('mongoose');
const config = require('./config');
const db = mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true });

mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

module.exports = db;