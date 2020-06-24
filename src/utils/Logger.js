const path = require('path');

// taken from: https://github.com/AbhijitSinha1/JSUtils/blob/master/src/services/Logger.js
module.exports = function () {
    // private variables
    // ------------------------------------------------------------------------
    const contextSize = 25;
  
    // private methods
    // ------------------------------------------------------------------------
    const getTime = function () {
      const now = new Date ();
      const dd = now.getDate ().toString ().padStart (2, '0');
      const MM = (now.getMonth () + 1).toString ().padStart (2, '0');
      const yyyy = now.getFullYear ().toString ().padStart (4, '0');
      const hh = now.getHours ().toString ().padStart (2, '0');
      const mm = now.getMinutes ().toString ().padStart (2, '0');
      const ss = now.getSeconds ().toString ().padStart (2, '0');
      const zzz = now.getMilliseconds ().toString ().padStart (3, '0');
      return `${dd}/${MM}/${yyyy} ${hh}:${mm}:${ss}.${zzz}`;
    };
  
    const stringifyMessageItem = function (item) {
      return item instanceof Object && !(item instanceof Error)
        ? JSON.stringify (item)
        : item instanceof Error ? item.stack : item;
    };
  
    const stringifyMessage = function (args) {
      var str = '';
      for (var a of args) {
        str += stringifyMessageItem (a) + ' ';
      }
      return str;
    };
  
    const formatMessage = function (args) {
      const timeString = getTime ();
      const messageString = stringifyMessage (Object.values (args));
      const info = new Error ().stack.split ('at ')[3].trim ();
      const line = info.split (path.sep)[info.split (path.sep).length - 1].slice (0, -1);
      const lineSplit = line.split (':');
      const fileName = lineSplit[0];
      const lineNum = `${lineSplit[1]}:${lineSplit[2]}`;
      const contextName = `${fileName} ${lineNum}`
        .substr (0, contextSize)
        .toString ()
        .padStart (contextSize);
  
      return `${contextName} | ${timeString} | ${messageString}`;
    };
  
    // public methods
    // ------------------------------------------------------------------------
    this.info = function () {
      console.log (formatMessage (arguments));
    };
    this.warn = function () {
      console.warn (formatMessage (arguments));
    };
    this.error = function () {
      console.error (formatMessage (arguments));
    };
  };