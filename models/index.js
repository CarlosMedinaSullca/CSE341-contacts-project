const dbconfig = require('../config/db.config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbconfig.url;
db.contacts = require('./contacts.js')(mongoose);



module.exports = db;