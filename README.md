# Super Co
Wrap function for generators for easy writing asynchronous code.
This function is similar to [co](https://github.com/tj/co), but has differences:
- smaller size;
- write on ES6;
- support multiple argument in thunk callbacks;
- makes it easier to use

## Install
```
npm i super-co
```

## Using
```
const co = require('super-co');
 
co(function* () {
   let data1 = yield 'Any sync data';
   let [param1, param2] = yield thunkFuncExample(3, 4);
   let data3 = yield promiseExample;
   let data4 = yield generatorFuncExample(1);
   let data5 = yield generatorExample;
   let data6 = yield co('Non generator data');
   ...
});
```

## Detail
See [tests](https://github.com/babenkoma/super-co/blob/master/test/index.js)

## License
MIT
