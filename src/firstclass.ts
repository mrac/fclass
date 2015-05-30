
module fc {

  type Function1d = (element: any, index?: number, array?: Array<any>) => any;

  type Function2d = (a: any, b: any, index?: number, array?: Array<any>) => any;


  export function identity(): Function1d {
    return function (e) {
      return e;
    };
  }


  export function index(): Function1d {
    return function (e, i) {
      return i;
    };
  }
  

  export function key(key: string, value?: any): Function1d {
    if(typeof key === 'string') {
      if(typeof value !== 'undefined') {
        return function (e) {
          return e[key] === value ? key : null;
        };
      } else {
        return function (e) {
          return key in e ? key : null;
        };
      }
    } else {
      if(typeof value !== 'undefined') {
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


  export function value(key: string, value?: any): Function1d {
    if(typeof key === 'string') {
      if(typeof value !== 'undefined') {
        return function (e) {
          return e[key] === value ? e[key] : null;
        };
      } else {
        return function (e) {
          return key in e ? e[key] : null;
        };
      }
    } else {
      if(typeof value !== 'undefined') {
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


  export function object(key: string, value?: any): Function1d {
    if(typeof key === 'string') {
      if(typeof value !== 'undefined') {
	    return function (e) {
		  return e[key] === value ? e : null;
        };
      } else {
        return function (e) {
          return key in e ? e : null;
        };
      };
    } else {
      if(typeof value !== 'undefined') {
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
  
  
  export function predicate(obj: Object): Function1d {
    return function (e) {
      for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
          if(e && (e[key] !== obj[key])) return null;
        }
      }
      return e;
    };
  }
  
  
  export function add(negative?: boolean): Function2d {
    return function (a, b) {
      return negative ? -(a+b) : a+b;
    };
  }


  export function subtract(negative?: boolean): Function2d {
    return function (a, b) {
      return negative ? b-a : a-b;
    };
  }
    
  
  export function compareString(negative?: boolean): Function2d {
    if(negative) {
      return function (a, b) {
        a += "";
        b += "";
        return a>b ? -1 : (a<b ? 1 : 0);
      };
    } else {
      return function (a, b) {
        a += "";
        b += "";
        return a>b ? 1 : (a<b ? -1 : 0);
      };
    }
  }


  export function compare(negative?: boolean): Function2d {
    if(negative) {
      return function (a, b) {
        return a>b ? -1 : (a<b ? 1 : 0);
      };
    } else {
      return function (a, b) {
        return a>b ? 1 : (a<b ? -1 : 0);
      };
    }
  }
    
  
  export function call2(fn: Function, ...args: any[]): Function2d {
    var params = Array.prototype.slice.call(arguments, 1);
    if(params.length) {
      return function (a, b) {
        return fn.apply(a, [b].concat(params));
      };
    } else {
      return function (a, b) {
        return fn.call(a, b);
      };
    }
  }
  
  
  export function call1(fn: Function, ...args: any[]): Function1d {
    var params = Array.prototype.slice.call(arguments, 1);
    if(params.length) {
      return function (a) {
        return fn.apply(a, params);
      };
    } else {
      return function (a) {
        return fn.call(a);
      };
    }
  }


  export function objectCalc(fn: Function2d, merge?: boolean): Function2d {
    return function (a,b) {
      var o = {};
      Object.keys(a).forEach(function (k) {
        if(merge && !(k in b)) {
          o[k] = a[k];
        } else {
          o[k] = fn(a[k], b[k]);
        }
      });
      Object.keys(b).forEach(function (k) {
        if(!(k in o)) {
          if(merge && !(k in a)) {
            o[k] = b[k];
          } else {
            o[k] = fn(a[k], b[k]);
          }
        }
      });
      return o;
    };
  };
  
  
  export function arrayCalc(fn: Function2d, merge?: boolean): Function2d {
    return function (a,b) {
      var long = a.length > b.length ? a : b;
      var shortLen = a.length > b.length ? b.length : a.length;
      return long.map(function (e, i) {
        return (!merge || i<shortLen) ? fn(a[i], b[i]) : long[i];
      });
    };
  };

  
}
