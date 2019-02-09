# Super Co
Wrap function for generators for easy writing asynchronous code.
This function is similar to [co](https://github.com/tj/co), but has differences:
- smaller size;
- write on ES6;
- support multiple arguments in thunk callbacks;
- easier to use

## Install
```
npm i super-co
```

## Using
```JS
const co = require('super-co');
 
co(function* () {
   let data1 = yield 'Any sync data';
   let [param1, param2] = yield thunkFuncExample(3, 4);
   let data3 = yield promiseExample;
   let data4 = yield generatorFuncExample(1);
   let data5 = yield generatorExample;
   let data6 = yield co('Non generator data');
   yield co.forEach([1, 2, 3], (item) => {
      console.log('data7:', item);
   });
   // ...
});
```

## Argument of co function
generator function or generator

## Methods
### forEach(arr, func) - asynchronous loop which return Promise

- arr - array of elements
- func - function with an element that as its attribute


## Detail
See [tests](https://github.com/babenkoma/super-co/blob/master/test/index.js)

## License
MIT
