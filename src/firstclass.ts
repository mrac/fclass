
type Function1d = (element: any, index: number, array: Array<any>) => any;


(function() {
  
  this.property = function(key: string, value?: any): Function1d {
    if(typeof value !== 'undefined') {
      return function(e) {
        return e[key] === value ? e[key] : null;
      };
    } else {
      return function(e) {
        return key in e ? e[key] : null;
      };
    };
  };


}.call(this));
