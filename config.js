const mongoose = require("mongoose");
const options = require("argsinput");
const [dbhost, dbport, database] = ["localhost", 27017, "discover"];

mongoose.connect(`mongodb://${dbhost}:${dbport}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

module.exports = {
  port: options.port || 3000,
};
