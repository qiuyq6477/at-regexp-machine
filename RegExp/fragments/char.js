
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

module.exports = char;