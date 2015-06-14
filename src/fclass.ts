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
module FC {


    /**
     * Unary function used in the following JavaScript methods:
     * - Array.prototype.forEach
     * - Array.prototype.map
     * - Array.prototype.filter
     * - Array.prototype.some
     * - Array.prototype.every
     * - Array.prototype.find
     * - Array.prototype.findIndex
     */
    type Function1 = (element:any, index?:number|string, array?:Array<any>|Object) => any;


    /**
     * Binary function used in the following JavaScript methods:
     * - Array.prototype.reduce
     * - Array.prototype.reduceRight
     */
    type Function2 = (result:any, element:any, index?:number|string, array?:Array<any>|Object) => any;


    /**
     * A function of variant arity.
     */
    type FunctionV = (...args:any[]) => any;


    /**
     * Array iterator function.
     */
    type ArrayIterator = (predicate:Function1, context?:any[]) => any;


    /**
     * Iterator function.
     */
    type Iterator = (object:any[]|Object, predicate:Function1, context?:any[]|Object) => any;


    /**
     * Array reducer function.
     */
    type Reducer = (predicate:Function2, initial?:any, context?:any[]|Object) => any;


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
    export function identity(equalTo?:any):Function1 {
        if (arguments.length >= 1) {
            return function (e) {
                return e === equalTo;
            };
        } else {
            return function (e) {
                return e;
            };
        }
    }


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
    export function not(equalTo?:any):Function1 {
        if (arguments.length >= 1) {
            return function (e) {
                return (!e) === equalTo;
            };
        } else {
            return function (e) {
                return !e;
            };
        }
    }


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
    export function index(equalTo?:number):Function1 {
        if (arguments.length >= 1) {
            return function (e, i) {
                return i === equalTo;
            };
        } else {
            return function (e, i) {
                return i;
            };
        }
    }


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
    export function index2(equalTo?:number):Function2 {
        if (arguments.length >= 1) {
            return function (a, b, i) {
                return i === equalTo;
            };
        } else {
            return function (a, b, i) {
                return i;
            };
        }
    }


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
    export function key(key:any, equalTo?:any):Function1 {
        if (typeof key === 'string' || typeof key === 'number') {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    return e[key] === equalTo ? key : null;
                };
            } else {
                return function (e) {
                    return key in Object(e) ? key : null;
                };
            }
        } else {
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
    export function value(key:any, equalTo?:any):Function1 {
        if (typeof key === 'string' || typeof key === 'number') {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    return e[key] === equalTo ? e[key] : null;
                };
            } else {
                return function (e) {
                    return key in Object(e) ? e[key] : null;
                };
            }
        } else {
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
    export function object(key:any, equalTo?:any):Function1 {
        if (typeof key === 'string' || typeof key === 'number') {
            if (typeof equalTo !== 'undefined') {
                return function (e) {
                    return e[key] === equalTo ? e : null;
                };
            } else {
                return function (e) {
                    return key in Object(e) ? e : null;
                };
            }
        } else {
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


    export function has(obj:Object):Function1 {
        return function (e) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (e && (e[key] !== obj[key])) return null;
                }
            }
            return e;
        };
    }


    export function invoke(methodName:string, ...args:any[]):Function1 {
        return function (e) {
            return e[methodName].apply(e, args);
        };
    }


    export function add(negative?:boolean):Function2 {
        return function (a, b) {
            return negative ? -(a + b) : a + b;
        };
    }


    export function subtract(negative?:boolean):Function2 {
        return function (a, b) {
            return negative ? b - a : a - b;
        };
    }


    export function compareString(negative?:boolean):Function2 {
        if (negative) {
            return function (a, b) {
                a += "";
                b += "";
                return a > b ? -1 : (a < b ? 1 : 0);
            };
        } else {
            return function (a, b) {
                a += "";
                b += "";
                return a > b ? 1 : (a < b ? -1 : 0);
            };
        }
    }


    export function compare(negative?:boolean):Function2 {
        if (negative) {
            return function (a, b) {
                return a > b ? -1 : (a < b ? 1 : 0);
            };
        } else {
            return function (a, b) {
                return a > b ? 1 : (a < b ? -1 : 0);
            };
        }
    }


    export function flip(fn:Function2):Function2 {
        return function (a, b, index, arr) {
            return fn(b, a, index, arr);
        };
    }


    export function partial(arity:number, fn:Function2|Function1|FunctionV|Function, ...args:any[]):Function {
        if (arity === null) {
            return function () {
                return fn.call(null, Array.prototype.slice.call(arguments).concat(args));
            };
        } else if (arity === 0) {
            return function () {
                return fn.apply(null, args);
            };
        } else if (arity === 1) {
            return function (a) {
                return fn.apply(null, [a].concat(args));
            };
        } else if (arity === 2) {
            return function (a, b) {
                return fn.apply(null, [a, b].concat(args));
            };
        }
    }


    export function partialP(arity:number, fn:Function2|Function1|FunctionV|Function, ...args:any[]):Function {
        if (arity === null) {
            return function () {
                return fn.apply(arguments, args);
            };
        } else if (arity === 1) {
            return function (a) {
                return fn.apply(a, args);
            };
        } else if (arity === 2) {
            return function (a, b) {
                return fn.apply(a, [b].concat(args));
            };
        }
    }


    export function curry(arity:number, fn:Function2|Function1|FunctionV|Function):Function {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return FC.partial.apply(FC, [arity, fn].concat(args));
        };
    }


    export function curryP(arity:number, fn:Function2|Function1|FunctionV|Function):Function {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return FC.partialP.apply(FC, [arity, fn].concat(args));
        };
    }


    export function objectCalc(fn:Function2, merge?:any):Function2 {
        return function (a, b) {
            var obj = {};

            function addProp(a, b, x, y) {
                Object.keys(x).forEach(function (k) {
                    if (Array.isArray(merge)) {
                        if (merge.indexOf(k) !== -1) {
                            obj[k] = (k in y) ? fn(a[k], b[k]) : x[k];
                        }
                    } else if (merge === true) {
                        obj[k] = (k in y) ? fn(a[k], b[k]) : x[k];
                    } else if (merge === false) {
                        if (k in y) {
                            obj[k] = fn(a[k], b[k]);
                        }
                    } else {
                        obj[k] = fn(a[k], b[k]);
                    }
                });
            }

            addProp(a, b, a, b);
            addProp(a, b, b, a);
            return obj;
        };
    }


    export function arrayCalc(fn:Function2, merge?:boolean):Function2 {
        return function (a, b) {
            var long, short;
            var shortLen = a.length > b.length ? b.length : a.length;
            if (a.length > b.length) {
                long = a;
                short = b;
            } else {
                long = b;
                short = a;
            }
            if (merge === true) {
                return long.map(function (e, i) {
                    return (i < shortLen) ? fn(a[i], b[i]) : long[i];
                });
            } else if (merge === false) {
                return short.map(function (e, i) {
                    return fn(a[i], b[i]);
                });
            } else {
                return long.map(function (e, i) {
                    return fn(a[i], b[i]);
                });
            }
        };
    }


    export function clone(deep?:boolean):Function1 {
        if (deep) {
            return function (source) {
                if (source && (typeof source === 'object')) {
                    return JSON.parse(JSON.stringify(source));
                } else {
                    return source;
                }
            };
        } else {
            return function (source) {
                var target;
                if (source && (typeof source === 'object')) {
                    if (Array.isArray(source)) {
                        target = source.slice();
                    } else {
                        target = {};
                        for (var k in source) {
                            if (source.hasOwnProperty(k)) {
                                target[k] = source[k];
                            }
                        }
                    }
                } else {
                    target = source;
                }
                return target;
            }
        }
    }


    export function equal(deep?:boolean):Function2 {
        if (deep) {
            return function (a, b) {
                if (a && b && (typeof a === 'object') && (typeof b === 'object')) {
                    return JSON.stringify(a) === JSON.stringify(b);
                } else {
                    return a === b;
                }
            };
        } else {
            return function (a, b) {
                return a === b;
            };
        }
    }


    export function compose12(fn1:Function1, fn2:Function2):Function2 {
        return function (a, b, index, array) {
            return fn2(fn1(a, index, array), fn1(b, index, array), index, array);
        };
    }


    export function compose11(fn1:Function1, fn2:Function1):Function1 {
        return function (element, index, array) {
            return fn2(fn1(element, index, array), index, array);
        };
    }


    export function compose21(fn1:Function2, fn2:Function1):Function2 {
        return function (a, b, index, array) {
            return fn2(fn1(a, b, index, array), index, array);
        };
    }


    /**
     * Returns a function that calculates two unary-function results.
     *
     * @param fn    Calculation
     * @returns     Function calculation
     */
    export function functions(fn:Function2):Function2 {
        return function (fn1:Function1, fn2:Function1):Function1 {
            return function (element, index, array) {
                return fn(fn1(element, index, array), fn2(element, index, array));
            };
        };
    }


    /**
     * Combines two unary-function results with 'and' operator.
     *
     * @param fn1   Unary function 1
     * @param fn2   Unary function 2
     * @returns     Unary function which is the combination of the two functions
     */
    export function andFunctions(fn1:Function1, fn2:Function1):Function1 {
        return functions(function (a, b) {
            return a && b;
        })(fn1, fn2);
    }


    export function findValue(array:any[], calc?:FunctionV, fn?:Function1):any {
        var values, found, index;
        if (fn) {
            if (calc) {
                values = array.map(fn);
                found = calc.apply(null, values);
                index = values.indexOf(found);
            } else {
                index = array.findIndex(fn);
            }
            return (index !== -1) ? array[index] : undefined;
        } else {
            if (calc) {
                return calc.apply(null, array);
            } else {
                index = array.findIndex(FC.identity());
                return (index !== -1) ? array[index] : undefined;
            }
        }
    }


    /**
     * Convert an array to an object.
     *
     * @param array                 Array
     * @param keyFn                 Key-name function
     * @param reduceFn              Reduce function
     * @param reduceInitialValue    Reduce initial value
     * @returns                     Object
     */
    export function arrayToObject(array:any[], keyFn?:Function1, reduceFn?:Function2, reduceInitialValue?:any):Object {
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
                    } else {
                        if (argsLen >= 4) {
                            obj[key] = reduceFn(reduceInitialValue, e, 0, array);
                        } else {
                            obj[key] = e;
                        }
                        indices[key] = 1;
                    }
                } else {
                    obj[key] = e;
                }
            }
        });
        return obj;
    }


    /**
     * Convert an object to an array.
     *
     * @param object            Object
     * @param sortPredicateFn   Predicate function for sorting
     * @param sortFn            Sort function
     * @returns                 Array
     */
    export function objectToArray(object:Object, sortPredicateFn?:Function1, sortFn?:Function2):any[] {
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


    /**
     * Converts an array iterator function into an object iterator function.
     *
     * @param arrayIterator     Array iterator
     * @returns                 Object iterator
     */
    export function objectIterator(arrayIterator:ArrayIterator):Iterator {
        return function (object:Object, predicate:Function, context?:any) {
            var keys = Object.keys(object);
            var values = keys.map(function (key) {
                return object[key];
            });
            return arrayIterator.call(values, function (val, i) {
                return predicate.call(context, val, keys[i], object);
            });
        };
    }


    /**
     * Map array items or object properties.
     */
    export function map(object:Object|any[], predicate:Function1, context?:any):any {
        var newObject;
        if (Array.isArray(object)) {
            return Array.prototype.map.call(object, predicate, context);
        } else {
            newObject = {};
            Object.keys(object).forEach(function (key) {
                newObject[key] = predicate.call(context, object[key], key, object);
            });
            return newObject;
        }
    }


    /**
     * Filter array items or object properties.
     */
    export function filter(object:Object|any[], predicate:Function1, context?:any):any {
        var newObject;
        if (Array.isArray(object)) {
            return Array.prototype.filter.call(object, predicate, context);
        } else {
            newObject = {};
            Object.keys(object).forEach(function (key) {
                if (predicate.call(context, object[key], key, object)) {
                    newObject[key] = object[key];
                }
            });
            return newObject;
        }
    }


    /**
     * 'Some' iterator for array items or object properties.
     */
    export function some(object:Object|any[], predicate:Function1, context?:any):any {
        if (Array.isArray(object)) {
            return Array.prototype.some.call(object, predicate, context);
        } else {
            return FC.objectIterator(Array.prototype.some)(object, predicate, context);
        }
    }


    /**
     * 'Every' iterator for array items or object properties.
     */
    export function every(object:Object|any[], predicate:Function1, context?:any):any {
        if (Array.isArray(object)) {
            return Array.prototype.every.call(object, predicate, context);
        } else {
            return FC.objectIterator(Array.prototype.every)(object, predicate, context);
        }
    }


    /**
     * Sort an array by a predicate function.
     */
    export function sort(array:any[], predicateFn?:Function1, sortFn?:Function):any {
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
            } else if (ap < bp) {
                res = -1;
            } else if (ap > bp) {
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


}
