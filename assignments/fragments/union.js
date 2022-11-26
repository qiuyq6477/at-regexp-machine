const NFA = require('../NFA');
const State = require('../State');
const Const = require("../Const");


function unionPair(first, second) {
    let inState = new State();
    let outState = new State(true);

    inState.addTransitionForSymbol(Const.EPSILON, first.inState);
    inState.addTransitionForSymbol(Const.EPSILON, second.inState);

    first.outState.accepting = false;
    second.outState.accepting = false;

    first.outState.addTransitionForSymbol(Const.EPSILON, outState);
    second.outState.addTransitionForSymbol(Const.EPSILON, outState);

    return new NFA(inState, outState);
}



function union(first, ...rest) {
    for(let fragment of rest){
        first = unionPair(first, fragment);
    }
    return first;
}

// -----------------------------------------------------------------------------
// Test cases

// Your assignment is to implement `char` factory function,
// and make sure all assertions below pass.

const assert = require('assert');
const char = require("./char");
const epsilon = require("./epsilon");

function runTests() {
    const a = char('a');
    const b = char('b');
    const c = char('c');
    const abc = union(a, b, c);
    assert.equal(abc.test("a"), true);
    assert.equal(abc.test("b"), true);
    assert.equal(abc.test("c"), true);
    assert.equal(abc.test("ab"), false);
}

if (require.main === module) {
    runTests();
    console.log('All assertions passed!');
}

module.exports = epsilon;