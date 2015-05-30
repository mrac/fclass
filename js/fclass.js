var fc;
(function (fc) {
    function identity() {
        return function (e) {
            return e;
        };
    }
    fc.identity = identity;
    function index() {
        return function (e, i) {
            return i;
        };
    }
    fc.index = index;
    function key(key, value) {
        if (typeof key === 'string') {
            if (typeof value !== 'undefined') {
                return function (e) {
                    return e[key] === value ? key : null;
                };
            }
            else {
                return function (e) {
                    return key in e ? key : null;
                };
            }
        }
        else {
            if (typeof value !== 'undefined') {
                return function (e) {
                    var key;
                    var found = Object.keys(e).some(function (k) {
                        key = k;
                        return e[k] === value;
                    });
                    return found ? key : null;
                };
            }
        }
    }
    fc.key = key;
    function value(key, value) {
        if (typeof key === 'string') {
            if (typeof value !== 'undefined') {
                return function (e) {
                    return e[key] === value ? e[key] : null;
                };
            }
            else {
                return function (e) {
                    return key in e ? e[key] : null;
                };
            }
        }
        else {
            if (typeof value !== 'undefined') {
                return function (e) {
                    var key;
                    var found = Object.keys(e).some(function (k) {
                        key = k;
                        return e[k] === value;
                    });
                    return found ? e[key] : null;
                };
            }
        }
    }
    fc.value = value;
    function object(key, value) {
        if (typeof key === 'string') {
            if (typeof value !== 'undefined') {
                return function (e) {
                    return e[key] === value ? e : null;
                };
            }
            else {
                return function (e) {
                    return key in e ? e : null;
                };
            }
            ;
        }
        else {
            if (typeof value !== 'undefined') {
                return function (e) {
                    var key;
                    var found = Object.keys(e).some(function (k) {
                        key = k;
                        return e[k] === value;
                    });
                    return found ? e : null;
                };
            }
        }
    }
    fc.object = object;
    function predicate(obj) {
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
    fc.predicate = predicate;
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
    function call2(fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var params = Array.prototype.slice.call(arguments, 1);
        if (params.length) {
            return function (a, b) {
                return fn.apply(null, [a, b].concat(params));
            };
        }
        else {
            return function (a, b) {
                return fn.call(null, a, b);
            };
        }
    }
    fc.call2 = call2;
    function call1(fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var params = Array.prototype.slice.call(arguments, 1);
        if (params.length) {
            return function (a) {
                return fn.apply(null, [a].concat(params));
            };
        }
        else {
            return function (a) {
                return fn.call(null, a);
            };
        }
    }
    fc.call1 = call1;
    function pcall2(fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var params = Array.prototype.slice.call(arguments, 1);
        if (params.length) {
            return function (a, b) {
                return fn.apply(a, [b].concat(params));
            };
        }
        else {
            return function (a, b) {
                return fn.call(a, b);
            };
        }
    }
    fc.pcall2 = pcall2;
    function pcall1(fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var params = Array.prototype.slice.call(arguments, 1);
        if (params.length) {
            return function (a) {
                return fn.apply(a, params);
            };
        }
        else {
            return function (a) {
                return fn.call(a);
            };
        }
    }
    fc.pcall1 = pcall1;
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
                return JSON.parse(JSON.stringify(source));
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
    function calc(array, calc, fn) {
        var values, calculated, index;
        if (typeof fn === 'function') {
            values = array.map(fn);
            calculated = calc.apply(null, values);
            index = values.indexOf(calculated);
            return array[index];
        }
        else {
            return calc.apply(null, array);
        }
    }
    fc.calc = calc;
})(fc || (fc = {}));
