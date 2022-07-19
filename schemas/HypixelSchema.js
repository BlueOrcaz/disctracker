const mongoose = require('mongoose');

const HypixelSchema = new mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    FirstLogin: mongoose.SchemaTypes.String,
    LastOnline: mongoose.SchemaTypes.String,
    PUsernames: mongoose.SchemaTypes.String,
    NOA: mongoose.SchemaTypes.String,
    UUID: mongoose.SchemaTypes.String
});

module.exports = mongoose.model('HypixelDB', HypixelSchema);
