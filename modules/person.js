const mongoose = require('../database/mongodb');
const Schema = mongoose.Schema;
const Mixed = mongoose.Schema.Types.Mixed;
const Options = { versionKey: false, strict: false };
module.exports = {
    PersonIncrement: mongoose.model("person_increment", new Schema({ _id: Mixed, value: Mixed }, Options)),
    Person: mongoose.model("person", new Schema({ _id: Mixed, firstname: Mixed, lastname: Mixed }, Options))
}