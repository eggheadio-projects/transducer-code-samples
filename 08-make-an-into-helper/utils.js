const timeIt = (label, fn) => {
  console.time(label);
  fn();
  console.timeEnd(label);
};

const arrayofRandoms = randomCeil => length =>
  Array.from({length: length}, (v, i) =>
    Math.floor(Math.random() * randomCeil));

const compose = (...functions) =>
    functions.reduce((accumulation, fn) =>
        (...args) => accumulation(fn(...args)), x => x);

const map = xf => reducer => {
    return (accumulation, value) => {
        return reducer(accumulation, xf(value));
    };
};

const filter = predicate => reducer => {
    return (accumulation, value) => {
        if (predicate(value)) return reducer(accumulation, value);
        return accumulation;
    };
};

const evenOnly = number => number % 2 === 0;
const doubleTheNumber = number => number * 2;
const doubleAndEven = compose(map(doubleTheNumber), filter(evenOnly));
const pushReducer = (accumulation, value) => {
    accumulation.push(value);
    return accumulation;
};
const toUpper = str => str.toUpperCase();
const shout = str => `${str}!!`;
const scream = str => toUpper(shout(str));

const arrayReducer = (array, value) => {
    array.push(value);
    return array;
};

const seq = (xf, collection) => {
    if (Array.isArray(collection)) return transduce(xf, arrayReducer, [], collection);
    // and for an object it will be an empty object
    else if (isPlainObject(collection)) return transduce(xf, objectReducer, {}, collection);
    else if (collection['@@transducer/step']) {
        const init = collection['@@transducer/init'] ? collection['@@transducer/init']() : collection.constructor();
        return transduce(xf, collection['@@transducer/step'], init, collection);

    }
    throw new Error('unsupported data type');
};