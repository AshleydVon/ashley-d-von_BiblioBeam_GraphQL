const mongoose = require('mongoose');

// Connect to MongoDB using the URI from the environment variable
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

module.exports = mongoose.connection;
