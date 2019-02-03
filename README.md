# run
Wrap function for generators for easy writing asynchronous code.
This function is similar to [co](https://github.com/tj/co), but has differences:
- smaller size;
- write on ES6;
- support thunk width callbacks width multiple argument;
- makes it easier to use asynchronous functions

## Install
```
npm i run
```

## Using
```
const run = require('run');
 
run(function* () {
   let data1 = yield 'Any sync data';
   let [param1, param2] = yield thunkFuncExample(3, 4);
   let data3 = yield promiseExample;
   let data4 = yield generatorFuncExample(1);
   let data5 = yield generatorExample;
   let data6 = yield run('Non generator data');
   ...
});
```

## Detail
See [tests](https://github.com/babenkoma/run/blob/master/test/index.js)

## License
MIT
