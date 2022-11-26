
const NFA = require('../NFA');
const char = require("./char")
const Const = require("../Const")

/**
 * Factory function for a single character NFA.
 */
function epsilon(symbol) {
  return new char(Const.EPSILON)
}

// -----------------------------------------------------------------------------
// Test cases

// Your assignment is to implement `char` factory function,
// and make sure all assertions below pass.

const assert = require('assert');

function runTests() {
  const e = epsilon();

  assert.equal(e.inState.accepting, false);
  assert.equal(e.outState.accepting, true);

  assert.equal(e.test(Const.EPSILON), true);
}

if (require.main === module) {
  runTests();
  console.log('All assertions passed!');
}

module.exports = epsilon;