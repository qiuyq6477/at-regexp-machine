
const NFA = require('../NFA');
const State = require('../State');

/**
 * Factory function for a single character NFA.
 */
function char(symbol) {
  const inState = new State()
  const outState = new State(true)

  inState.addTransitionForSymbol(symbol, outState)

  return new NFA(inState, outState)
}

// -----------------------------------------------------------------------------
// Test cases

// Your assignment is to implement `char` factory function,
// and make sure all assertions below pass.

const assert = require('assert');

function runTests() {
  const a = char('a');

  assert.equal(a.inState.accepting, false);
  assert.equal(a.outState.accepting, true);

  const transitions = a.inState.getTransitionsForSymbol('a');

  assert.equal(transitions.size, 1);
  assert.equal(transitions.has(a.outState), true);

  assert.equal(a.test("a"), true);
  assert.equal(a.test("abc"), false);
}

if (require.main === module) {
  runTests();
  console.log('All assertions passed!');
}

module.exports = char;