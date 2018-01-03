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

const pushReducer = (accumulation, value) => {
    accumulation.push(value);
    return accumulation;
};

const compose = (...functions) =>
    functions.reduce((accumulation, fn) =>
        (...args) => accumulation(fn(...args)), x => x);


const doubleMap = map(doubleTheNumber);
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);

console.log([1, 2, 3, 4].reduce(
  compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer),
  [],
));

const transduce = (xf, reducer, seed, collection) => {
  const transformedReducer = xf(reducer);
  let accumulation = seed;
  for (const value of collection) {
    accumulation = transformedReducer(accumulation, value);
  }

  return accumulation;
}

const toUpper = str => str.toUpperCase();
const isVowel = char => ['a', 'e', 'i', 'o', 'u', 'y'].includes(char.toLowerCase());

console.log(transduce(
  compose(map(toUpper), filter(isVowel)),
  (str, char) => str + char,
  '',
  'adrian',
)); 

const numMap = new Map();
numMap.set('a', 1);
numMap.set('b', 2);
numMap.set('c', 3);
numMap.set('d', 4);

console.log(transduce(
  compose(isNot2Filter, isEvenFilter, doubleMap),
  pushReducer,
  [],
  numMap.values(),
));