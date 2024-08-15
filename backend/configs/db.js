const mongoose = require('mongoose');
require('dotenv').config();



const connections = mongoose.connect(process.env.MONGO_URL);

module.exports = {
    connections
}