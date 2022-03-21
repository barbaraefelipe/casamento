const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.pluralize(null);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.family = require("./family.model")(mongoose);
db.gift = require("./gift.model")(mongoose);

module.exports = db;
