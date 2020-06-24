const fetch = require('node-fetch');
var parser = require('xml2json');
const LOGGER = require('../utils/Logger');
const Logger = require('../utils/Logger');
const Log = new Logger();

const search = (term) => {
    return fetch(`http://suggestqueries.google.com/complete/search?output=toolbar&gl=us&hl=en&q=${term}+vs`)
        .then(z => z.text())
        .then(parser.toJson)
        .then(JSON.parse)
        .then(result => (result.toplevel.CompleteSuggestion ? (result.toplevel.CompleteSuggestion instanceof Array ? result.toplevel.CompleteSuggestion : [result.toplevel.CompleteSuggestion]) : []).map(z => z.suggestion.data).map(z => z.split(' vs ')).filter(z => z.length > 1).map(z => z[1]))
}

const buildMap = async (inTerm, inRounds = 5) => {
    const map = {};

    const terms = [{ term: inTerm, round: 0 }];
    const searchedTerms = [];
    let rounds = 0;

    while (terms.length > 0) {
        const { term, round } = terms.pop();

        searchedTerms.push(term);
        const results = await search(term);

        results.forEach((result, idx, arr) => {

            if (searchedTerms.indexOf(result) < 0 && round < inRounds) {
                terms.push({ term: result, round: round + 1 });
            }

            if (!map[term]) {
                map[term] = {};
            }

            map[term][result] = arr.length - idx;
        });
    }

    return map;
}

module.exports = { buildMap }