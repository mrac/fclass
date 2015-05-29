
module fc {

  type Function1d = (element: any, index: number, array: Array<any>) => any;

  type Function2d = (a: any, b: any, index: number, array: Array<any>) => any;


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
  
  
  export function stringCompare(negative?: boolean): Function2d {
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
  

}
