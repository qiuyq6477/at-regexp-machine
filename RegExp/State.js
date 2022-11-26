/**
 * Automata Theory. Building a RegExp machine.
 *
 * Assignment 1: implement FA State class.
 *
 * Video lecture: https://www.youtube.com/watch?v=vGEbvqpNlbc
 *
 * by Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

// -----------------------------------------------------------------------------
const Const = require("./Const")

/**
 * The State class represents a state in a finite automata.
 */
class State {
  constructor(accepting = false) {
    /**
     * Whether this state accepting or not.
     */
    this.accepting = accepting;

    /**
     * Transitions map: key is a transition symbol,
     * value - the Set of destination states for this symbol.
     */
    this.transitionsMap = new Map();
  }

  /**
   * Adds a transition for a symbol.
   */
  addTransitionForSymbol(symbol, state) {
    let states = this.transitionsMap[symbol]
    if(!states){
      states = new Set()
      states.add(state)
      this.transitionsMap[symbol] = states
    }
    else{
      states.add(state)
    }
  }

  /**
   * Returns a list of destination states for this symbol.
   */
  getTransitionsForSymbol(symbol) {
    let list = this.transitionsMap[symbol];
    if (list){
      return list;
    }
    return new Set();
  }


  test(str, visited = new Set()) {
    if(visited.has(this)){
      return false
    }
    visited.add(this);

    if(str.length == 0){
      if(this.accepting){
        return true;
      }

      for(const nextState of this.getTransitionsForSymbol(Const.EPSILON)){
        if(nextState.test("", visited)){
          return true
        }
      }
      return false;
    }


    let symbol = str[0];
    let rest = str.slice(1);
    
    const symbolTransitions = this.getTransitionsForSymbol(symbol)
    for(const nextState of symbolTransitions){
      if(nextState.test(rest)){
        return true
      }
    }

    for(const nextState of this.getTransitionsForSymbol(Const.EPSILON)){
      if(nextState.test(str, visited)){
        return true
      }
    }

    return false;
  }

}

module.exports = State;

// -----------------------------------------------------------------------------
// Test cases

// Your assignment is to implement `addTransitionForSymbol` and
// `getTransitionsForSymbol` methods above, and make sure all
// assertions below pass.

const assert = require('assert');

function runTests() {

  const s1 = new State({accepting: false});
  const s2 = new State({accepting: true});


  // Add transition on character 'a' from state
  // s1 to state s2:
  s1.addTransitionForSymbol('a', s2);

  const transitions = s1.getTransitionsForSymbol('a');

  // There should be only one transition, to the state s2.
  assert.equal(transitions.size, 1);
  assert.equal(transitions.has(s2), true);
}

if (require.main === module) {
  runTests();
  console.log('All assertions passed!');
}
