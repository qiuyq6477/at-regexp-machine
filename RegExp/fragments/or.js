const NFA = require('../NFA');
const State = require('../State');
const Const = require("../Const");


function orPair(first, second) {
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

function or(first, ...rest) {
    for(let fragment of rest){
        first = orPair(first, fragment);
    }
    return first;
}


module.exports = or;