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


});
