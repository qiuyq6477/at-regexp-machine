
const NFA = require('../NFA');
const char = require("./char")
const Const = require("../Const")

/**
 * Factory function for a single character NFA.
 */
function epsilon(symbol) {
  return new char(Const.EPSILON)
}

module.exports = epsilon;