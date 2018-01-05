// reducer :: acc -> value -> acc
const reducer = (accumulation, value) => {
    // returns the new accumulation
    return accumulation + value;
};

const reduce = reducer(10, 5);

const res =      reducer('hello', ' paul')
const resAgain = reducer(res, ' again');

const reduceResult = [1,2,3,4,5].reduce(reducer, 0);

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

const objResult = objReducer(user, {nickname: 'Pauly D'})

const setReducer = (acc, value) => {
    return acc.add(value);
};

const mySet = new Set([1,2,3,4]);
const setResult = setReducer(mySet, 4)

// Output for plunker
console.log(reduce)
console.log(res)
console.log(resAgain)
console.log(reduceResult)
console.log(objResult.nickname)
console.log("mySet:")
for (let [key, value] of setResult.entries()) console.log(value);