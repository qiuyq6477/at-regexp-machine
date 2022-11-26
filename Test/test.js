
const assert = require('assert');

const Const = require("../RegExp/Const")
const State = require("../RegExp/State")
const NFA = require("../RegExp/NFA")

const char = require("../RegExp/fragments/char");
const epsilon = require("../RegExp/fragments/epsilon");
const concat = require("../RegExp/fragments/concat");
const rep = require("../RegExp/fragments/rep");
const or = require("../RegExp/fragments/or");

function test_char() {
    const a = char('a');

    assert.equal(a.inState.accepting, false);
    assert.equal(a.outState.accepting, true);

    const transitions = a.inState.getTransitionsForSymbol('a');

    assert.equal(transitions.size, 1);
    assert.equal(transitions.has(a.outState), true);

    assert.equal(a.test("a"), true);
    assert.equal(a.test("abc"), false);
}

function test_epsilon() {
    const e = epsilon();

    assert.equal(e.inState.accepting, false);
    assert.equal(e.outState.accepting, true);

    assert.equal(e.test(Const.EPSILON), true);
}

function test_concat() {
    const a = char('a');
    const b = char('b');
    const c = char('c');
    const abc = concat(a, b, c);
    assert.equal(abc.test("abc"), true);
}

function test_rep() {
    const a = char('a');
    const rep_a = rep(a);
    assert.equal(rep_a.test(""), true);
    assert.equal(rep_a.test("a"), true);
    assert.equal(rep_a.test("aa"), true);
    assert.equal(rep_a.test("aaa"), true);
    assert.equal(rep_a.test("bbb"), false);
}


function test_or() {
    const a = char('a');
    const b = char('b');
    const c = char('c');
    const abc = or(a, b, c);
    assert.equal(abc.test("a"), true);
    assert.equal(abc.test("b"), true);
    assert.equal(abc.test("c"), true);
    assert.equal(abc.test("ab"), false);
}

function test_complex() {
    const re = or(
        concat(
            char("x"),
            rep(char("y"))
        ),
        char("z")
      )
      assert.equal(re.test("x"), true);
      assert.equal(re.test("xy"), true);
      assert.equal(re.test("xyy"), true);
      assert.equal(re.test("z"), true);
      assert.equal(re.test("a"), false);
      assert.equal(re.test(""), false);
}

function runTests() {
    test_char();
    test_epsilon();
    test_concat();
    test_rep();
    test_or();
    test_complex();
  
}

if (require.main === module) {
  runTests();
  console.log('All assertions passed!');
}
