const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PlayerSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true }
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;