const NFA = require('../NFA');
const Const = require("../Const")


function concatPair(first, second) {
    first.outState.accepting = false;
    second.outState.accepting = true;

    first.outState.addTransitionForSymbol(Const.EPSILON, second.inState);

    return new NFA(first.inState, second.outState);
}



function concat(first, ...rest) {
    for(let fragment of rest){
        first = concatPair(first, fragment);
    }
    return first;
}

// -----------------------------------------------------------------------------
// Test cases

// Your assignment is to implement `char` factory function,
// and make sure all assertions below pass.

const assert = require('assert');
const char = require("./char")
const epsilon = require("./epsilon")

function runTests() {
    const a = char('a');
    const b = char('b');
    const c = char('c');
    const abc = concat(a, b, c);
    assert.equal(abc.test("abc"), true);
}

if (require.main === module) {
    runTests();
    console.log('All assertions passed!');
}

module.exports = epsilon;