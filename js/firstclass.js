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
    function stringCompare(negative) {
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
    fc.stringCompare = stringCompare;
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
    function call(fn) {
        return function (a, b) {
            return fn.call(a, b);
        };
    }
    fc.call = call;
})(fc || (fc = {}));
