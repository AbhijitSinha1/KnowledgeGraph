const mongoose = require("mongoose");
const { Schema } = mongoose;

const termSchema = new Schema({
  term: { type: String, required: true, index: { unique: true } },
  result: { type: Object },
  firstSearchedOn: { type: Date, default: new Date() },
  lastSearchedOn: { type: Date, default: new Date() },
  lastCachedOn: { type: Date, default: new Date() },
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model("terms", termSchema);
