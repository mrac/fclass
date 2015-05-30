describe('fc .', function() {


	describe('identity()()', function() {
		
	  it('should return the item', function() {
	    expect(fc.identity()(4)).toEqual(4);
	    expect(fc.identity()('a')).toEqual('a');
	    expect(fc.identity()(true)).toEqual(true);
	    expect(fc.identity()(null)).toEqual(null);
	    expect(fc.identity()({a: 10})).toEqual({a: 10});
	  });
		
	});
	
	
	describe('index()()', function() {
		
	  it('should return the index', function() {
	    expect(fc.index()({a: 1}, 4)).toEqual(4);
	  });
		
	});


	describe('value()()', function() {

	  it('should access object-value by key existence', function() {
		var obj = {a: 10, b: 0, '': 100};
		
		expect(fc.value('a')(obj)).toEqual(10);
		expect(fc.value('b')(obj)).toEqual(0);
		expect(fc.value('')(obj)).toEqual(100);
		expect(fc.value('w')(obj)).toEqual(null);

		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

		// map() will map values by existing keys
		expect(arr.map(fc.value('a'))).toEqual([10, 7, 10, null, null]);
		// filter() will filter objects by existing keys
		expect(arr.filter(fc.value('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}]);
		
		// map() will include a falsy value  (falsy key doesn't matter)
		expect(arr.map(fc.value(''))).toEqual([null, null, null, 3, 0]);
		// filter() will exclude objects with a falsy value  (falsy key doesn't matter)
		expect(arr.filter(fc.value(''))).toEqual([{w: 10, '': 3}]);

	  });


	  it('should access object-value by key-value existence', function() {
		var obj = {a: 10, b: 0, '': 100};
		
		expect(fc.value('a', 10)(obj)).toEqual(10);
		expect(fc.value('b', 0)(obj)).toEqual(0);
		expect(fc.value('', 100)(obj)).toEqual(100);
		expect(fc.value('a', 5)(obj)).toEqual(null);
		expect(fc.value('b', 10)(obj)).toEqual(null);
		expect(fc.value('a', 0)(obj)).toEqual(null);
		expect(fc.value('', 0)(obj)).toEqual(null);
		expect(fc.value('', 10)(obj)).toEqual(null);
		expect(fc.value('w', 1)(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

		// map() will map values by existing key-value pairs
		expect(arr.map(fc.value('a', 10))).toEqual([10, null, 10, null, null]);
		// filter() will filter objects by existing keys-value pairs
		expect(arr.filter(fc.value('a', 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
		
	    // map() will include a falsy value
		expect(arr.map(fc.value('', 3))).toEqual([null, null, null, 3, null]);
		// filter() will exclude only objects with a falsy value - here it's not falsy
		expect(arr.filter(fc.value('', 3))).toEqual([{w: 10, '': 3}]);
		// map() will include a falsy value (falsy key doesn't matter)
		expect(arr.map(fc.value('', 0))).toEqual([null, null, null, null, 0]);
		// but filter() will exclude objects with a falsy value (falsy key doesn't matter)
		expect(arr.filter(fc.value('', 0))).toEqual([]);

	  });


	  it('should access object-value by value existence', function() {
		var obj = {a: 10, b: 0, '': 100};

		expect(fc.value(null, 10)(obj)).toEqual(10);
		expect(fc.value(null, 0)(obj)).toEqual(0);
		expect(fc.value(null, 100)(obj)).toEqual(100);
		expect(fc.value(null, 7)(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

		// map() will map existing values
		expect(arr.map(fc.value(null, 10))).toEqual([10, null, 10, 10, null]);
		// filter() will filter objects by existing values
		expect(arr.filter(fc.value(null, 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}, {w: 10, '': 3}]);
		
		// map() will include a falsy value
		expect(arr.map(fc.value(null, 0))).toEqual([null, 0, null, null, 0]);
		// but filter() will exclude objects with a falsy value
		expect(arr.filter(fc.value(null, 0))).toEqual([]);

	  });

	});


	describe('key()()', function() {

	  it('should access object-key by key existence', function() {
		var obj = {a: 10, b: 0, '': 100};
		
		expect(fc.key('a')(obj)).toEqual('a');
		expect(fc.key('b')(obj)).toEqual('b');
		expect(fc.key('')(obj)).toEqual('');
		expect(fc.key('w')(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];
		
		// map() will map existing keys
		expect(arr.map(fc.key('a'))).toEqual(['a', 'a', 'a', null, null]);
		// filter() will filter objects by existing keys
		expect(arr.filter(fc.key('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}]);
		
		// map() will include a falsy key
		expect(arr.map(fc.key(''))).toEqual([null, null, null, '', '']);
		// but filter() will exclude objects with a falsy key
		expect(arr.filter(fc.key(''))).toEqual([]);
	  });


	  it('should access object-key by key-value existence', function() {
		var obj = {a: 10, b: 0, '': 100};
		
		expect(fc.key('a', 10)(obj)).toEqual('a');
		expect(fc.key('b', 0)(obj)).toEqual('b');
		expect(fc.key('', 100)(obj)).toEqual('');
		expect(fc.key('a', 5)(obj)).toEqual(null);
		expect(fc.key('b', 7)(obj)).toEqual(null);
		expect(fc.key('', 1)(obj)).toEqual(null);
		expect(fc.key('w', 1)(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

		// map() will map keys by existing key-value pairs
		expect(arr.map(fc.key('a', 10))).toEqual(['a', null, 'a', null, null]);
		// filter() will filter objects by existing key-value pairs
		expect(arr.filter(fc.key('a', 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
		// map() will map keys by existing key-value pairs (falsy value doesn't matter)
		expect(arr.map(fc.key('b', 0))).toEqual([null, 'b', null, null, null]);
		// filter() will filter objects by existing key-value pairs (falsy value doesn't matter)
		expect(arr.filter(fc.key('b', 0))).toEqual([{a: 7, b: 0}]);

		// map() will include a falsy key
		expect(arr.map(fc.key('', 3))).toEqual([null, null, null, '', null]);
		// but filter() will exclude objects with a falsy key
		expect(arr.filter(fc.key('', 3))).toEqual([]);
		// map() will include a falsy key (falsy value doesn't matter)
		expect(arr.map(fc.key('', 0))).toEqual([null, null, null, null, '']);
		// but filter() will exclude objects with a falsy key (falsy value doesn't matter)
		expect(arr.filter(fc.key('', 0))).toEqual([]);
	  });


	  it('should access object-key by value existence', function() {
		var obj = {a: 10, b: 0, '': 100};
		
		expect(fc.key(null, 10)(obj)).toEqual('a');
		expect(fc.key(null, 0)(obj)).toEqual('b');
		expect(fc.key(null, 100)(obj)).toEqual('');
		expect(fc.key(null, 7)(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];
		
		// map() will map keys by existing values
		expect(arr.map(fc.key(null, 10))).toEqual(['a', null, 'a', 'w', null]);
		// filter() will filter objects by existing values
		expect(arr.filter(fc.key(null, 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}, {w: 10, '': 3}]);

		// map() will include a falsy key
		expect(arr.map(fc.key(null, 0))).toEqual([null, 'b', null, null, '']);
		// but filter() will exclude objects with a falsy key
		expect(arr.filter(fc.key(null, 0))).toEqual([{a: 7, b: 0}]);
	  });

	});


	describe('object()()', function() {

	  it('should access object by key existence', function() {
		var obj = {a: 10, b: 0, '': 100};

		expect(fc.object('a')(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.object('b')(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.object('')(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.object('w')(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];
		
		// map() will map objects by existing keys
		expect(arr.map(fc.object('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, null, null]);
		// filter() will filter objects by existing keys
		expect(arr.filter(fc.object('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}]);

		// map() will map objects by existing keys (falsy key/value doesn't matter)
		expect(arr.map(fc.object(''))).toEqual([null, null, null, {w: 10, '': 3}, {'': 0}]);
		// filter() will filter objects by existing keys (falsy key/value doesn't matter)
		expect(arr.filter(fc.object(''))).toEqual([{w: 10, '': 3}, {'': 0}]);
	  });


	  it('should access object by key-value existence', function() {
		var obj = {a: 10, b: 0, '': 100};

		expect(fc.object('a', 10)(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.object('b', 0)(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.object('', 100)(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.object('a', 0)(obj)).toEqual(null);
		expect(fc.object('b', 10)(obj)).toEqual(null);
		expect(fc.object('w', 1)(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];
		
		// map() will map objects by existing key-value pairs
		expect(arr.map(fc.object('a', 10))).toEqual([{a: 10, b: 5}, null, {a: 10, b: 7}, null, null]);
		// filter() will filter objects by existing key-value pairs
		expect(arr.filter(fc.object('a', 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
		
		// map() will map objects by existing key-value pairs (falsy key/value doesn't matter)
		expect(arr.map(fc.object('', 0))).toEqual([null, null, null, null, {'': 0}]);
		// filter() will filter objects by existing key-value pairs (falsy key/value doesn't matter)
		expect(arr.filter(fc.object('', 0))).toEqual([{'': 0}]);

	  });


	  it('should access object by value existence', function() {
		var obj = {a: 10, b: 0, '': 100};

		expect(fc.object(null, 10)(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.object(null, 0)(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.object(null, 7)(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];
		
		// map() will map objects by existing values
		expect(arr.map(fc.object(null, 10))).toEqual([{a: 10, b: 5}, null, {a: 10, b: 7}, {w: 10, '': 3}, null]);
		// filter() will filter objects by existing values
		expect(arr.filter(fc.object(null, 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}, {w: 10, '': 3}]);
		
		// map() will map objects by existing values (falsy key/value doesn't matter)
		expect(arr.map(fc.object(null, 0))).toEqual([null, {a: 7, b: 0}, null, null, {'': 0}]);
		// filter() will filter objects by existing values (falsy key/value doesn't matter)
		expect(arr.filter(fc.object(null, 0))).toEqual([{a: 7, b: 0}, {'': 0}]);

	  });
	});


	describe('predicate()()', function() {

	  it('should access object by predicate object', function() {
		var obj = {a: 10, b: 0, '': 100};

		expect(fc.predicate({a: 10})(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.predicate({b: 0})(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.predicate({'': 100})(obj)).toEqual({a: 10, b: 0, '': 100});
		expect(fc.predicate({a: 0})(obj)).toEqual(null);
		expect(fc.predicate({b: 10})(obj)).toEqual(null);
		expect(fc.predicate({w: 1})(obj)).toEqual(null);
	
		var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];
		
		// map() will map objects by a predicate
		expect(arr.map(fc.predicate({a: 10}))).toEqual([{a: 10, b: 5}, null, {a: 10, b: 7}, null, null]);
		// filter() will filter objects by a predicate
		expect(arr.filter(fc.predicate({a: 10}))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
		
	  });
	  
	});


	describe('add()()', function() {

	  it('should add numbers or concatenate strings', function() {
		expect(fc.add()(5,3)).toEqual(8);
		expect(fc.add(true)(5,3)).toEqual(-8);
		
		// can be used for reducing
		expect([5,3,4].reduce(fc.add())).toEqual(12);
		expect([5,3,4].reduce(fc.add(true))).toEqual(4);
		expect([5,3,4].reduceRight(fc.add())).toEqual(12);
		expect([5,3,4].reduceRight(fc.add(true))).toEqual(2);
	  });

	});
	
	
	describe('subtract()()', function() {
	
	  it('should subtract numbers', function() {
		expect(fc.subtract()(5,3)).toEqual(2);
		expect(fc.subtract(true)(5,3)).toEqual(-2);
		
		// can be used for reducing
		expect([5,3,4].reduce(fc.subtract())).toEqual(-2);
		expect([5,3,4].reduce(fc.subtract(true))).toEqual(6);
		expect([5,3,4].reduceRight(fc.subtract())).toEqual(-4);
		expect([5,3,4].reduceRight(fc.subtract(true))).toEqual(6);
		
		// can be used as a sorting method for numbers
		expect([50,5,1,11,3].sort(fc.subtract())).toEqual([1,3,5,11,50]);
		expect([50,5,1,11,3].sort(fc.subtract(true))).toEqual([50,11,5,3,1]);
	  });

	});


	describe('stringCompare()()', function() {
	
	  it('should compare strings', function() {
		expect(fc.stringCompare()('10','2')).toEqual(-1);
		expect(fc.stringCompare()('2','10')).toEqual(1);
		expect(fc.stringCompare()('10','10')).toEqual(0);

		// numbers also will be compared as strings
		expect(fc.stringCompare()(10,2)).toEqual(-1);
		expect(fc.stringCompare()(2,10)).toEqual(1);
		expect(fc.stringCompare()(10,10)).toEqual(0);
		
		// can be used for reducing (although I cannot image a good case :)
		expect(['1', '0', '-1'].reduce(fc.stringCompare())).toEqual(1);
		expect(['1', '0', '-1'].reduce(fc.stringCompare(true))).toEqual(0);
		expect(['1', '0', '-1'].reduceRight(fc.stringCompare())).toEqual(-1);
		expect(['1', '0', '-1'].reduceRight(fc.stringCompare(true))).toEqual(0);

		// can be used as a sorting method for strings
		expect(['50', '5', '1', '11', '3'].sort(fc.stringCompare())).toEqual(['1', '11', '3', '5', '50']);
		expect(['50', '5', '1', '11', '3'].sort(fc.stringCompare(true))).toEqual(['50', '5', '3', '11', '1']);
		
		// numbers also will be sorted as strings
		// this is default behaviour of sort() method without any argument
		expect([50,5,1,11,3].sort(fc.stringCompare())).toEqual([1,11,3,5,50]);
		expect([50,5,1,11,3].sort(fc.stringCompare(true))).toEqual([50,5,3,11,1]);

	  });

	});
	
	
	describe('compare()()', function() {
	
	  it('should compare numbers or strings', function() {
		expect(fc.compare()(10,2)).toEqual(1);
		expect(fc.compare()(2,10)).toEqual(-1);
		expect(fc.compare()(10,10)).toEqual(0);

		expect(fc.compare()('10','2')).toEqual(-1);
		expect(fc.compare()('2','10')).toEqual(1);
		expect(fc.compare()('10','10')).toEqual(0);
		
		// can be used for reducing
		expect([1,0,-1].reduce(fc.compare())).toEqual(1);
		expect([1,0,-1].reduce(fc.compare(true))).toEqual(0);
		expect([1,0,-1].reduceRight(fc.compare())).toEqual(-1);
		expect([1,0,-1].reduceRight(fc.compare(true))).toEqual(0);

		// can be used as a sorting method for numbers
		expect([50,5,1,11,3].sort(fc.compare())).toEqual([1,3,5,11,50]);
		expect([50,5,1,11,3].sort(fc.compare(true))).toEqual([50,11,5,3,1]);

		// can be used as a sorting method for strings
		expect(['50', '5', '1', '11', '3'].sort(fc.compare())).toEqual(['1', '11', '3', '5', '50']);
		expect(['50', '5', '1', '11', '3'].sort(fc.compare(true))).toEqual(['50', '5', '3', '11', '1']);
	  });

	});
	
	
	describe('call2()()', function() {
	
	  it('should run prototype methods as 2-argument functions', function() {
	  
	    // only 2 first arguments are taken into account
	    expect(fc.call2(String.prototype.concat)('a', 'b', 'c', 'd')).toEqual('ab');

		// only 2 first arguments are taken, together with additional fixed arguments
	    expect(fc.call2(String.prototype.replace, 'pl')('say', 's', 'ignored', 'ignored')).toEqual('play');
	    
	    // String.prototype.localCompare
		expect(['a', 'd', 'b', 'c'].sort(fc.call2(String.prototype.localeCompare))).toEqual(['a', 'b', 'c', 'd']);

		// Array.prototype.concat
		expect([[1,2,3], [4,5,6], [7,8,9]].reduce(fc.call2(Array.prototype.concat))).toEqual([1,2,3,4,5,6,7,8,9]);

	  });
    });

    
    describe('call1()()', function() {
    
	  it('should run prototype methods as 1-argument functions', function() {
	  
	    // only first argument is taken into account
	    expect(fc.call1(Array.prototype.join)(['a', 'b', 'c'], ['x', 'y', 'z'])).toEqual('a,b,c');
	    
	    // only first argument is taken into account, together with additional fixed arguments
	    expect(fc.call1(Array.prototype.join, '-')(['a', 'b', 'c'], ['x', 'y', 'z'])).toEqual('a-b-c');
	    
		// Array.prototype.sort
		var arr = [[78, 7, 12], [1, 31, 300], [3, 6, 28]];
		arr.forEach(fc.call1(Array.prototype.sort, fc.compare(true)));
		expect(arr).toEqual([[78, 12, 7], [300, 31, 1], [28, 6, 3]]);
		
		// Array.prototype.join
		var arr = [['2015', '01', '30'], ['2014', '06', '17'], ['2008', '12', '21']];
		expect(arr.map(fc.call1(Array.prototype.join, '-'))).toEqual(['2015-01-30', '2014-06-17', '2008-12-21']);
	  });

	});
	
	
	describe('objectCalc()()', function() {
	
	  it('should invoke operations on object properties', function() {
	    var obj1, obj2;
	    
	    // objects with the same keys
	    obj1 = { a: 10, b: 5 };
	    obj2 = { a: 70, b: -40 };
	    expect(fc.objectCalc(fc.add())(obj1, obj2)).toEqual({ a: 80, b: -35 });
	    expect(fc.objectCalc(fc.subtract())(obj1, obj2)).toEqual({ a: -60, b: 45 });

		// non-existing properties by default are calculated as undefined
	    obj1 = { a: 10, b: 5, c: 2 };
	    obj2 = { a: 70, b: -40, d: 10 };
	    expect(fc.objectCalc(fc.add())(obj1, obj2)).toEqual({ a: 80, b: -35, c: NaN, d: NaN });
	    expect(fc.objectCalc(fc.subtract())(obj1, obj2)).toEqual({ a: -60, b: 45, c: NaN, d: NaN });
	    
		// if argument merge=true, non-existing properties are just added to the target object
	    obj1 = { a: 10, b: 5, c: 2 };
	    obj2 = { a: 70, b: -40, d: 10 };
	    expect(fc.objectCalc(fc.add(), true)(obj1, obj2)).toEqual({ a: 80, b: -35, c: 2, d: 10 });
	    expect(fc.objectCalc(fc.subtract(), true)(obj1, obj2)).toEqual({ a: -60, b: 45, c: 2, d: 10 });
	    
	    // default behavior with reduce
	    var arr = [{a: 10, b: 5}, {a: 1, b: -3}, {a: 2, b: 100}];
	    expect(arr.reduce(fc.objectCalc(fc.add()))).toEqual({a: 13, b: 102});
	    expect(arr.reduceRight(fc.objectCalc(fc.add()))).toEqual({a: 13, b: 102});
	    
	    // merge=true with reduce
	    var arr = [{a: 10, b: 5, c: 'x'}, {a: 1, b: -3}, {a: 2, b: 100, w: null}];
	    expect(arr.reduce(fc.objectCalc(fc.add(), true))).toEqual({a: 13, b: 102, c: 'x', w: null});
	    expect(arr.reduceRight(fc.objectCalc(fc.add(), true))).toEqual({a: 13, b: 102, c: 'x', w: null});

	  });
	
	});


	describe('arrayCalc()()', function() {
	
	  it('should invoke operations on array items', function() {
	    var arr1, arr2;
	    
	    // arrays of the same length
	    arr1 = ['one', 'two', 'three'];
	    arr2 = ['01', '02', '03'];
	    expect(fc.arrayCalc(fc.add())(arr1, arr2)).toEqual(['one01', 'two02', 'three03']);

		// non-existing values are calculated by default as undefined
	    arr1 = ['one', 'two', 'three'];
	    arr2 = ['01', '02', '03', '04'];
	    expect(fc.arrayCalc(fc.add())(arr1, arr2)).toEqual(['one01', 'two02', 'three03', 'undefined04']);
	    
		// if argument merge=true, non-existing values are just added to the target object
	    arr1 = ['one', 'two', 'three'];
	    arr2 = ['01', '02', '03', '04'];
	    expect(fc.arrayCalc(fc.add(), true)(arr1, arr2)).toEqual(['one01', 'two02', 'three03', '04']);
	    
	    // default behavior with reduce
	    var arr = [[1,2,3], [5,6,7], [8,9,10]];
	    expect(arr.reduce(fc.arrayCalc(fc.add()))).toEqual([14, 17, 20]);
	    expect(arr.reduceRight(fc.arrayCalc(fc.add()))).toEqual([14, 17, 20]);
	    
	    // merge=true with reduce
	    var arr = [[1,2,3,4], [5,6,7], [8,9,10]];
	    expect(arr.reduce(fc.arrayCalc(fc.add(), true))).toEqual([14, 17, 20, 4]);
	    expect(arr.reduceRight(fc.arrayCalc(fc.add(), true))).toEqual([14, 17, 20, 4]);

	  });
	
	});



});
