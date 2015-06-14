/// <reference path="es6.d.ts" />
/*
 * FClass
 *
 * JavaScript utility library that gives support for manipulating
 * JSON data structures by leveraging the functional approach
 * of ECMAScript 5 methods.
 *
 * https://github.com/zalando/fclass
 *
 *
 * LICENSE
 *
 * Copyright © 2015 Zalando SE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/**
 * Main module containing all FClass methods.
 *
 * @preferred
 */
var FC;
(function (FC) {
    /**
     * Returns the identity function
     *
     * `x => x`
     *
     * or comparison function
     *
     * `x => x === equalTo`
     *
     * @param equalTo   If provided, compares and returns the comparison result
     */
    function identity(equalTo) {
        if (arguments.length >= 1) {
            return function (e) {
                return e === equalTo;
            };
        }
        else {
            return function (e) {
                return e;
            };
        }
    }
    FC.identity = identity;
    /**
     * Returns the negating function
     *
     * `x => !x`
     *
     * or comparison function
     *
     * `x => !x === equalTo`
     *
     * @param equalTo   If provided, compares and returns the comparison result
     */
    function not(equalTo) {
        if (arguments.length >= 1) {
            return function (e) {
                return (!e) === equalTo;
            };
        }
        else {
            return function (e) {
                return !e;
            };
        }
    }
    FC.not = not;
    /**
     * Returns the unary function returning the index
     *
     * `x => index`
     *
     * or comparison function
     *
     * `(x, index) => index === equalTo`
     *
     * @param equalTo   If provided, compares and returns the comparison result
     */
    function index(equalTo) {
        if (arguments.length >= 1) {
            return function (e, i) {
                return i === equalTo;
            };
        }
        else {
            return function (e, i) {
                return i;
            };
        }
    }
    FC.index = index;
    /**
     * Returns the binary function returning the index
     *
     * `(x, y) => index`
     *
     * or comparison function
     *
     * `(x, y) => index === equalTo`
     *
     * @param equalTo   If provided, compares and returns the comparison result
     */
    function index2(equalTo) {
        if (arguments.length >= 1) {
            return function (a, b, i) {
                return i === equalTo;
            };
        }
        else {
            return function (a, b, i) {
                return i;
            };
        }
    }
    FC.index2 = index2;
    /**
     * Returns a function returning the key name of the object
     * if the provided property exists,
     * or if the property value is equal to the provided value,
     * or if any property value is equal to the provided value.
     *
     * Otherwise a function will return null.
     *
     * @param key       The property name
     * @param equalTo   If provided, compares the object value instead of checking for existence
     */
    function key(key, equalTo) {
        if (typeof key === 'string' || typeof key === 'number') {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    return e[key] === equalTo ? key : null;
                };
            }
            else {
                return function (e) {
                    return key in Object(e) ? key : null;
                };
            }
        }
        else {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    var key = "";
                    var found = Object.keys(e).some(function (k) {
                        key = k;
                        return e[k] === equalTo;
                    });
                    return found ? key : null;
                };
            }
        }
    }
    FC.key = key;
    /**
     * Returns a function returning the property value of the object
     * if the provided property exists,
     * or if the property value is equal to the provided value,
     * or if any property value is equal to the provided value.
     *
     * Otherwise a function will return null.
     *
     * @param key       The property name
     * @param equalTo   If provided, compares the object value instead of checking for existence
     */
    function value(key, equalTo) {
        if (typeof key === 'string' || typeof key === 'number') {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    return e[key] === equalTo ? e[key] : null;
                };
            }
            else {
                return function (e) {
                    return key in Object(e) ? e[key] : null;
                };
            }
        }
        else {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    var key = "";
                    var found = Object.keys(e).some(function (k) {
                        key = k;
                        return e[k] === equalTo;
                    });
                    return found ? e[key] : null;
                };
            }
        }
    }
    FC.value = value;
    /**
     * Returns a function returning the object
     * if the provided property exists,
     * or if the property value is equal to the provided value,
     * or if any property value is equal to the provided value.
     *
     * Otherwise a function will return null.
     *
     * @param key       The property name
     * @param equalTo   If provided, compares the object value instead of checking for existence
     */
    function object(key, equalTo) {
        if (typeof key === 'string' || typeof key === 'number') {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    return e[key] === equalTo ? e : null;
                };
            }
            else {
                return function (e) {
                    return key in Object(e) ? e : null;
                };
            }
        }
        else {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    var key;
                    var found = Object.keys(e).some(function (k) {
                        key = k;
                        return e[k] === equalTo;
                    });
                    return found ? e : null;
                };
            }
        }
    }
    FC.object = object;
    function has(obj) {
        return function (e) {
            var comparison;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'function') {
                        comparison = obj[key](e[key], key, e);
                    }
                    else {
                        comparison = e[key] === obj[key];
                    }
                    if (e && !comparison)
                        return null;
                }
            }
            return e;
        };
    }
    FC.has = has;
    function invoke(methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return function (e) {
            return e[methodName].apply(e, args);
        };
    }
    FC.invoke = invoke;
    function add(negative) {
        return function (a, b) {
            return negative ? -(a + b) : a + b;
        };
    }
    FC.add = add;
    function subtract(negative) {
        return function (a, b) {
            return negative ? b - a : a - b;
        };
    }
    FC.subtract = subtract;
    function compareString(negative) {
        if (negative) {
            return function (a, b) {
                a += "";
                b += "";
                return a > b ? -1 : (a < b ? 1 : 0);
            };
        }
        else {
            return function (a, b) {
                a += "";
                b += "";
                return a > b ? 1 : (a < b ? -1 : 0);
            };
        }
    }
    FC.compareString = compareString;
    function compare(negative) {
        if (negative) {
            return function (a, b) {
                return a > b ? -1 : (a < b ? 1 : 0);
            };
        }
        else {
            return function (a, b) {
                return a > b ? 1 : (a < b ? -1 : 0);
            };
        }
    }
    FC.compare = compare;
    function flip(fn) {
        return function (a, b, index, arr) {
            return fn(b, a, index, arr);
        };
    }
    FC.flip = flip;
    function partial(arity, fn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (arity === null) {
            return function () {
                return fn.call(null, Array.prototype.slice.call(arguments).concat(args));
            };
        }
        else if (arity === 0) {
            return function () {
                return fn.apply(null, args);
            };
        }
        else if (arity === 1) {
            return function (a) {
                return fn.apply(null, [a].concat(args));
            };
        }
        else if (arity === 2) {
            return function (a, b) {
                return fn.apply(null, [a, b].concat(args));
            };
        }
    }
    FC.partial = partial;
    function partialP(arity, fn) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (arity === null) {
            return function () {
                return fn.apply(arguments, args);
            };
        }
        else if (arity === 1) {
            return function (a) {
                return fn.apply(a, args);
            };
        }
        else if (arity === 2) {
            return function (a, b) {
                return fn.apply(a, [b].concat(args));
            };
        }
    }
    FC.partialP = partialP;
    function curry(arity, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return FC.partial.apply(FC, [arity, fn].concat(args));
        };
    }
    FC.curry = curry;
    function curryP(arity, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return FC.partialP.apply(FC, [arity, fn].concat(args));
        };
    }
    FC.curryP = curryP;
    function objectCalc(fn, merge) {
        return function (a, b) {
            var obj = {};
            function addProp(a, b, x, y) {
                Object.keys(x).forEach(function (k) {
                    if (Array.isArray(merge)) {
                        if (merge.indexOf(k) !== -1) {
                            obj[k] = (k in y) ? fn(a[k], b[k]) : x[k];
                        }
                    }
                    else if (merge === true) {
                        obj[k] = (k in y) ? fn(a[k], b[k]) : x[k];
                    }
                    else if (merge === false) {
                        if (k in y) {
                            obj[k] = fn(a[k], b[k]);
                        }
                    }
                    else {
                        obj[k] = fn(a[k], b[k]);
                    }
                });
            }
            addProp(a, b, a, b);
            addProp(a, b, b, a);
            return obj;
        };
    }
    FC.objectCalc = objectCalc;
    function arrayCalc(fn, merge) {
        return function (a, b) {
            var long, short;
            var shortLen = a.length > b.length ? b.length : a.length;
            if (a.length > b.length) {
                long = a;
                short = b;
            }
            else {
                long = b;
                short = a;
            }
            if (merge === true) {
                return long.map(function (e, i) {
                    return (i < shortLen) ? fn(a[i], b[i]) : long[i];
                });
            }
            else if (merge === false) {
                return short.map(function (e, i) {
                    return fn(a[i], b[i]);
                });
            }
            else {
                return long.map(function (e, i) {
                    return fn(a[i], b[i]);
                });
            }
        };
    }
    FC.arrayCalc = arrayCalc;
    function clone(deep) {
        if (deep) {
            return function (source) {
                if (source && (typeof source === 'object')) {
                    return JSON.parse(JSON.stringify(source));
                }
                else {
                    return source;
                }
            };
        }
        else {
            return function (source) {
                var target;
                if (source && (typeof source === 'object')) {
                    if (Array.isArray(source)) {
                        target = source.slice();
                    }
                    else {
                        target = {};
                        for (var k in source) {
                            if (source.hasOwnProperty(k)) {
                                target[k] = source[k];
                            }
                        }
                    }
                }
                else {
                    target = source;
                }
                return target;
            };
        }
    }
    FC.clone = clone;
    function equal(deep) {
        if (deep) {
            return function (a, b) {
                if (a && b && (typeof a === 'object') && (typeof b === 'object')) {
                    return JSON.stringify(a) === JSON.stringify(b);
                }
                else {
                    return a === b;
                }
            };
        }
        else {
            return function (a, b) {
                return a === b;
            };
        }
    }
    FC.equal = equal;
    function compose12(fn1, fn2) {
        return function (a, b, index, array) {
            return fn2(fn1(a, index, array), fn1(b, index, array), index, array);
        };
    }
    FC.compose12 = compose12;
    function compose(fn1, fn2) {
        return function (element, index, array) {
            return fn2(fn1(element, index, array), index, array);
        };
    }
    FC.compose = compose;
    function compose21(fn1, fn2) {
        return function (a, b, index, array) {
            return fn2(fn1(a, b, index, array), index, array);
        };
    }
    FC.compose21 = compose21;
    /**
     * Returns a function that calculates two unary-function results.
     *
     * @param fn    Calculation
     * @returns     Function calculation
     */
    function functions(fn) {
        return function (fn1, fn2) {
            return function (element, index, array) {
                return fn(fn1(element, index, array), fn2(element, index, array));
            };
        };
    }
    FC.functions = functions;
    /**
     * Combines two unary-function results with 'and' operator.
     *
     * @param fn1   Unary function 1
     * @param fn2   Unary function 2
     * @returns     Unary function which is the combination of the two functions
     */
    function andFunctions(fn1, fn2) {
        return functions(function (a, b) {
            return a && b;
        })(fn1, fn2);
    }
    FC.andFunctions = andFunctions;
    function findValue(array, calc, fn) {
        var values, found, index;
        if (fn) {
            if (calc) {
                values = array.map(fn);
                found = calc.apply(null, values);
                index = values.indexOf(found);
            }
            else {
                index = array.findIndex(fn);
            }
            return (index !== -1) ? array[index] : undefined;
        }
        else {
            if (calc) {
                return calc.apply(null, array);
            }
            else {
                index = array.findIndex(FC.identity());
                return (index !== -1) ? array[index] : undefined;
            }
        }
    }
    FC.findValue = findValue;
    /**
     * Convert an array to an object.
     *
     * @param array                 Array
     * @param keyFn                 Key-name function
     * @param reduceFn              Reduce function
     * @param reduceInitialValue    Reduce initial value
     * @returns                     Object
     */
    function arrayToObject(array, keyFn, reduceFn, reduceInitialValue) {
        var obj = {};
        var argsLen = arguments.length;
        var indices = {};
        array.forEach(function (e, i, arr) {
            var key = keyFn ? keyFn(e, i, arr) : i;
            if (key || (key === 0) || (key === '')) {
                if (reduceFn) {
                    if (key in obj) {
                        obj[key] = reduceFn(obj[key], e, indices[key], array);
                        indices[key]++;
                    }
                    else {
                        if (argsLen >= 4) {
                            obj[key] = reduceFn(reduceInitialValue, e, 0, array);
                        }
                        else {
                            obj[key] = e;
                        }
                        indices[key] = 1;
                    }
                }
                else {
                    obj[key] = e;
                }
            }
        });
        return obj;
    }
    FC.arrayToObject = arrayToObject;
    /**
     * Convert an object to an array.
     *
     * @param object            Object
     * @param sortPredicateFn   Predicate function for sorting
     * @param sortFn            Sort function
     * @returns                 Array
     */
    function objectToArray(object, sortPredicateFn, sortFn) {
        var wrappers = Object.keys(object).map(function (key) {
            return {
                key: key,
                value: object[key]
            };
        });
        var sorted = FC.sort(wrappers, function (wrapper) {
            return sortPredicateFn ? sortPredicateFn(wrapper.value, wrapper.key) : wrapper.key;
        }, sortFn);
        return sorted.map(function (wrapper) {
            return wrapper.value;
        });
    }
    FC.objectToArray = objectToArray;
    /**
     * Converts an array iterator function into an object iterator function.
     *
     * @param arrayIterator     Array iterator
     * @returns                 Object iterator
     */
    function objectIterator(arrayIterator) {
        return function (object, predicate, context) {
            var keys = Object.keys(object);
            var values = keys.map(function (key) {
                return object[key];
            });
            return arrayIterator.call(values, function (val, i) {
                return predicate.call(context, val, keys[i], object);
            });
        };
    }
    FC.objectIterator = objectIterator;
    /**
     * Map array items or object properties.
     */
    function map(object, predicate, context) {
        var newObject;
        if (Array.isArray(object)) {
            return Array.prototype.map.call(object, predicate, context);
        }
        else {
            newObject = {};
            Object.keys(object).forEach(function (key) {
                newObject[key] = predicate.call(context, object[key], key, object);
            });
            return newObject;
        }
    }
    FC.map = map;
    /**
     * Filter array items or object properties.
     */
    function filter(object, predicate, context) {
        var newObject;
        if (Array.isArray(object)) {
            return Array.prototype.filter.call(object, predicate, context);
        }
        else {
            newObject = {};
            Object.keys(object).forEach(function (key) {
                if (predicate.call(context, object[key], key, object)) {
                    newObject[key] = object[key];
                }
            });
            return newObject;
        }
    }
    FC.filter = filter;
    /**
     * 'Some' iterator for array items or object properties.
     */
    function some(object, predicate, context) {
        if (Array.isArray(object)) {
            return Array.prototype.some.call(object, predicate, context);
        }
        else {
            return FC.objectIterator(Array.prototype.some)(object, predicate, context);
        }
    }
    FC.some = some;
    /**
     * 'Every' iterator for array items or object properties.
     */
    function every(object, predicate, context) {
        if (Array.isArray(object)) {
            return Array.prototype.every.call(object, predicate, context);
        }
        else {
            return FC.objectIterator(Array.prototype.every)(object, predicate, context);
        }
    }
    FC.every = every;
    /**
     * Sort an array by a predicate function.
     */
    function sort(array, predicateFn, sortFn) {
        var wrappers = array.map(function (e, i, a) {
            return {
                element: e,
                index: i,
                pre: predicateFn ? predicateFn(e, i, a) : e
            };
        });
        wrappers.sort(function (a, b) {
            var res;
            var ap = a.pre;
            var bp = b.pre;
            if (sortFn) {
                res = sortFn(ap, bp);
            }
            else if (ap < bp) {
                res = -1;
            }
            else if (ap > bp) {
                res = 1;
            }
            if (!res) {
                res = a.index - b.index;
            }
            return res;
        });
        return wrappers.map(function (wrapper) {
            return wrapper.element;
        });
    }
    FC.sort = sort;
})(FC || (FC = {}));

//# sourceMappingURL=fclass.js.map