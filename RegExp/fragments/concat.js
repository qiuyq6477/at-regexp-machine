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


module.exports = concat;