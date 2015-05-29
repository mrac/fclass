
type Function1d = (element: any, index: number, array: Array<any>) => any;


(function () {
  
  this.property = function (key: string, value?: any): Function1d {
    if(key) {
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
  };

  this.object = function (key: string, value?: any): Function1d {
    if(typeof value !== 'undefined') {
	  return function (e) {
		return e[key] === value ? e : null;
      };
    } else {
      return function (e) {
        return key in e ? e : null;
      };
    };
  };

}.call(this));
