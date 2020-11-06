const Term = require("../model/Term");

module.exports.fetch = async function (word) {
  let term = await Term.findOne({ term: word });

  if (term != null) {
    const { count } = term;

    term.count = count + 1;
    term.lastSearchedOn = new Date();
    await term.save();
  }

  return term;

}

module.exports.save = async function (word, result) {
  let term = await Term.findOne({ term: word });

  if (term == null) {
    term = new Term({ term: word, count: 1, firstSearchedOn: new Date() });
  }

  term.lastCachedOn = new Date();
  lastSearchedOn = new Date();
  term.result = result;
  await term.save();
};
