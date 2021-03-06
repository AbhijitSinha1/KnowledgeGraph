const Term = require("../model/Term");

module.exports.fetch = async function (word) {
  let term = await Term.findOne({ term: word });

  if (term != null) {
    const { count } = term;

    term.count = count + 1;
    term.lastSearchedOn = Date.now();
    await term.save();
  }

  return term;

}

module.exports.save = async function (word, result) {
  let term = await Term.findOne({ term: word });

  if (term == null) {
    term = new Term({ term: word, count: 1, firstSearchedOn: Date.now() });
  }

  term.lastCachedOn = Date.now();
  term.lastSearchedOn = Date.now();
  term.result = result;
  await term.save();
};
