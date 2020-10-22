const mongoose = require("mongoose");
const options = require("argsinput");
const [dbhost, dbport, database] = ["localhost", 27017, "discover"];

mongoose.connect(`mongodb://${dbhost}:${dbport}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

module.exports = {
  cache: {
    expiry: 14 * 24 * 3600 * 000 // 14 days
  },
  port: options.port || 3000,
};
