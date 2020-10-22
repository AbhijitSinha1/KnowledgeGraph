const fetch = require("node-fetch");
var parser = require("xml2json");
const Logger = require("clapboard");
const dbs = require("./dbService");
const { cache: { expiry } } = require('../../config');
const Log = new Logger();

const search = (term) => {

    return fetch(
        `http://suggestqueries.google.com/complete/search?output=toolbar&gl=us&hl=en&q=${term}+vs`
    )
        .then((z) => z.text())
        .then(parser.toJson)
        .then(JSON.parse)
        .then((result) =>
            (result.toplevel.CompleteSuggestion
                ? result.toplevel.CompleteSuggestion instanceof Array
                    ? result.toplevel.CompleteSuggestion
                    : [result.toplevel.CompleteSuggestion]
                : []
            )
                .map((z) => z.suggestion.data)
                .map((z) => z.split(" vs "))
                .filter((z) => z.length > 1)
                .map((z) => z[1])
        );
};

const buildMap = async (inTerm) => {
    inTerm = inTerm.toLowerCase();

    const map = {
        [inTerm]: {}
    };

    const term = await dbs.fetch(inTerm);

    if (term == null || Date.now() - term.lastCachedOn > expiry || term.result == null) {

        let results = [];

        try {
            results = await search(inTerm);
        } catch (e) {
            Log.error(e);
        }

        for (let i = 0; i < results.length; i++) {
            const result = results[i].toLowerCase();
            map[inTerm][result] = results.length - i;
        }

        try {
            await dbs.save(inTerm, map[inTerm]);
        } catch (e) {
            Log.error(e);
        }
    } else {
        map[inTerm] = term.result;
    }

    return map;
};

module.exports = { buildMap };
