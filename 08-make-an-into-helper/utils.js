const filter = predicate => reducer => {
    return (accumulation, value) => {
        if (predicate(value)) return reducer(accumulation, value);
        return accumulation;
    };
};

const map = xf => reducer => {
    return (accumulation, value) => {
        return reducer(accumulation, xf(value));
    };
};

const evenOnly = number => number % 2 === 0;

const doubleTheNumber = number => number * 2;


const doubleMap = map(doubleTheNumber);
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);
const pushReducer = (accumulation, value) => {
  accumulation.push(value);
  return accumulation;
};

console.log([1, 2, 3, 4].reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []));

// compose(f,g)(x) === f(g(x));
//
// compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer) ===
// isNot2Filter(isEvenFilter(doubleMap(pushReducer)));

const compose = (...functions) =>
  functions.reduce((accumulation, fn) =>
    (...args) => accumulation(fn(...args)), x => x);

console.log([1, 2, 3, 4].reduce(
  compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer),
  [],
));