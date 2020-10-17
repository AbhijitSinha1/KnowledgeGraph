const Term = require("../model/Term");

module.exports.save = async function (word) {
  let term = await Term.findOne({ term: word });

  if (term == null) {
    term = new Term({ term: word, count: 0, firstSearchedOn: new Date() });
  }
  const { count } = term;

  term.count = count + 1;
  term.lastSearchedOn = new Date();
  await term.save();
};
