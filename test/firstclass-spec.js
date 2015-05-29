describe('property()', function() {

  it('should return function for accessing property by key', function() {
    var obj = {a: 10, b: 5};
    expect(property('a')(obj)).toEqual(10);
    expect(property('b')(obj)).toEqual(5);
    expect(property('w')(obj)).toEqual(null);	
    
    var arr = [{a: 10, b: 5}, {a: 7, b: 5}, {a: 10, b: 7}, {w: 100}];
    expect(arr.map(property('a'))).toEqual([10, 7, 10, null]);
    expect(arr.filter(property('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 5}, {a: 10, b: 7}]);
  });

  it('should return function for accessing property by key,value', function() {
    var obj = {a: 10, b: 5};
    expect(property('a', 10)(obj)).toEqual(10);
    expect(property('b', 5)(obj)).toEqual(5);
    expect(property('a', 5)(obj)).toEqual(null);
    expect(property('b', 7)(obj)).toEqual(null);
    expect(property('w', 1)(obj)).toEqual(null);
    
    var arr = [{a: 10, b: 5}, {a: 7, b: 5}, {a: 10, b: 7}, {w: 100}];
    expect(arr.map(property('a', 10))).toEqual([10, null, 10, null]);
    expect(arr.filter(property('a', 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
  });

  it('should return function for accessing property by value', function() {
    var obj = {a: 10, b: 5};
    expect(property(null, 10)(obj)).toEqual(10);
    expect(property(null, 5)(obj)).toEqual(5);
    expect(property(null, 7)(obj)).toEqual(null);
    
    var arr = [{a: 10, b: 5}, {a: 7, b: 5}, {a: 10, b: 7}, {w: 10}];
    expect(arr.map(property(null, 10))).toEqual([10, null, 10, 10]);
    expect(arr.filter(property(null, 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}, {w: 10}]);
  });

});


describe('object()', function() {

  it('should return function for accessing object by key', function() {
    var obj = {a: 10, b: 5};
    expect(object('a')(obj)).toEqual({a: 10, b: 5});
    expect(object('b')(obj)).toEqual({a: 10, b: 5});
    expect(object('w')(obj)).toEqual(null);	
    
    var arr = [{a: 10, b: 5}, {a: 7, b: 5}, {a: 10, b: 7}, {w: 100}];
    expect(arr.map(object('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 5}, {a: 10, b: 7}, null]);
    expect(arr.filter(object('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 5}, {a: 10, b: 7}]);
  });

  it('should return function for accessing object by key,value', function() {
    var obj = {a: 10, b: 5};
    expect(object('a', 10)(obj)).toEqual({a: 10, b: 5});
    expect(object('b', 5)(obj)).toEqual({a: 10, b: 5});
    expect(object('a', 5)(obj)).toEqual(null);
    expect(object('b', 7)(obj)).toEqual(null);
    expect(object('w', 1)(obj)).toEqual(null);
    
    var arr = [{a: 10, b: 5}, {a: 7, b: 5}, {a: 10, b: 7}, {w: 100}];
    expect(arr.map(object('a', 10))).toEqual([{a: 10, b: 5}, null, {a: 10, b: 7}, null]);
    expect(arr.filter(object('a', 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
  });

});
