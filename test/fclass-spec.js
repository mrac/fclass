describe('fc', function () {


    describe('identity()()', function () {

        it('should return the item', function () {
            expect(fc.identity()(4)).toEqual(4);
            expect(fc.identity()('a')).toEqual('a');
            expect(fc.identity()(true)).toEqual(true);
            expect(fc.identity()(null)).toEqual(null);
            expect(fc.identity()({a: 10})).toEqual({a: 10});
        });

        it('should test if item is equal to provided value', function () {
            expect(fc.identity(4)(4)).toEqual(true);
            expect(fc.identity('a')('a')).toEqual(true);
            expect(fc.identity(true)(true)).toEqual(true);
            expect(fc.identity(null)(null)).toEqual(true);
            var obj = {a: 10};
            expect(fc.identity(obj)(obj)).toEqual(true);

            expect(fc.identity(3)(4)).toEqual(false);
            expect(fc.identity('x')('a')).toEqual(false);
            expect(fc.identity(false)(true)).toEqual(false);
            expect(fc.identity(undefined)(null)).toEqual(false);
            expect(fc.identity({a: 10})({a: 10})).toEqual(false);
        });

    });


    describe('not()()', function () {

        it('should test if item is falsy', function () {
            expect(fc.not()(4)).toEqual(false);
            expect(fc.not()('a')).toEqual(false);
            expect(fc.not()(true)).toEqual(false);
            expect(fc.not()(null)).toEqual(true);
            expect(fc.not()({a: 10})).toEqual(false);
            expect(fc.not()(undefined)).toEqual(true);

            expect(fc.not(true)(4)).toEqual(false);
            expect(fc.not(true)('a')).toEqual(false);
            expect(fc.not(true)(true)).toEqual(false);
            expect(fc.not(true)(null)).toEqual(true);
            expect(fc.not(true)({a: 10})).toEqual(false);
            expect(fc.not(true)(undefined)).toEqual(true);
        });

        it('should test if item is thruthy', function () {
            expect(fc.not(false)(4)).toEqual(true);
            expect(fc.not(false)('a')).toEqual(true);
            expect(fc.not(false)(true)).toEqual(true);
            expect(fc.not(false)(null)).toEqual(false);
            expect(fc.not(false)({a: 10})).toEqual(true);
            expect(fc.not(false)(undefined)).toEqual(false);
        });
    });


    describe('index()()', function () {

        it('should return the index', function () {
            expect(fc.index()({a: 1}, 4)).toEqual(4);
        });

        it('should test if the index is equal to provided number', function () {
            expect(fc.index(4)({a: 1}, 4)).toEqual(true);
            expect(fc.index(1)({a: 1}, 4)).toEqual(false);
        });

    });


    describe('value()()', function () {

        it('should access object-value by key existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(fc.value('a')(obj)).toEqual(10);
            expect(fc.value('b')(obj)).toEqual(0);
            expect(fc.value('')(obj)).toEqual(100);
            expect(fc.value('w')(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            expect(fc.value(0)(arr)).toEqual(arr[0]);
            expect(fc.value(1)(arr)).toEqual(arr[1]);

            // map() will map values by existing keys
            expect(arr.map(fc.value('a'))).toEqual([10, 7, 10, null, null]);
            // filter() will filter objects by existing keys
            expect(arr.filter(fc.value('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}]);

            // map() will include a falsy value  (falsy key doesn't matter)
            expect(arr.map(fc.value(''))).toEqual([null, null, null, 3, 0]);
            // filter() will exclude objects with a falsy value  (falsy key doesn't matter)
            expect(arr.filter(fc.value(''))).toEqual([{w: 10, '': 3}]);

        });


        it('should access object-value by key-value existence', function () {
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


        it('should access object-value by value existence', function () {
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


    describe('key()()', function () {

        it('should access object-key by key existence', function () {
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


        it('should access object-key by key-value existence', function () {
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


        it('should access object-key by value existence', function () {
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


    describe('object()()', function () {

        it('should access object by key existence', function () {
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


        it('should access object by key-value existence', function () {
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
            // find() will find object by existing keys-value pairs
            expect(arr.find(fc.value('a', 10))).toEqual({a: 10, b: 5});
            // findIndex() will find index by existing keys-value pairs
            expect(arr.findIndex(fc.value('a', 10))).toEqual(0);

            // map() will map objects by existing key-value pairs (falsy key/value doesn't matter)
            expect(arr.map(fc.object('', 0))).toEqual([null, null, null, null, {'': 0}]);
            // filter() will filter objects by existing key-value pairs (falsy key/value doesn't matter)
            expect(arr.filter(fc.object('', 0))).toEqual([{'': 0}]);

        });


        it('should access object by value existence', function () {
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


    describe('predicate()()', function () {

        it('should access object by predicate object', function () {
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
            // find() will find object by existing keys-value pairs
            expect(arr.find(fc.predicate({a: 10}))).toEqual({a: 10, b: 5});
            // findIndex() will find index by existing keys-value pairs
            expect(arr.findIndex(fc.predicate({a: 10}))).toEqual(0);

        });

    });


    describe('invoke()()', function () {

        it('should invoke an object method', function () {

            expect(fc.invoke('toFixed')(456.332)).toEqual('456');
            expect(fc.invoke('toFixed', 2)(456.332)).toEqual('456.33');

            var arr = [{a: 10, b: 5}, [1, 2, 3], 108, true, 'text'];

            // used with map()
            expect(arr.map(fc.invoke('toString'))).toEqual(['[object Object]', '1,2,3', '108', 'true', 'text']);

            // used with filter()
            expect(arr.filter(fc.invoke('hasOwnProperty', 'length'))).toEqual([[1, 2, 3], 'text']);

        });

    });


    describe('add()()', function () {

        it('should add numbers or concatenate strings', function () {
            expect(fc.add()(5, 3)).toEqual(8);
            expect(fc.add(true)(5, 3)).toEqual(-8);

            // can be used for reducing
            expect([5, 3, 4].reduce(fc.add())).toEqual(12);
            expect([5, 3, 4].reduce(fc.add(true))).toEqual(4);
            expect([5, 3, 4].reduceRight(fc.add())).toEqual(12);
            expect([5, 3, 4].reduceRight(fc.add(true))).toEqual(2);
        });

    });


    describe('subtract()()', function () {

        it('should subtract numbers', function () {
            expect(fc.subtract()(5, 3)).toEqual(2);
            expect(fc.subtract(true)(5, 3)).toEqual(-2);

            // can be used for reducing
            expect([5, 3, 4].reduce(fc.subtract())).toEqual(-2);
            expect([5, 3, 4].reduce(fc.subtract(true))).toEqual(6);
            expect([5, 3, 4].reduceRight(fc.subtract())).toEqual(-4);
            expect([5, 3, 4].reduceRight(fc.subtract(true))).toEqual(6);

            // can be used as a sorting method for numbers
            expect([50, 5, 1, 11, 3].sort(fc.subtract())).toEqual([1, 3, 5, 11, 50]);
            expect([50, 5, 1, 11, 3].sort(fc.subtract(true))).toEqual([50, 11, 5, 3, 1]);
        });

    });


    describe('compareString()()', function () {

        it('should compare strings', function () {
            expect(fc.compareString()('10', '2')).toEqual(-1);
            expect(fc.compareString()('2', '10')).toEqual(1);
            expect(fc.compareString()('10', '10')).toEqual(0);

            // numbers also will be compared as strings
            expect(fc.compareString()(10, 2)).toEqual(-1);
            expect(fc.compareString()(2, 10)).toEqual(1);
            expect(fc.compareString()(10, 10)).toEqual(0);

            // can be used for reducing (although I cannot image a good case :)
            expect(['1', '0', '-1'].reduce(fc.compareString())).toEqual(1);
            expect(['1', '0', '-1'].reduce(fc.compareString(true))).toEqual(0);
            expect(['1', '0', '-1'].reduceRight(fc.compareString())).toEqual(-1);
            expect(['1', '0', '-1'].reduceRight(fc.compareString(true))).toEqual(0);

            // can be used as a sorting method for strings
            expect(['50', '5', '1', '11', '3'].sort(fc.compareString())).toEqual(['1', '11', '3', '5', '50']);
            expect(['50', '5', '1', '11', '3'].sort(fc.compareString(true))).toEqual(['50', '5', '3', '11', '1']);

            // numbers also will be sorted as strings
            // this is default behaviour of sort() method without any argument
            expect([50, 5, 1, 11, 3].sort(fc.compareString())).toEqual([1, 11, 3, 5, 50]);
            expect([50, 5, 1, 11, 3].sort(fc.compareString(true))).toEqual([50, 5, 3, 11, 1]);

        });

    });


    describe('compare()()', function () {

        it('should compare numbers or strings', function () {
            expect(fc.compare()(10, 2)).toEqual(1);
            expect(fc.compare()(2, 10)).toEqual(-1);
            expect(fc.compare()(10, 10)).toEqual(0);

            expect(fc.compare()('10', '2')).toEqual(-1);
            expect(fc.compare()('2', '10')).toEqual(1);
            expect(fc.compare()('10', '10')).toEqual(0);

            // can be used for reducing
            expect([1, 0, -1].reduce(fc.compare())).toEqual(1);
            expect([1, 0, -1].reduce(fc.compare(true))).toEqual(0);
            expect([1, 0, -1].reduceRight(fc.compare())).toEqual(-1);
            expect([1, 0, -1].reduceRight(fc.compare(true))).toEqual(0);

            // can be used as a sorting method for numbers
            expect([50, 5, 1, 11, 3].sort(fc.compare())).toEqual([1, 3, 5, 11, 50]);
            expect([50, 5, 1, 11, 3].sort(fc.compare(true))).toEqual([50, 11, 5, 3, 1]);

            // can be used as a sorting method for strings
            expect(['50', '5', '1', '11', '3'].sort(fc.compare())).toEqual(['1', '11', '3', '5', '50']);
            expect(['50', '5', '1', '11', '3'].sort(fc.compare(true))).toEqual(['50', '5', '3', '11', '1']);
        });

    });


    describe('partial()()', function () {

        it('should run functions as 2-argument functions', function () {

            var max2;

            // only 2 first arguments are taken into account
            max2 = fc.partial(2, Math.max);
            expect(max2(1, 2, 3, 4)).toEqual(2);

            // only 2 first arguments are taken, together with additional fixed arguments
            max2 = fc.partial(2, Math.max, 10);
            expect(max2(1, 2, 3, 4)).toEqual(10);

            // working with reduce()
            max2 = fc.partial(2, Math.max);
            expect([1, 4, 10, 12, 3].reduce(max2)).toEqual(12);

        });

        it('should run functions as 1-argument functions', function () {

            var pow1;

            // only first argument is taken into account (extra fixed argument provided)
            pow1 = fc.partial(1, Math.pow, 10);
            expect(pow1(2, 4)).toEqual(1024);

            // working with map()
            pow1 = fc.partial(1, Math.pow, 2);
            expect([1, 2, 3, 4, 5, 6].map(pow1)).toEqual([1, 4, 9, 16, 25, 36]);
        });

        it('should run array-argument functions as functions with infinite number of arguments', function () {

            var fn;

            // instead of an array argument, here multiple arguments for items are used
            fn = fc.partial(0, JSON.stringify);
            expect(fn('a', 'b', 'c')).toEqual('["a","b","c"]');

            // instead of an array argument, here multiple arguments for items are used, with extra fixed argument
            fn = fc.partial(0, JSON.stringify, 'd');
            expect(fn('a', 'b', 'c')).toEqual('["a","b","c","d"]');
        });

    });


    describe('partialP()()', function () {

        it('should run prototype methods as 2-argument functions', function () {

            var concat2, replace2, localeCompare2;

            // only 2 first arguments are taken into account
            concat2 = fc.partialP(2, String.prototype.concat);
            expect(concat2('a', 'b', 'ignored', 'ignored')).toEqual('ab');

            // only 2 first arguments are taken, together with additional fixed arguments
            replace2 = fc.partialP(2, String.prototype.replace, 'pl');
            expect(replace2('say', 's', 'ignored', 'ignored')).toEqual('play');

            // working with sort()
            localeCompare2 = fc.partialP(2, String.prototype.localeCompare);
            expect(['a', 'd', 'b', 'c'].sort(localeCompare2)).toEqual(['a', 'b', 'c', 'd']);

            // working with reduce()
            concat2 = fc.partialP(2, Array.prototype.concat);
            expect([[1, 2, 3], [4, 5, 6], [7, 8, 9]].reduce(concat2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        });

        it('should run prototype methods as 1-argument functions', function () {

            var arr, join1, sort1;

            // only first argument is taken into account
            join1 = fc.partialP(1, Array.prototype.join);
            expect(join1(['a', 'b', 'c'], ['ignored', 'ignored', 'ignored'])).toEqual('a,b,c');

            // only first argument is taken into account, together with additional fixed arguments
            join1 = fc.partialP(1, Array.prototype.join, '-');
            expect(join1(['a', 'b', 'c'], ['ignored', 'ignored', 'ignored'])).toEqual('a-b-c');

            // working with forEach()
            sort1 = fc.partialP(1, Array.prototype.sort, fc.compare(true));
            arr = [[78, 7, 12], [1, 31, 300], [3, 6, 28]];
            arr.forEach(sort1);
            expect(arr).toEqual([[78, 12, 7], [300, 31, 1], [28, 6, 3]]);

            // working with map()
            join1 = fc.partialP(1, Array.prototype.join, '-');
            arr = [['2015', '01', '30'], ['2014', '06', '17'], ['2008', '12', '21']];
            expect(arr.map(join1)).toEqual(['2015-01-30', '2014-06-17', '2008-12-21']);
        });

        it('should run array prototype methods as functions with infinite number of arguments', function () {

            var join;

            // instead of array items in the context, here multiple arguments are used
            join = fc.partialP(0, Array.prototype.join);
            expect(join('a', 'b', 'c')).toEqual('a,b,c');

            // instead of array items in the context, here multiple arguments are used, with extra fixed argument
            join = fc.partialP(0, Array.prototype.join, '-');
            expect(join('a', 'b', 'c')).toEqual('a-b-c');
        });
    });


    describe('objectCalc()()', function () {

        it('should invoke operations on object properties', function () {
            var obj1, obj2, arr;

            // objects with the same keys
            obj1 = {a: 10, b: 5};
            obj2 = {a: 70, b: -40};
            expect(fc.objectCalc(fc.add())(obj1, obj2)).toEqual({a: 80, b: -35});
            expect(fc.objectCalc(fc.subtract())(obj1, obj2)).toEqual({a: -60, b: 45});

            // non-existing properties by default are calculated as undefined
            obj1 = {a: 10, b: 5, c: 2};
            obj2 = {a: 70, b: -40, d: 10};
            expect(fc.objectCalc(fc.add())(obj1, obj2)).toEqual({a: 80, b: -35, c: NaN, d: NaN});
            expect(fc.objectCalc(fc.subtract())(obj1, obj2)).toEqual({a: -60, b: 45, c: NaN, d: NaN});

            // if argument merge=true, non-existing properties are just added to the target object
            obj1 = {a: 10, b: 5, c: 2};
            obj2 = {a: 70, b: -40, d: 10};
            expect(fc.objectCalc(fc.add(), true)(obj1, obj2)).toEqual({a: 80, b: -35, c: 2, d: 10});
            expect(fc.objectCalc(fc.subtract(), true)(obj1, obj2)).toEqual({a: -60, b: 45, c: 2, d: 10});

            // if argument merge=false, non-existing properties are omitted in the target object
            obj1 = {a: 10, b: 5, c: 2};
            obj2 = {a: 70, b: -40, d: 10};
            expect(fc.objectCalc(fc.add(), false)(obj1, obj2)).toEqual({a: 80, b: -35});
            expect(fc.objectCalc(fc.subtract(), false)(obj1, obj2)).toEqual({a: -60, b: 45});

            // if argument merge is array of keys, non-existing or filtered-out properties are omitted in the target object
            obj1 = {a: 10, b: 5, c: 2};
            obj2 = {a: 70, b: -40, d: 10};
            expect(fc.objectCalc(fc.add(), ['a'])(obj1, obj2)).toEqual({a: 80});
            expect(fc.objectCalc(fc.subtract(), ['a'])(obj1, obj2)).toEqual({a: -60});

            // default behavior, with reduce
            arr = [{a: 10, b: 5}, {a: 1, b: -3}, {a: 2, b: 100}];
            expect(arr.reduce(fc.objectCalc(fc.add()))).toEqual({a: 13, b: 102});
            expect(arr.reduceRight(fc.objectCalc(fc.add()))).toEqual({a: 13, b: 102});

            // merge=true, with reduce
            arr = [{a: 10, b: 5, c: 'x'}, {a: 1, b: -3, c: 'y'}, {a: 2, b: 100, w: null}];
            expect(arr.reduce(fc.objectCalc(fc.add(), true))).toEqual({a: 13, b: 102, c: 'xy', w: null});
            expect(arr.reduceRight(fc.objectCalc(fc.add(), true))).toEqual({a: 13, b: 102, c: 'yx', w: null});

            // merge=false, with reduce
            arr = [{a: 10, b: 5, c: 'x'}, {a: 1, b: -3, c: 'y'}, {a: 2, b: 100, w: null}];
            expect(arr.reduce(fc.objectCalc(fc.add(), false))).toEqual({a: 13, b: 102});
            expect(arr.reduceRight(fc.objectCalc(fc.add(), false))).toEqual({a: 13, b: 102});

            // merge is array of keys, with reduce
            arr = [{a: 10, b: 5, c: 'x'}, {a: 1, b: -3, c: 'y'}, {a: 2, b: 100, w: null}];
            expect(arr.reduce(fc.objectCalc(fc.add(), ['a', 'c']))).toEqual({a: 13, c: 'xy'});
            expect(arr.reduceRight(fc.objectCalc(fc.add(), ['a', 'c']))).toEqual({a: 13, c: 'yx'});

        });

    });


    describe('arrayCalc()()', function () {

        it('should invoke operations on array items', function () {
            var arr1, arr2, arr;

            // arrays of the same length
            arr1 = ['one', 'two', 'three'];
            arr2 = ['01', '02', '03'];
            expect(fc.arrayCalc(fc.add())(arr1, arr2)).toEqual(['one01', 'two02', 'three03']);

            // non-existing values are calculated by default as undefined
            arr1 = ['one', 'two', 'three'];
            arr2 = ['01', '02', '03', '04'];
            expect(fc.arrayCalc(fc.add())(arr1, arr2)).toEqual(['one01', 'two02', 'three03', 'undefined04']);

            // if argument merge=true, non-existing values are just added to the target array
            arr1 = ['one', 'two', 'three'];
            arr2 = ['01', '02', '03', '04'];
            expect(fc.arrayCalc(fc.add(), true)(arr1, arr2)).toEqual(['one01', 'two02', 'three03', '04']);

            // if argument merge=false, non-existing values are omitted in the target array
            arr1 = ['one', 'two', 'three'];
            arr2 = ['01', '02', '03', '04'];
            expect(fc.arrayCalc(fc.add(), false)(arr1, arr2)).toEqual(['one01', 'two02', 'three03']);

            // default behavior with reduce
            arr = [[1, 2, 3], [5, 6, 7], [8, 9, 10]];
            expect(arr.reduce(fc.arrayCalc(fc.add()))).toEqual([14, 17, 20]);
            expect(arr.reduceRight(fc.arrayCalc(fc.add()))).toEqual([14, 17, 20]);

            // merge=true with reduce
            arr = [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]];
            expect(arr.reduce(fc.arrayCalc(fc.add(), true))).toEqual([14, 17, 20, 4]);
            expect(arr.reduceRight(fc.arrayCalc(fc.add(), true))).toEqual([14, 17, 20, 4]);

            // merge=false with reduce
            arr = [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]];
            expect(arr.reduce(fc.arrayCalc(fc.add(), false))).toEqual([14, 17, 20]);
            expect(arr.reduceRight(fc.arrayCalc(fc.add(), false))).toEqual([14, 17, 20]);

        });

    });


    describe('clone()()', function () {

        it('should clone data', function () {

            var source, target, mapped;

            // primitive types
            expect(fc.clone()(1)).toEqual(1);
            expect(fc.clone()('a')).toEqual('a');
            expect(fc.clone()(true)).toEqual(true);
            expect(fc.clone()(null)).toEqual(null);

            source = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            target = fc.clone()(source);
            expect(target).toEqual(source);

            expect(target === source).toEqual(false);

            expect(target[0] === source[0]).toEqual(true);
            expect(target[1] === source[1]).toEqual(true);
            expect(target[2] === source[2]).toEqual(true);
            expect(target[3] === source[3]).toEqual(true);
            expect(target[4] === source[4]).toEqual(true);
            expect(target[5] === source[5]).toEqual(true);

            expect(target[4][0] === source[4][0]).toEqual(true);
            expect(target[4][1] === source[4][1]).toEqual(true);
            expect(target[4][2] === source[4][2]).toEqual(true);

            expect(target[5].a === source[5].a).toEqual(true);
            expect(target[5].b === source[5].b).toEqual(true);

            expect(target[4][2].x === source[4][2].x).toEqual(true);
            expect(target[4][2].y === source[4][2].y).toEqual(true);

            expect(target[5].b[0] === source[5].b[0]).toEqual(true);
            expect(target[5].b[1] === source[5].b[1]).toEqual(true);

            source = [[{a: 1}, {a: 5}], [{a: 1}, {a: -10}], [{a: 100}, {a: 0}]];
            mapped = source.map(fc.clone());

            expect(mapped).toEqual(source);

            // should be cloned
            expect(mapped[0] === source[0]).toEqual(false);
            expect(mapped[1] === source[1]).toEqual(false);
            expect(mapped[2] === source[2]).toEqual(false);

            // should be one
            expect(mapped[0][0] === source[0][0]).toEqual(true);
            expect(mapped[0][1] === source[0][1]).toEqual(true);
            expect(mapped[1][0] === source[1][0]).toEqual(true);
            expect(mapped[1][1] === source[1][1]).toEqual(true);
            expect(mapped[2][0] === source[2][0]).toEqual(true);
            expect(mapped[2][1] === source[2][1]).toEqual(true);

        });

        it('should deeply clone data', function () {

            var source, target, mapped;

            // primitive types
            expect(fc.clone(true)(1)).toEqual(1);
            expect(fc.clone(true)('a')).toEqual('a');
            expect(fc.clone(true)(true)).toEqual(true);
            expect(fc.clone(true)(null)).toEqual(null);

            source = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            target = fc.clone(true)(source);
            expect(target).toEqual(source);

            expect(target === source).toEqual(false);

            expect(target[0] === source[0]).toEqual(true);
            expect(target[1] === source[1]).toEqual(true);
            expect(target[2] === source[2]).toEqual(true);
            expect(target[3] === source[3]).toEqual(true);
            expect(target[4] === source[4]).toEqual(false);
            expect(target[5] === source[5]).toEqual(false);

            expect(target[4][0] === source[4][0]).toEqual(true);
            expect(target[4][1] === source[4][1]).toEqual(true);
            expect(target[4][2] === source[4][2]).toEqual(false);

            expect(target[5].a === source[5].a).toEqual(true);
            expect(target[5].b === source[5].b).toEqual(false);

            expect(target[4][2].x === source[4][2].x).toEqual(true);
            expect(target[4][2].y === source[4][2].y).toEqual(true);

            expect(target[5].b[0] === source[5].b[0]).toEqual(true);
            expect(target[5].b[1] === source[5].b[1]).toEqual(true);

            source = [[{a: 1}, {a: 5}], [{a: 1}, {a: -10}], [{a: 100}, {a: 0}]];
            mapped = source.map(fc.clone(true));

            expect(mapped).toEqual(source);

            // should be cloned
            expect(mapped[0] === source[0]).toEqual(false);
            expect(mapped[1] === source[1]).toEqual(false);
            expect(mapped[2] === source[2]).toEqual(false);

            // should also be cloned
            expect(mapped[0][0] === source[0][0]).toEqual(false);
            expect(mapped[0][1] === source[0][1]).toEqual(false);
            expect(mapped[1][0] === source[1][0]).toEqual(false);
            expect(mapped[1][1] === source[1][1]).toEqual(false);
            expect(mapped[2][0] === source[2][0]).toEqual(false);
            expect(mapped[2][1] === source[2][1]).toEqual(false);

        });

    });


    describe('equal()()', function () {

        it('should test equality', function () {

            var a, b;

            expect(fc.equal()(1, 1)).toEqual(true);
            expect(fc.equal()(1, 3)).toEqual(false);

            a = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            b = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            expect(fc.equal()(a, b)).toEqual(false);

            a = {x: 10};
            b = [a, a];
            expect(fc.equal()(b[0], b[1])).toEqual(true);
        });

        it('should deeply test equality', function () {

            var a, b;

            expect(fc.equal(true)(1, 1)).toEqual(true);
            expect(fc.equal(true)(1, 3)).toEqual(false);

            a = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            b = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            expect(fc.equal(true)(a, b)).toEqual(true);

            a = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            b = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'blackX']}];
            expect(fc.equal(true)(a, b)).toEqual(false);
        });

    });


    describe('compose12()', function () {

        it('should compose function-1d with function-2d', function () {

            var compareA = fc.compose12(fc.value('a'), fc.compare());
            expect(compareA({a: 1, b: 'a'}, {a: -3, b: 'b'})).toEqual(1);
            expect(compareA({a: -4, b: 'a'}, {a: -3, b: 'b'})).toEqual(-1);
            expect(compareA({a: -3, b: 'a'}, {a: -3, b: 'b'})).toEqual(0);

            // used with sort()
            var arr = [{a: 10, b: 4}, {a: 2, b: -10}, {a: 7, b: 0}];
            arr.sort(compareA);
            expect(arr).toEqual([{a: 2, b: -10}, {a: 7, b: 0}, {a: 10, b: 4}]);

        });

    });


    describe('compose11()', function () {

        it('should compose function-1d with function-1d', function () {

            var notA = fc.compose11(fc.value('a'), fc.not());
            expect(notA({a: 1, b: 'a'})).toEqual(false);
            expect(notA({x: 1, y: 5})).toEqual(true);

            // used with map()
            var arr = [{a: 10, b: 4}, {a: 2, b: -10}, {x: 7, y: 0}];
            expect(arr.map(notA)).toEqual([false, false, true]);

        });

    });


    describe('compose21()', function () {

        it('should compose function-2d with function-1d', function () {

            var sum100 = fc.compose21(fc.add(), fc.identity(100));
            expect(sum100(50, 50)).toEqual(true);
            expect(sum100(50, 40)).toEqual(false);

        });

    });


    describe('findValue()', function () {

        it('should return maximum of 2 values', function () {

            var find, identity;

            // default behavior
            expect(fc.findValue([0, '', null])).toEqual(undefined);
            expect(fc.findValue([0, '', null, 1, 'a'])).toEqual(1);

            // default behavior is the same as using [].find() and identity:
            find = fc.partialP(0, Array.prototype.find);
            identity = fc.identity();
            expect(fc.findValue([0, '', null]), find, identity).toEqual(undefined);
            expect(fc.findValue([0, '', null, 1, 'a']), find, identity).toEqual(1);

            // here is how we would use [].find:
            expect([0, '', null].find(identity)).toEqual(undefined);
            expect([0, '', null, 1, 'a'].find(identity)).toEqual(1);

            // using Math.max as finding function
            expect(fc.findValue([2, 10, -4, 2], Math.max)).toEqual(10);
            // is much better than using reduce():
            expect([2, 10, -4, 2].reduce(fc.partial(2, Math.max))).toEqual(10);

            // using Math.max on object properties
            var arr = [{a: 2, b: 0}, {a: 10, b: 0}, {a: -4, b: 10}, {a: 2, b: -1}];
            expect(fc.findValue(arr, Math.max, fc.value('a'))).toEqual({a: 10, b: 0});

        });

    });


    describe('arrayToObject()', function () {

        it('should convert array to object', function () {

            var arr = ['one', 'two', 'three'];

            expect(fc.arrayToObject(arr)).toEqual({0: 'one', 1: 'two', 2: 'three'});
            expect(fc.arrayToObject(arr, function(e) { return e; })).toEqual({'one': 'one', 'two': 'two', 'three': 'three'});
            expect(fc.arrayToObject(arr, function(e, i) { return i; })).toEqual({0: 'one', 1: 'two', 2: 'three'});
            expect(fc.arrayToObject(arr, function(e, i) { return 'v' + i; })).toEqual({'v0': 'one', 'v1': 'two', 'v2': 'three'});

            // by default properties will be overwritten
            expect(fc.arrayToObject([1.1, Math.PI, 3.99], Math.floor)).toEqual({1: 1.1, 3: 3.99});

            // we can achieve grouping by passing reduce-function
            var concat = fc.partialP(2, [].concat);
            expect(fc.arrayToObject([1.1, Math.PI, 3.99], Math.floor, concat, [])).toEqual({1: [1.1], 3: [Math.PI, 3.99]});
            expect(fc.arrayToObject(['one', 'two', 'three'], fc.value('length'), concat, [])).toEqual({3: ['one', 'two'], 5: ['three']});

        });

    });


});
