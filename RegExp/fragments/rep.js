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

module.exports = rep;