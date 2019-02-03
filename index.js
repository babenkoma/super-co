'use strict';

/**
 * @module
 * @licence MIT
 * @author Marina Babenko <babenkoma@gmail.com>
 */


/**
 * Super Co function
 * @param generator - generator function or generator
 * @returns {Promise}
 */
function superCo (generator) {
	function isGeneratorFunction (obj) {
		return obj && obj.constructor && (obj.constructor.name === 'GeneratorFunction' || obj.constructor.displayName === 'GeneratorFunction');
	}

	function isGenerator (obj) {
		return obj && typeof obj.next === 'function' && typeof obj.throw === 'function';
	}

	function isPromise (obj) {
		return obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
	}

	function isFunction (obj) {
		return typeof obj === 'function';
	}

	function getArguments (args) {
		let result = null;
		if (args.length > 1) {
			result = [];
			for(let i = 0; i < args.length; i++) {
				result.push(args[i]);
			}
		} else if (args.length === 1) {
			result = args[0];
		}

		return result;
	}

	return new Promise((resolve, reject) => {
		let gen = null;
		if (isGeneratorFunction(generator)) {
			gen = generator();
		} else if (isGenerator(generator)) {
			gen = generator;
		} else {
			resolve(generator);
		}

		function next () {
			let args = getArguments(arguments);
			let item = {};

			try {
				item = gen.next(args);
			} catch (error) {
				reject(error);
			}

			if (!item.done) {
				if (isGeneratorFunction(item.value) || isGenerator(item.value)) {
					superCo(item.value)
					.then(next)
					.catch(reject);
				} else if (isPromise(item.value)) {
					item.value
					.then(next)
					.catch(reject);
				} else if (isFunction(item.value)) {
					try {
						item.value(next);
					} catch (error) {
						reject(error);
					}
				} else {
					next(item.value);
				}
			} else {
				resolve(item.value);
			}
		}

		if (gen) {
			next();
		}
	});
}

/**
 * Exports
 */
module.exports = superCo;
