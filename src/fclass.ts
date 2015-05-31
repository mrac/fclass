module fc {

    type Function1d = (element:any, index?:number, array?:Array<any>) => any;

    type Function2d = (a:any, b:any, index?:number, array?:Array<any>) => any;

    type FunctionI = (...args:any[]) => any;


    export function identity():Function1d {
        return function (e) {
            return e;
        };
    }


    export function index():Function1d {
        return function (e, i) {
            return i;
        };
    }


    export function key(key:string, value?:any):Function1d {
        if (typeof key === 'string') {
            if (typeof value !== 'undefined') {
                return function (e) {
                    return e[key] === value ? key : null;
                };
            } else {
                return function (e) {
                    return key in e ? key : null;
                };
            }
        } else {
            if (typeof value !== 'undefined') {
                return function (e) {
                    var key = "";
                    var found = Object.keys(e).some(function (k) {
                        key = k;
                        return e[k] === value;
                    });
                    return found ? key : null;
                };
            }
        }
    }


    export function value(key:string, value?:any):Function1d {
        if (typeof key === 'string') {
            if (typeof value !== 'undefined') {
                return function (e) {
                    return e[key] === value ? e[key] : null;
                };
            } else {
                return function (e) {
                    return key in e ? e[key] : null;
                };
            }
        } else {
            if (typeof value !== 'undefined') {
                return function (e) {
                    var key = "";
                    var found = Object.keys(e).some(function (k) {
                        key = k;
                        return e[k] === value;
                    });
                    return found ? e[key] : null;
                };
            }
        }
    }


    export function object(key:string, value?:any):Function1d {
        if (typeof key === 'string') {
            if (typeof value !== 'undefined') {
                return function (e) {
                    return e[key] === value ? e : null;
                };
            } else {
                return function (e) {
                    return key in e ? e : null;
                };
            }
        } else {
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


    export function predicate(obj:Object):Function1d {
        return function (e) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (e && (e[key] !== obj[key])) return null;
                }
            }
            return e;
        };
    }


    export function add(negative?:boolean):Function2d {
        return function (a, b) {
            return negative ? -(a + b) : a + b;
        };
    }


    export function subtract(negative?:boolean):Function2d {
        return function (a, b) {
            return negative ? b - a : a - b;
        };
    }


    export function compareString(negative?:boolean):Function2d {
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


    export function compare(negative?:boolean):Function2d {
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


    export function call(dimension:number, fn:Function, ...args:any[]):Function2d {
        if (dimension === 0) {
            return function() {
                return fn.call(null, Array.prototype.slice.call(arguments).concat(args));
            };
        } else if (dimension === 1) {
            return function (a) {
                return fn.apply(null, [a].concat(args));
            };
        } else if (dimension === 2) {
            return function (a, b) {
                return fn.apply(null, [a, b].concat(args));
            };
        }
    }


    export function callp(dimension:number, fn:Function, ...args:any[]):Function2d {
        if (dimension === 0) {
            return function() {
                return fn.apply(arguments, args);
            };
        } else if (dimension === 1) {
            return function (a) {
                return fn.apply(a, args);
            };
        } else if (dimension === 2) {
            return function (a, b) {
                return fn.apply(a, [b].concat(args));
            };
        }
    }


    export function objectCalc(fn:Function2d, merge?:any):Function2d {
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


    export function arrayCalc(fn:Function2d, merge?:boolean):Function2d {
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


    export function clone(deep?:boolean):Function1d {
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


    export function equal(deep?:boolean):Function2d {
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


    export function calc(array:any[], calc:FunctionI, fn?:Function1d):any {
        var values, calculated, index;
        if (typeof fn === 'function') {
            values = array.map(fn);
            calculated = calc.apply(null, values);
            index = values.indexOf(calculated);
            return array[index];
        } else {
            return calc.apply(null, array);
        }
    }


}
