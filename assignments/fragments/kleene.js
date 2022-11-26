const NFA = require('../NFA');
const State = require('../State');
const Const = require("../Const")

function rep(fragment) {
    let inState = new State();
    let outState = new State(true);

    inState.addTransitionForSymbol(Const.EPSILON, fragment.inState);
    inState.addTransitionForSymbol(Const.EPSILON, outState);

    fragment.outState.accepting = false;
    fragment.outState.addTransitionForSymbol(Const.EPSILON, outState);

    outState.addTransitionForSymbol(Const.EPSILON, fragment.inState);

    return new NFA(inState, outState);
}

// -----------------------------------------------------------------------------
// Test cases

// Your assignment is to implement `char` factory function,
// and make sure all assertions below pass.

const assert = require('assert');
const char = require("./char")
const epsilon = require("./epsilon");

function runTests() {
    const a = char('a');
    const rep_a = rep(a);
    assert.equal(rep_a.test(""), true);
    assert.equal(rep_a.test("a"), true);
    assert.equal(rep_a.test("aa"), true);
    assert.equal(rep_a.test("aaa"), true);
    assert.equal(rep_a.test("bbb"), false);
}

if (require.main === module) {
    runTests();
    console.log('All assertions passed!');
}

module.exports = epsilon;