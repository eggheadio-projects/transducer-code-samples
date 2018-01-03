
// reducer :: acc -> value -> acc
const reducer = (accumulation, value) => {
    // returns the new accumulation
    return accumulation + value;
};

console.log(reducer(10, 5));

const res = console.log(reducer('hello', ' paul'));
console.log(reducer(res, ' again'));

console.log([1,2,3,4,5].reduce(reducer, 0));

const objReducer = (acc, obj) => {
    return {
        ...acc,
        ...obj,
    }
}

const user = {
    name: 'Paul',
    email: 'paul@test.test',
}

console.log(objReducer(user, {nickname: 'Pauly D'}));

const setReducer = (acc, value) => {
    return acc.add(value);
};

const mySet = new Set([1,2,3,4]);
console.log(setReducer(mySet, 4));