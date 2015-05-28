(function() {

  this.property = function(key, value) {
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
