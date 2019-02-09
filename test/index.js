const co = require('../index');

/**
 * Synchronous data example. It may be number, string, object, etc
 */
const syncData = 'Any sync data';

/**
 * Asynchronous function example
 */
function asyncFuncExample (x, y, action, callback) {
	setTimeout(() => {
		let z = null;

		if (action === '+') {
			z = x + y;
		} else if (action === '-') {
			z = x - y;
		}

		if (callback) {
			callback(x + ' ' + action + ' ' + y + ' = ', z);
		}
	}, 0);
}

/**
 * Thunk function example
 */
function thunkFuncExample (x, y, action) {
	return function (callback) {
		asyncFuncExample(x, y, action, callback);
	}
}

/**
 * Promise example
 */
let promiseExample = new Promise((resolve, reject) => {
	try {
		asyncFuncExample(1, 2, '+', (text, result) => {
			resolve(result);
		});
	} catch(error) {
		reject(error);
	}
});

/**
 * Generator function example
 */
function* generatorFuncExample (z) {
	let [text, result] = yield thunkFuncExample(z, 1, '+');
	return result;
}

/**
 * Generator example
 */
let generatorExample = generatorFuncExample(5);


/**
 * Use Super Co function with generator function
 */
co(function* () {
	console.log('Start');

	let data1 = yield syncData;
	console.log('data1:', data1);

	let [text, result] = yield thunkFuncExample(3, 4, '+');
	console.log('data2:', text, result);

	let data3 = yield promiseExample;
	console.log('data3:', data3);

	let data4 = yield generatorFuncExample(1);
	console.log('data4:', data4);

	let data5 = yield generatorExample;
	console.log('data5:', data5);

	let data6 = yield co('Non generator data');
	console.log('data6:', data6);

	yield co.forEach([1, 2, 3], (item) => {
		console.log('data7:', item);
	});

	return 'End';
}).then((result) => {
	console.log('then:', result);
}).catch((error) => {
	console.log('catch:', error);
});
