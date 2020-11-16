const {
  Hermodr
} = require('../shared/sources/hermodr-cmd-express');

try {
  const mongoose = require('mongoose');
//dsrpt:dsrpt212020
  mongoose.connect(`mongodb+srv://dsrpt:dsrpt212020@cluster0.tttf9.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} catch (e) {
  Hermodr.error("mongodb.js", "Could not connect to the database");
}