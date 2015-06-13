/// <reference path="es6.d.ts" />
/**
 * fclass
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
var fc;
(function (fc) {
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
    fc.identity = identity;
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
    fc.not = not;
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
    fc.index = index;
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
    fc.index2 = index2;
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
    fc.key = key;
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
    fc.value = value;
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
    fc.object = object;
    function has(obj) {
        return function (e) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (e && (e[key] !== obj[key]))
                        return null;
                }
            }
            return e;
        };
    }
    fc.has = has;
    function invoke(methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return function (e) {
            return e[methodName].apply(e, args);
        };
    }
    fc.invoke = invoke;
    function add(negative) {
        return function (a, b) {
            return negative ? -(a + b) : a + b;
        };
    }
    fc.add = add;
    function subtract(negative) {
        return function (a, b) {
            return negative ? b - a : a - b;
        };
    }
    fc.subtract = subtract;
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
    fc.compareString = compareString;
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
    fc.compare = compare;
    function flip(fn) {
        return function (a, b, index, arr) {
            return fn(b, a, index, arr);
        };
    }
    fc.flip = flip;
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
    fc.partial = partial;
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
    fc.partialP = partialP;
    function curry(arity, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fc.partial.apply(fc, [arity, fn].concat(args));
        };
    }
    fc.curry = curry;
    function curryP(arity, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fc.partialP.apply(fc, [arity, fn].concat(args));
        };
    }
    fc.curryP = curryP;
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
    fc.objectCalc = objectCalc;
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
    fc.arrayCalc = arrayCalc;
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
    fc.clone = clone;
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
    fc.equal = equal;
    function compose12(fn1, fn2) {
        return function (a, b, index, array) {
            return fn2(fn1(a, index, array), fn1(b, index, array), index, array);
        };
    }
    fc.compose12 = compose12;
    function compose11(fn1, fn2) {
        return function (element, index, array) {
            return fn2(fn1(element, index, array), index, array);
        };
    }
    fc.compose11 = compose11;
    function compose21(fn1, fn2) {
        return function (a, b, index, array) {
            return fn2(fn1(a, b, index, array), index, array);
        };
    }
    fc.compose21 = compose21;
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
                index = array.findIndex(fc.identity());
                return (index !== -1) ? array[index] : undefined;
            }
        }
    }
    fc.findValue = findValue;
    function arrayToObject(array, keyFn, reduceFn, reduceInitialValue) {
        var obj = {};
        var argsLen = arguments.length;
        var indeces = {};
        array.forEach(function (e, i, arr) {
            var key = keyFn ? keyFn(e, i, arr) : i;
            if (key || (key === 0) || (key === '')) {
                if (reduceFn) {
                    if (key in obj) {
                        obj[key] = reduceFn(obj[key], e, indeces[key], array);
                        indeces[key]++;
                    }
                    else {
                        if (argsLen >= 4) {
                            obj[key] = reduceFn(reduceInitialValue, e, 0, array);
                        }
                        else {
                            obj[key] = e;
                        }
                        indeces[key] = 1;
                    }
                }
                else {
                    obj[key] = e;
                }
            }
        });
        return obj;
    }
    fc.arrayToObject = arrayToObject;
})(fc || (fc = {}));

//# sourceMappingURL=fclass.js.map