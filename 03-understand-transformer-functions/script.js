const myString = 'hello';

console.log(myString.toUpperCase());

const toUpper = str => str.toUpperCase();

console.log(toUpper(myString));

const shout = str => `${str}!!`;
console.log(shout(myString));

const scream = str => toUpper(shout(str));
shout('hello') === 'hello!!';

console.log(scream(myString));

