describe('FC', function () {


    describe('identity()()', function () {

        it('should return the item', function () {
            expect(FC.identity()(4)).toEqual(4);
            expect(FC.identity()('a')).toEqual('a');
            expect(FC.identity()(true)).toEqual(true);
            expect(FC.identity()(null)).toEqual(null);
            expect(FC.identity()({a: 10})).toEqual({a: 10});
        });

        it('should test if item is equal to provided value', function () {
            expect(FC.identity(4)(4)).toEqual(true);
            expect(FC.identity('a')('a')).toEqual(true);
            expect(FC.identity(true)(true)).toEqual(true);
            expect(FC.identity(null)(null)).toEqual(true);
            var obj = {a: 10};
            expect(FC.identity(obj)(obj)).toEqual(true);

            expect(FC.identity(3)(4)).toEqual(false);
            expect(FC.identity('x')('a')).toEqual(false);
            expect(FC.identity(false)(true)).toEqual(false);
            expect(FC.identity(undefined)(null)).toEqual(false);
            expect(FC.identity({a: 10})({a: 10})).toEqual(false);
        });

    });


    describe('not()()', function () {

        it('should test if item is falsy', function () {
            expect(FC.not()(4)).toEqual(false);
            expect(FC.not()('a')).toEqual(false);
            expect(FC.not()(true)).toEqual(false);
            expect(FC.not()(null)).toEqual(true);
            expect(FC.not()({a: 10})).toEqual(false);
            expect(FC.not()(undefined)).toEqual(true);

            expect(FC.not(true)(4)).toEqual(false);
            expect(FC.not(true)('a')).toEqual(false);
            expect(FC.not(true)(true)).toEqual(false);
            expect(FC.not(true)(null)).toEqual(true);
            expect(FC.not(true)({a: 10})).toEqual(false);
            expect(FC.not(true)(undefined)).toEqual(true);
        });

        it('should test if item is thruthy', function () {
            expect(FC.not(false)(4)).toEqual(true);
            expect(FC.not(false)('a')).toEqual(true);
            expect(FC.not(false)(true)).toEqual(true);
            expect(FC.not(false)(null)).toEqual(false);
            expect(FC.not(false)({a: 10})).toEqual(true);
            expect(FC.not(false)(undefined)).toEqual(false);
        });
    });


    describe('index()()', function () {

        it('should return the index', function () {
            expect(FC.index()({a: 1}, 4)).toEqual(4);
        });

        it('should test if the index is equal to provided number', function () {
            expect(FC.index(4)({a: 1}, 4)).toEqual(true);
            expect(FC.index(1)({a: 1}, 4)).toEqual(false);
        });

    });


    describe('value()()', function () {

        it('should access object-value by key existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.value('a')(obj)).toEqual(10);
            expect(FC.value('b')(obj)).toEqual(0);
            expect(FC.value('')(obj)).toEqual(100);
            expect(FC.value('w')(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            expect(FC.value(0)(arr)).toEqual(arr[0]);
            expect(FC.value(1)(arr)).toEqual(arr[1]);

            // map() will map values by existing keys
            expect(arr.map(FC.value('a'))).toEqual([10, 7, 10, null, null]);
            // filter() will filter objects by existing keys
            expect(arr.filter(FC.value('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}]);

            // map() will include a falsy value  (falsy key doesn't matter)
            expect(arr.map(FC.value(''))).toEqual([null, null, null, 3, 0]);
            // filter() will exclude objects with a falsy value  (falsy key doesn't matter)
            expect(arr.filter(FC.value(''))).toEqual([{w: 10, '': 3}]);

        });


        it('should access object-value by key-value existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.value('a', 10)(obj)).toEqual(10);
            expect(FC.value('b', 0)(obj)).toEqual(0);
            expect(FC.value('', 100)(obj)).toEqual(100);
            expect(FC.value('a', 5)(obj)).toEqual(null);
            expect(FC.value('b', 10)(obj)).toEqual(null);
            expect(FC.value('a', 0)(obj)).toEqual(null);
            expect(FC.value('', 0)(obj)).toEqual(null);
            expect(FC.value('', 10)(obj)).toEqual(null);
            expect(FC.value('w', 1)(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map values by existing key-value pairs
            expect(arr.map(FC.value('a', 10))).toEqual([10, null, 10, null, null]);
            // filter() will filter objects by existing keys-value pairs
            expect(arr.filter(FC.value('a', 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);

            // map() will include a falsy value
            expect(arr.map(FC.value('', 3))).toEqual([null, null, null, 3, null]);
            // filter() will exclude only objects with a falsy value - here it's not falsy
            expect(arr.filter(FC.value('', 3))).toEqual([{w: 10, '': 3}]);
            // map() will include a falsy value (falsy key doesn't matter)
            expect(arr.map(FC.value('', 0))).toEqual([null, null, null, null, 0]);
            // but filter() will exclude objects with a falsy value (falsy key doesn't matter)
            expect(arr.filter(FC.value('', 0))).toEqual([]);

        });


        it('should access object-value by value existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.value(null, 10)(obj)).toEqual(10);
            expect(FC.value(null, 0)(obj)).toEqual(0);
            expect(FC.value(null, 100)(obj)).toEqual(100);
            expect(FC.value(null, 7)(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map existing values
            expect(arr.map(FC.value(null, 10))).toEqual([10, null, 10, 10, null]);
            // filter() will filter objects by existing values
            expect(arr.filter(FC.value(null, 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}, {w: 10, '': 3}]);

            // map() will include a falsy value
            expect(arr.map(FC.value(null, 0))).toEqual([null, 0, null, null, 0]);
            // but filter() will exclude objects with a falsy value
            expect(arr.filter(FC.value(null, 0))).toEqual([]);

        });

    });


    describe('key()()', function () {

        it('should access object-key by key existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.key('a')(obj)).toEqual('a');
            expect(FC.key('b')(obj)).toEqual('b');
            expect(FC.key('')(obj)).toEqual('');
            expect(FC.key('w')(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map existing keys
            expect(arr.map(FC.key('a'))).toEqual(['a', 'a', 'a', null, null]);
            // filter() will filter objects by existing keys
            expect(arr.filter(FC.key('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}]);

            // map() will include a falsy key
            expect(arr.map(FC.key(''))).toEqual([null, null, null, '', '']);
            // but filter() will exclude objects with a falsy key
            expect(arr.filter(FC.key(''))).toEqual([]);
        });


        it('should access object-key by key-value existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.key('a', 10)(obj)).toEqual('a');
            expect(FC.key('b', 0)(obj)).toEqual('b');
            expect(FC.key('', 100)(obj)).toEqual('');
            expect(FC.key('a', 5)(obj)).toEqual(null);
            expect(FC.key('b', 7)(obj)).toEqual(null);
            expect(FC.key('', 1)(obj)).toEqual(null);
            expect(FC.key('w', 1)(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map keys by existing key-value pairs
            expect(arr.map(FC.key('a', 10))).toEqual(['a', null, 'a', null, null]);
            // filter() will filter objects by existing key-value pairs
            expect(arr.filter(FC.key('a', 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
            // map() will map keys by existing key-value pairs (falsy value doesn't matter)
            expect(arr.map(FC.key('b', 0))).toEqual([null, 'b', null, null, null]);
            // filter() will filter objects by existing key-value pairs (falsy value doesn't matter)
            expect(arr.filter(FC.key('b', 0))).toEqual([{a: 7, b: 0}]);

            // map() will include a falsy key
            expect(arr.map(FC.key('', 3))).toEqual([null, null, null, '', null]);
            // but filter() will exclude objects with a falsy key
            expect(arr.filter(FC.key('', 3))).toEqual([]);
            // map() will include a falsy key (falsy value doesn't matter)
            expect(arr.map(FC.key('', 0))).toEqual([null, null, null, null, '']);
            // but filter() will exclude objects with a falsy key (falsy value doesn't matter)
            expect(arr.filter(FC.key('', 0))).toEqual([]);
        });


        it('should access object-key by value existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.key(null, 10)(obj)).toEqual('a');
            expect(FC.key(null, 0)(obj)).toEqual('b');
            expect(FC.key(null, 100)(obj)).toEqual('');
            expect(FC.key(null, 7)(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map keys by existing values
            expect(arr.map(FC.key(null, 10))).toEqual(['a', null, 'a', 'w', null]);
            // filter() will filter objects by existing values
            expect(arr.filter(FC.key(null, 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}, {w: 10, '': 3}]);

            // map() will include a falsy key
            expect(arr.map(FC.key(null, 0))).toEqual([null, 'b', null, null, '']);
            // but filter() will exclude objects with a falsy key
            expect(arr.filter(FC.key(null, 0))).toEqual([{a: 7, b: 0}]);
        });

    });


    describe('object()()', function () {

        it('should access object by key existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.object('a')(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.object('b')(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.object('')(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.object('w')(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map objects by existing keys
            expect(arr.map(FC.object('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, null, null]);
            // filter() will filter objects by existing keys
            expect(arr.filter(FC.object('a'))).toEqual([{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}]);

            // map() will map objects by existing keys (falsy key/value doesn't matter)
            expect(arr.map(FC.object(''))).toEqual([null, null, null, {w: 10, '': 3}, {'': 0}]);
            // filter() will filter objects by existing keys (falsy key/value doesn't matter)
            expect(arr.filter(FC.object(''))).toEqual([{w: 10, '': 3}, {'': 0}]);
        });


        it('should access object by key-value existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.object('a', 10)(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.object('b', 0)(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.object('', 100)(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.object('a', 0)(obj)).toEqual(null);
            expect(FC.object('b', 10)(obj)).toEqual(null);
            expect(FC.object('w', 1)(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map objects by existing key-value pairs
            expect(arr.map(FC.object('a', 10))).toEqual([{a: 10, b: 5}, null, {a: 10, b: 7}, null, null]);
            // filter() will filter objects by existing key-value pairs
            expect(arr.filter(FC.object('a', 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
            // find() will find object by existing keys-value pairs
            expect(arr.find(FC.value('a', 10))).toEqual({a: 10, b: 5});
            // findIndex() will find index by existing keys-value pairs
            expect(arr.findIndex(FC.value('a', 10))).toEqual(0);

            // map() will map objects by existing key-value pairs (falsy key/value doesn't matter)
            expect(arr.map(FC.object('', 0))).toEqual([null, null, null, null, {'': 0}]);
            // filter() will filter objects by existing key-value pairs (falsy key/value doesn't matter)
            expect(arr.filter(FC.object('', 0))).toEqual([{'': 0}]);

        });


        it('should access object by value existence', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.object(null, 10)(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.object(null, 0)(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.object(null, 7)(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map objects by existing values
            expect(arr.map(FC.object(null, 10))).toEqual([{a: 10, b: 5}, null, {a: 10, b: 7}, {w: 10, '': 3}, null]);
            // filter() will filter objects by existing values
            expect(arr.filter(FC.object(null, 10))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}, {w: 10, '': 3}]);

            // map() will map objects by existing values (falsy key/value doesn't matter)
            expect(arr.map(FC.object(null, 0))).toEqual([null, {a: 7, b: 0}, null, null, {'': 0}]);
            // filter() will filter objects by existing values (falsy key/value doesn't matter)
            expect(arr.filter(FC.object(null, 0))).toEqual([{a: 7, b: 0}, {'': 0}]);

        });
    });


    describe('has()()', function () {

        it('should access object by indicating if it has given key-value pairs', function () {
            var obj = {a: 10, b: 0, '': 100};

            expect(FC.has({a: 10})(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.has({b: 0})(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.has({'': 100})(obj)).toEqual({a: 10, b: 0, '': 100});
            expect(FC.has({a: 0})(obj)).toEqual(null);
            expect(FC.has({b: 10})(obj)).toEqual(null);
            expect(FC.has({w: 1})(obj)).toEqual(null);

            var arr = [{a: 10, b: 5}, {a: 7, b: 0}, {a: 10, b: 7}, {w: 10, '': 3}, {'': 0}];

            // map() will map objects by containing key-value pairs
            expect(arr.map(FC.has({a: 10}))).toEqual([{a: 10, b: 5}, null, {a: 10, b: 7}, null, null]);
            // filter() will filter objects by containing key-value pairs
            expect(arr.filter(FC.has({a: 10}))).toEqual([{a: 10, b: 5}, {a: 10, b: 7}]);
            // find() will find object by containing keys-value pairs
            expect(arr.find(FC.has({a: 10}))).toEqual({a: 10, b: 5});
            // findIndex() will find index by containing keys-value pairs
            expect(arr.findIndex(FC.has({a: 10}))).toEqual(0);

        });

    });


    describe('invoke()()', function () {

        it('should invoke an object method', function () {

            expect(FC.invoke('toFixed')(456.332)).toEqual('456');
            expect(FC.invoke('toFixed', 2)(456.332)).toEqual('456.33');

            var arr = [{a: 10, b: 5}, [1, 2, 3], 108, true, 'text'];

            // used with map()
            expect(arr.map(FC.invoke('toString'))).toEqual(['[object Object]', '1,2,3', '108', 'true', 'text']);

            // used with filter()
            expect(arr.filter(FC.invoke('hasOwnProperty', 'length'))).toEqual([[1, 2, 3], 'text']);

        });

    });


    describe('add()()', function () {

        it('should add numbers or concatenate strings', function () {
            expect(FC.add()(5, 3)).toEqual(8);
            expect(FC.add(true)(5, 3)).toEqual(-8);

            // can be used for reducing
            expect([5, 3, 4].reduce(FC.add())).toEqual(12);
            expect([5, 3, 4].reduce(FC.add(true))).toEqual(4);
            expect([5, 3, 4].reduceRight(FC.add())).toEqual(12);
            expect([5, 3, 4].reduceRight(FC.add(true))).toEqual(2);
        });

    });


    describe('subtract()()', function () {

        it('should subtract numbers', function () {
            expect(FC.subtract()(5, 3)).toEqual(2);
            expect(FC.subtract(true)(5, 3)).toEqual(-2);

            // can be used for reducing
            expect([5, 3, 4].reduce(FC.subtract())).toEqual(-2);
            expect([5, 3, 4].reduce(FC.subtract(true))).toEqual(6);
            expect([5, 3, 4].reduceRight(FC.subtract())).toEqual(-4);
            expect([5, 3, 4].reduceRight(FC.subtract(true))).toEqual(6);

            // can be used as a sorting method for numbers
            expect([50, 5, 1, 11, 3].sort(FC.subtract())).toEqual([1, 3, 5, 11, 50]);
            expect([50, 5, 1, 11, 3].sort(FC.subtract(true))).toEqual([50, 11, 5, 3, 1]);
        });

    });


    describe('compareString()()', function () {

        it('should compare strings', function () {
            expect(FC.compareString()('10', '2')).toEqual(-1);
            expect(FC.compareString()('2', '10')).toEqual(1);
            expect(FC.compareString()('10', '10')).toEqual(0);

            // numbers also will be compared as strings
            expect(FC.compareString()(10, 2)).toEqual(-1);
            expect(FC.compareString()(2, 10)).toEqual(1);
            expect(FC.compareString()(10, 10)).toEqual(0);

            // can be used for reducing (although I cannot image a good case :)
            expect(['1', '0', '-1'].reduce(FC.compareString())).toEqual(1);
            expect(['1', '0', '-1'].reduce(FC.compareString(true))).toEqual(0);
            expect(['1', '0', '-1'].reduceRight(FC.compareString())).toEqual(-1);
            expect(['1', '0', '-1'].reduceRight(FC.compareString(true))).toEqual(0);

            // can be used as a sorting method for strings
            expect(['50', '5', '1', '11', '3'].sort(FC.compareString())).toEqual(['1', '11', '3', '5', '50']);
            expect(['50', '5', '1', '11', '3'].sort(FC.compareString(true))).toEqual(['50', '5', '3', '11', '1']);

            // numbers also will be sorted as strings
            // this is default behaviour of sort() method without any argument
            expect([50, 5, 1, 11, 3].sort(FC.compareString())).toEqual([1, 11, 3, 5, 50]);
            expect([50, 5, 1, 11, 3].sort(FC.compareString(true))).toEqual([50, 5, 3, 11, 1]);

        });

    });


    describe('compare()()', function () {

        it('should compare numbers or strings', function () {
            expect(FC.compare()(10, 2)).toEqual(1);
            expect(FC.compare()(2, 10)).toEqual(-1);
            expect(FC.compare()(10, 10)).toEqual(0);

            expect(FC.compare()('10', '2')).toEqual(-1);
            expect(FC.compare()('2', '10')).toEqual(1);
            expect(FC.compare()('10', '10')).toEqual(0);

            // can be used for reducing
            expect([1, 0, -1].reduce(FC.compare())).toEqual(1);
            expect([1, 0, -1].reduce(FC.compare(true))).toEqual(0);
            expect([1, 0, -1].reduceRight(FC.compare())).toEqual(-1);
            expect([1, 0, -1].reduceRight(FC.compare(true))).toEqual(0);

            // can be used as a sorting method for numbers
            expect([50, 5, 1, 11, 3].sort(FC.compare())).toEqual([1, 3, 5, 11, 50]);
            expect([50, 5, 1, 11, 3].sort(FC.compare(true))).toEqual([50, 11, 5, 3, 1]);

            // can be used as a sorting method for strings
            expect(['50', '5', '1', '11', '3'].sort(FC.compare())).toEqual(['1', '11', '3', '5', '50']);
            expect(['50', '5', '1', '11', '3'].sort(FC.compare(true))).toEqual(['50', '5', '3', '11', '1']);
        });

    });


    describe('flip()()', function () {

        it('should run 2-argument functions with reversed order of arguments', function () {

            var exp = FC.flip(Math.pow);
            expect(exp(2, 4)).toEqual(Math.pow(4, 2));

            // working with sort()
            var cmp = FC.flip(FC.compare());
            expect([1, 4, 10, 12, 3].sort(cmp)).toEqual([12, 10, 4, 3, 1]);

            // working with reduce()
            var revSub = FC.flip(FC.subtract());
            expect([1, 2, 3, 4].reduce(revSub)).toEqual(2);

        });

    });


    describe('partial()()', function () {

        it('should run functions as 2-argument functions', function () {

            var max2;

            // only 2 first arguments are taken into account
            max2 = FC.partial(2, Math.max);
            expect(max2(1, 2, 3, 4)).toEqual(2);

            // only 2 first arguments are taken, together with additional fixed arguments
            max2 = FC.partial(2, Math.max, 10);
            expect(max2(1, 2, 3, 4)).toEqual(10);

            // working with reduce()
            max2 = FC.partial(2, Math.max);
            expect([1, 4, 10, 12, 3].reduce(max2)).toEqual(12);

        });

        it('should run functions as 1-argument functions', function () {

            var pow1;

            // only first argument is taken into account (extra fixed argument provided)
            pow1 = FC.partial(1, Math.pow, 10);
            expect(pow1(2, 4)).toEqual(1024);

            // working with map()
            pow1 = FC.partial(1, Math.pow, 2);
            expect([1, 2, 3, 4, 5, 6].map(pow1)).toEqual([1, 4, 9, 16, 25, 36]);
        });

        it('should run functions as 0-argument functions', function () {

            var char;

            // none of the arguments are taken into account
            char = FC.partial(0, String.fromCharCode);
            expect(char(65, 66, 67)).toEqual("");

            // none of the arguments are taken into account (only extra fixed arguments)
            char = FC.partial(0, String.fromCharCode, 70, 67, 33);
            expect(char(65, 66, 67)).toEqual("FC!");

            // working with map()
            var pow = FC.partial(0, Math.sqrt, 16);
            expect([1, 2, 3, 4, 5, 6].map(pow)).toEqual([4, 4, 4, 4, 4, 4]);
        });

        it('should run array-argument functions as functions with variable number of arguments', function () {

            var fn;

            // instead of an array argument, here multiple arguments for items are used
            fn = FC.partial(null, JSON.stringify);
            expect(fn('a', 'b', 'c')).toEqual('["a","b","c"]');

            // instead of an array argument, here multiple arguments for items are used, with extra fixed argument
            fn = FC.partial(null, JSON.stringify, 'd');
            expect(fn('a', 'b', 'c')).toEqual('["a","b","c","d"]');
        });

    });


    describe('partialP()()', function () {

        it('should run prototype methods as 2-argument functions', function () {

            var concat2, replace2, localeCompare2;

            // only 2 first arguments are taken into account
            concat2 = FC.partialP(2, String.prototype.concat);
            expect(concat2('a', 'b', 'ignored', 'ignored')).toEqual('ab');

            // only 2 first arguments are taken, together with additional fixed arguments
            replace2 = FC.partialP(2, String.prototype.replace, 'pl');
            expect(replace2('say', 's', 'ignored', 'ignored')).toEqual('play');

            // working with sort()
            localeCompare2 = FC.partialP(2, String.prototype.localeCompare);
            expect(['a', 'd', 'b', 'c'].sort(localeCompare2)).toEqual(['a', 'b', 'c', 'd']);

            // working with reduce()
            concat2 = FC.partialP(2, Array.prototype.concat);
            expect([[1, 2, 3], [4, 5, 6], [7, 8, 9]].reduce(concat2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        });

        it('should run prototype methods as 1-argument functions', function () {

            var arr, join1, sort1;

            // only first argument is taken into account
            join1 = FC.partialP(1, Array.prototype.join);
            expect(join1(['a', 'b', 'c'], ['ignored', 'ignored', 'ignored'])).toEqual('a,b,c');

            // only first argument is taken into account, together with additional fixed arguments
            join1 = FC.partialP(1, Array.prototype.join, '-');
            expect(join1(['a', 'b', 'c'], ['ignored', 'ignored', 'ignored'])).toEqual('a-b-c');

            // working with forEach()
            sort1 = FC.partialP(1, Array.prototype.sort, FC.compare(true));
            arr = [[78, 7, 12], [1, 31, 300], [3, 6, 28]];
            arr.forEach(sort1);
            expect(arr).toEqual([[78, 12, 7], [300, 31, 1], [28, 6, 3]]);

            // working with map()
            join1 = FC.partialP(1, Array.prototype.join, '-');
            arr = [['2015', '01', '30'], ['2014', '06', '17'], ['2008', '12', '21']];
            expect(arr.map(join1)).toEqual(['2015-01-30', '2014-06-17', '2008-12-21']);
        });

        it('should run array prototype methods as functions with variable number of arguments', function () {

            var join;

            // instead of array items in the context, here multiple arguments are used
            join = FC.partialP(null, Array.prototype.join);
            expect(join('a', 'b', 'c')).toEqual('a,b,c');

            // instead of array items in the context, here multiple arguments are used, with extra fixed argument
            join = FC.partialP(null, Array.prototype.join, '-');
            expect(join('a', 'b', 'c')).toEqual('a-b-c');
        });
    });


    describe('objectCalc()()', function () {

        it('should invoke operations on object properties', function () {
            var obj1, obj2, arr;

            // objects with the same keys
            obj1 = {a: 10, b: 5};
            obj2 = {a: 70, b: -40};
            expect(FC.objectCalc(FC.add())(obj1, obj2)).toEqual({a: 80, b: -35});
            expect(FC.objectCalc(FC.subtract())(obj1, obj2)).toEqual({a: -60, b: 45});

            // non-existing properties by default are calculated as undefined
            obj1 = {a: 10, b: 5, c: 2};
            obj2 = {a: 70, b: -40, d: 10};
            expect(FC.objectCalc(FC.add())(obj1, obj2)).toEqual({a: 80, b: -35, c: NaN, d: NaN});
            expect(FC.objectCalc(FC.subtract())(obj1, obj2)).toEqual({a: -60, b: 45, c: NaN, d: NaN});

            // if argument merge=true, non-existing properties are just added to the target object
            obj1 = {a: 10, b: 5, c: 2};
            obj2 = {a: 70, b: -40, d: 10};
            expect(FC.objectCalc(FC.add(), true)(obj1, obj2)).toEqual({a: 80, b: -35, c: 2, d: 10});
            expect(FC.objectCalc(FC.subtract(), true)(obj1, obj2)).toEqual({a: -60, b: 45, c: 2, d: 10});

            // if argument merge=false, non-existing properties are omitted in the target object
            obj1 = {a: 10, b: 5, c: 2};
            obj2 = {a: 70, b: -40, d: 10};
            expect(FC.objectCalc(FC.add(), false)(obj1, obj2)).toEqual({a: 80, b: -35});
            expect(FC.objectCalc(FC.subtract(), false)(obj1, obj2)).toEqual({a: -60, b: 45});

            // if argument merge is array of keys, non-existing or filtered-out properties are omitted in the target object
            obj1 = {a: 10, b: 5, c: 2};
            obj2 = {a: 70, b: -40, d: 10};
            expect(FC.objectCalc(FC.add(), ['a'])(obj1, obj2)).toEqual({a: 80});
            expect(FC.objectCalc(FC.subtract(), ['a'])(obj1, obj2)).toEqual({a: -60});

            // default behavior, with reduce
            arr = [{a: 10, b: 5}, {a: 1, b: -3}, {a: 2, b: 100}];
            expect(arr.reduce(FC.objectCalc(FC.add()))).toEqual({a: 13, b: 102});
            expect(arr.reduceRight(FC.objectCalc(FC.add()))).toEqual({a: 13, b: 102});

            // merge=true, with reduce
            arr = [{a: 10, b: 5, c: 'x'}, {a: 1, b: -3, c: 'y'}, {a: 2, b: 100, w: null}];
            expect(arr.reduce(FC.objectCalc(FC.add(), true))).toEqual({a: 13, b: 102, c: 'xy', w: null});
            expect(arr.reduceRight(FC.objectCalc(FC.add(), true))).toEqual({a: 13, b: 102, c: 'yx', w: null});

            // merge=false, with reduce
            arr = [{a: 10, b: 5, c: 'x'}, {a: 1, b: -3, c: 'y'}, {a: 2, b: 100, w: null}];
            expect(arr.reduce(FC.objectCalc(FC.add(), false))).toEqual({a: 13, b: 102});
            expect(arr.reduceRight(FC.objectCalc(FC.add(), false))).toEqual({a: 13, b: 102});

            // merge is array of keys, with reduce
            arr = [{a: 10, b: 5, c: 'x'}, {a: 1, b: -3, c: 'y'}, {a: 2, b: 100, w: null}];
            expect(arr.reduce(FC.objectCalc(FC.add(), ['a', 'c']))).toEqual({a: 13, c: 'xy'});
            expect(arr.reduceRight(FC.objectCalc(FC.add(), ['a', 'c']))).toEqual({a: 13, c: 'yx'});

        });

    });


    describe('arrayCalc()()', function () {

        it('should invoke operations on array items', function () {
            var arr1, arr2, arr;

            // arrays of the same length
            arr1 = ['one', 'two', 'three'];
            arr2 = ['01', '02', '03'];
            expect(FC.arrayCalc(FC.add())(arr1, arr2)).toEqual(['one01', 'two02', 'three03']);

            // non-existing values are calculated by default as undefined
            arr1 = ['one', 'two', 'three'];
            arr2 = ['01', '02', '03', '04'];
            expect(FC.arrayCalc(FC.add())(arr1, arr2)).toEqual(['one01', 'two02', 'three03', 'undefined04']);

            // if argument merge=true, non-existing values are just added to the target array
            arr1 = ['one', 'two', 'three'];
            arr2 = ['01', '02', '03', '04'];
            expect(FC.arrayCalc(FC.add(), true)(arr1, arr2)).toEqual(['one01', 'two02', 'three03', '04']);

            // if argument merge=false, non-existing values are omitted in the target array
            arr1 = ['one', 'two', 'three'];
            arr2 = ['01', '02', '03', '04'];
            expect(FC.arrayCalc(FC.add(), false)(arr1, arr2)).toEqual(['one01', 'two02', 'three03']);

            // default behavior with reduce
            arr = [[1, 2, 3], [5, 6, 7], [8, 9, 10]];
            expect(arr.reduce(FC.arrayCalc(FC.add()))).toEqual([14, 17, 20]);
            expect(arr.reduceRight(FC.arrayCalc(FC.add()))).toEqual([14, 17, 20]);

            // merge=true with reduce
            arr = [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]];
            expect(arr.reduce(FC.arrayCalc(FC.add(), true))).toEqual([14, 17, 20, 4]);
            expect(arr.reduceRight(FC.arrayCalc(FC.add(), true))).toEqual([14, 17, 20, 4]);

            // merge=false with reduce
            arr = [[1, 2, 3, 4], [5, 6, 7], [8, 9, 10]];
            expect(arr.reduce(FC.arrayCalc(FC.add(), false))).toEqual([14, 17, 20]);
            expect(arr.reduceRight(FC.arrayCalc(FC.add(), false))).toEqual([14, 17, 20]);

        });

    });


    describe('clone()()', function () {

        it('should clone data', function () {

            var source, target, mapped;

            // primitive types
            expect(FC.clone()(1)).toEqual(1);
            expect(FC.clone()('a')).toEqual('a');
            expect(FC.clone()(true)).toEqual(true);
            expect(FC.clone()(null)).toEqual(null);

            source = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            target = FC.clone()(source);
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
            mapped = source.map(FC.clone());

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
            expect(FC.clone(true)(1)).toEqual(1);
            expect(FC.clone(true)('a')).toEqual('a');
            expect(FC.clone(true)(true)).toEqual(true);
            expect(FC.clone(true)(null)).toEqual(null);

            source = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            target = FC.clone(true)(source);
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
            mapped = source.map(FC.clone(true));

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

            expect(FC.equal()(1, 1)).toEqual(true);
            expect(FC.equal()(1, 3)).toEqual(false);

            a = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            b = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            expect(FC.equal()(a, b)).toEqual(false);

            a = {x: 10};
            b = [a, a];
            expect(FC.equal()(b[0], b[1])).toEqual(true);
        });

        it('should deeply test equality', function () {

            var a, b;

            expect(FC.equal(true)(1, 1)).toEqual(true);
            expect(FC.equal(true)(1, 3)).toEqual(false);

            a = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            b = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            expect(FC.equal(true)(a, b)).toEqual(true);

            a = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'black']}];
            b = [false, 1, 'abc', null, [1, 2, {x: 10, y: 'one'}], {a: 5, b: ['white', 'blackX']}];
            expect(FC.equal(true)(a, b)).toEqual(false);
        });

    });


    describe('compose12()', function () {

        it('should compose 1-argument function with 2-argument function', function () {

            var arr;

            var compareA = FC.compose12(FC.value('a'), FC.compare());
            expect(compareA({a: 1, b: 'a'}, {a: -3, b: 'b'})).toEqual(1);
            expect(compareA({a: -4, b: 'a'}, {a: -3, b: 'b'})).toEqual(-1);
            expect(compareA({a: -3, b: 'a'}, {a: -3, b: 'b'})).toEqual(0);

            // used with sort()
            arr = [{a: 10, b: 4}, {a: 2, b: -10}, {a: 7, b: 0}];
            arr.sort(compareA);
            expect(arr).toEqual([{a: 2, b: -10}, {a: 7, b: 0}, {a: 10, b: 4}]);

            // used with reduce() including index and array arguments
            arr = [10, 20, 30];
            var commas = function (a, b, index, array) {
                return a + ',' + b + ',' + index + ',' + array;
            };
            var brackets = function (element, index, array) {
                return "(" + element + "," + index + "," + array + ")";
            };
            var expected = "((10,1,10,20,30),(20,1,10,20,30),1,10,20,30,2,10,20,30),(30,2,10,20,30),2,10,20,30";
            expect(arr.reduce(FC.compose12(brackets, commas))).toEqual(expected);
        });

    });


    describe('compose11()', function () {

        it('should compose 1-argument function with 2-argument function', function () {

            var notA = FC.compose11(FC.value('a'), FC.not());
            expect(notA({a: 1, b: 'a'})).toEqual(false);
            expect(notA({x: 1, y: 5})).toEqual(true);

            // used with map()
            var arr = [{a: 10, b: 4}, {a: 2, b: -10}, {x: 7, y: 0}];
            expect(arr.map(notA)).toEqual([false, false, true]);

            // used with map() including index and array arguments
            var tellAll = function (element, index, array) {
                return [element, index, array];
            };
            var expected = [[[10, 0, [10, 20, 30]], 0, [10, 20, 30]], [[20, 1, [10, 20, 30]], 1, [10, 20, 30]], [[30, 2, [10, 20, 30]], 2, [10, 20, 30]]];
            expect([10, 20, 30].map(FC.compose11(tellAll, tellAll))).toEqual(expected);

        });

    });


    describe('compose21()', function () {

        it('should compose 2-argument function with 1-argument function', function () {

            // compose a+b-70
            var sum100 = FC.compose21(FC.add(), FC.partial(1, FC.subtract(), 70));
            expect(sum100(50, 50)).toEqual(30);
            expect(sum100(10, 20)).toEqual(-40);

            // used with reduce()
            var arr = [10, 20, 30, 40];
            expect(arr.reduce(sum100)).toEqual(-110);

            // used with reduce() including index and array arguments
            var commas = function (a, b, index, array) {
                return a + ',' + b + ',' + index + ',' + array;
            };
            var brackets = function (element, index, array) {
                return "(" + element + "," + index + "," + array + ")";
            };
            var expected = "((10,20,1,10,20,30,1,10,20,30),30,2,10,20,30,2,10,20,30)";
            expect([10, 20, 30].reduce(FC.compose21(commas, brackets))).toEqual(expected);

        });

    });


    describe('functions()', function () {

        it('should combine 1-argument function with 1-argument function by a custom 2-argument function', function () {

            var addFunctions = FC.functions(function (a, b) {
                return a + b;
            });

            var aPlusB = addFunctions(FC.value('a'), FC.value('b'));

            expect(aPlusB({a: 1, b: 7})).toEqual(8);

            // used with map()
            var arr = [{a: 10, b: 4}, {a: 2, b: -10}, {a: 7, b: 0}];
            expect(arr.map(aPlusB)).toEqual([14, -8, 7]);

        });

    });


    describe('andFunctions()', function () {

        it('should combine two unary-function results with AND operator', function () {

            var aAndB = FC.andFunctions(FC.key('a'), FC.key('b'));

            expect(!!aAndB({a: 1, b: 7})).toEqual(true);
            expect(!!aAndB({x: 1, b: 7})).toEqual(false);
            expect(!!aAndB({a: 1, y: 7})).toEqual(false);

            // used with filter()
            var arr = [{a: 10, b: 4}, {a: 2, b: -10}, {x: 7, b: 0}, {a: -3, y: 20}];
            expect(arr.filter(aAndB)).toEqual([{a: 10, b: 4}, {a: 2, b: -10}]);

        });

    });


    describe('findValue()', function () {

        it('should return maximum of 2 values', function () {

            var find, identity;

            // default behavior
            expect(FC.findValue([0, '', null])).toEqual(undefined);
            expect(FC.findValue([0, '', null, 1, 'a'])).toEqual(1);

            // default behavior is the same as using [].find() and identity:
            find = FC.partialP(null, Array.prototype.find);
            identity = FC.identity();
            expect(FC.findValue([0, '', null]), find, identity).toEqual(undefined);
            expect(FC.findValue([0, '', null, 1, 'a']), find, identity).toEqual(1);

            // here is how we would use [].find:
            expect([0, '', null].find(identity)).toEqual(undefined);
            expect([0, '', null, 1, 'a'].find(identity)).toEqual(1);

            // using Math.max as finding function
            expect(FC.findValue([2, 10, -4, 2], Math.max)).toEqual(10);
            // is much better than using reduce():
            expect([2, 10, -4, 2].reduce(FC.partial(2, Math.max))).toEqual(10);

            // using Math.max on object properties
            var arr = [{a: 2, b: 0}, {a: 10, b: 0}, {a: -4, b: 10}, {a: 2, b: -1}];
            expect(FC.findValue(arr, Math.max, FC.value('a'))).toEqual({a: 10, b: 0});

        });

    });


    describe('arrayToObject()', function () {

        it('should convert array to object', function () {

            var keyFn, obj;
            var arr = ['one', 'two', 'three'];

            expect(FC.arrayToObject(arr)).toEqual({0: 'one', 1: 'two', 2: 'three'});

            keyFn = function (e) {
                return e;
            };
            expect(FC.arrayToObject(arr, keyFn)).toEqual({'one': 'one', 'two': 'two', 'three': 'three'});

            keyFn = function (e, i) {
                return i;
            };
            expect(FC.arrayToObject(arr, keyFn)).toEqual({0: 'one', 1: 'two', 2: 'three'});

            keyFn = function (e, i) {
                return 'v' + i;
            };
            expect(FC.arrayToObject(arr, keyFn)).toEqual({'v0': 'one', 'v1': 'two', 'v2': 'three'});

            // by default properties will be overwritten
            expect(FC.arrayToObject([1.1, Math.PI, 3.99], Math.floor)).toEqual({1: 1.1, 3: 3.99});

            // we can achieve grouping by passing reduce-function
            var concat = FC.partialP(2, [].concat);

            obj = FC.arrayToObject([1.1, Math.PI, 3.99], Math.floor, concat, []);
            expect(obj).toEqual({1: [1.1], 3: [Math.PI, 3.99]});

            obj = FC.arrayToObject(['one', 'two', 'three'], FC.value('length'), concat, []);
            expect(obj).toEqual({3: ['one', 'two'], 5: ['three']});

        });

    });


    describe('objectToArray()', function () {

        it('convert object to array', function () {
            // by default it should order by key names
            expect(FC.objectToArray({one: 1, two: 2, four: 4, three: 3})).toEqual([4, 1, 3, 2]);
            expect(FC.objectToArray({"10": "a", "1": "b", "3": "c"})).toEqual(["b", "a", "c"]);
            expect(FC.objectToArray({10: "a", 1: "b", 3: "c"})).toEqual(["b", "a", "c"]);
        });

        it('convert object to array with custom sort function', function () {
            expect(FC.objectToArray({10: "a", 1: "b", 3: "c"}, null, FC.subtract())).toEqual(["b", "c", "a"]);
        });

        it('convert object to array with custom predicate function', function () {
            // order by values
            var arr = FC.objectToArray({one: 1, two: 2, four: 4, three: 3}, FC.identity(), FC.subtract());
            expect(arr).toEqual([1, 2, 3, 4]);
        });

    });


    describe('objectIterator()()', function () {

        it('should convert array map to object map', function () {
            var map, result, obj;

            obj = {one: 1, two: 2, three: 3};

            map = FC.objectIterator([].map);
            result = map(obj, function (v, k, o) {
                return v + ',' + k + ',' + Object.keys(o).length;
            });
            expect(result).toEqual(['1,one,3', '2,two,3', '3,three,3']);

        });


        it('should convert array filter to object filter', function () {
            var filter, result, obj;

            obj = {one: 1, two: 2, three: 3};

            filter = FC.objectIterator([].filter);
            result = filter(obj, function (v, k) {
                return (k === 'two') || (v === 3);
            });
            expect(result).toEqual([2, 3]);

        });

    });


    describe('map()', function () {

        it('should map array items', function () {
            var fn = function (e, i, a) {
                return e + ',' + i + ',' + JSON.stringify(a);
            };

            var arr = [1, 2, 3];
            var expected = ['1,0,[1,2,3]', '2,1,[1,2,3]', '3,2,[1,2,3]'];

            expect(FC.map(arr, fn)).toEqual(expected);

        });


        it('should map object properties', function () {
            var fn = function (v, k, o) {
                return v + ',' + k + ',' + JSON.stringify(o);
            };

            var obj = {one: 1, two: 2, three: 3};
            var expected = {
                one: '1,one,{"one":1,"two":2,"three":3}',
                two: '2,two,{"one":1,"two":2,"three":3}',
                three: '3,three,{"one":1,"two":2,"three":3}'
            };

            expect(FC.map(obj, fn)).toEqual(expected);

        });

    });


    describe('filter()', function () {

        it('should filter array items', function () {
            var fn = function (e, i, a) {
                return (e === 1) || (i === 1) || (a[i + 1] === 4);
            };

            var arr = [1, 2, 3, 4];
            var expected = [1, 2, 3];

            expect(FC.filter(arr, fn)).toEqual(expected);

        });


        it('should filter object properties', function () {
            var fn = function (v, k, o) {
                return (v === 1) || (k === 'two') || (o['_' + k] === 4);
            };

            var obj = {one: 1, two: 2, three: 3, _three: 4};
            var expected = {one: 1, two: 2, three: 3};

            expect(FC.filter(obj, fn)).toEqual(expected);

        });

    });


    describe('some()', function () {

        it('should test if a predicate occurs on any of array items', function () {

            expect(FC.some([1, 2, 3], function (e) {
                return e === 3;
            })).toEqual(true);

            expect(FC.some([1, 2, 3], function (e) {
                return e === 4;
            })).toEqual(false);

            expect(FC.some([1, 2, 3], function (e, i) {
                return i === 2;
            })).toEqual(true);

            expect(FC.some([1, 2, 3], function (e, i) {
                return i === 4;
            })).toEqual(false);

        });


        it('should test if a predicate occurs on any of object properties', function () {

            expect(FC.some({one: 1, two: 2}, function (v) {
                return v === 2;
            })).toEqual(true);

            expect(FC.some({one: 1, two: 2}, function (v) {
                return v === 4;
            })).toEqual(false);

            expect(FC.some({one: 1, two: 2}, function (v, k) {
                return k === 'two';
            })).toEqual(true);

            expect(FC.some({one: 1, two: 2}, function (v, k) {
                return k === 'three';
            })).toEqual(false);
        });

    });


    describe('every()', function () {

        it('should test if a predicate occurs on all of array items', function () {

            expect(FC.every([1, 2, 3], function (e) {
                return e < 4;
            })).toEqual(true);

            expect(FC.every([1, 2, 3], function (e) {
                return e < 3;
            })).toEqual(false);

            expect(FC.every([1, 2, 3], function (e, i) {
                return i < 3;
            })).toEqual(true);

            expect(FC.every([1, 2, 3], function (e, i) {
                return i < 2;
            })).toEqual(false);

        });


        it('should test if a predicate occurs on all of object properties', function () {

            expect(FC.every({one: 1, two: 2}, function (v) {
                return v < 3;
            })).toEqual(true);

            expect(FC.every({one: 1, two: 2}, function (v) {
                return v < 2;
            })).toEqual(false);

            expect(FC.every({one: 1, two: 2}, function (v, k) {
                return k.length === 3;
            })).toEqual(true);

            expect(FC.every({one: 1, two: 2}, function (v, k) {
                return k.length === 2;
            })).toEqual(false);
        });

    });


    describe('sort()', function () {

        it('should sort array items', function () {

            var array = [1, 7, 4];
            var expected = [1, 4, 7];

            expect(FC.sort(array)).toEqual(expected);
            expect(array).toEqual([1, 7, 4]);
            expect(FC.sort(array) !== array).toEqual(true);

        });


        it('should sort array items by a predicate function', function () {

            var array = [{a: 1, b: 2}, {a: 7, b: 0}, {a: 3, b: 4}];
            var expected = [{a: 1, b: 2}, {a: 3, b: 4}, {a: 7, b: 0}];

            expect(FC.sort(array, FC.value('a'))).toEqual(expected);

        });


        it('should sort array items by a predicate function, provided custom sort function', function () {

            var array = [{a: 'a', b: 2}, {a: 'c', b: 0}, {a: 'b', b: 4}];
            var expected = [{a: 'a', b: 2}, {a: 'b', b: 4}, {a: 'c', b: 0}];

            var localeCompare = FC.partialP(2, String.prototype.localeCompare);

            expect(FC.sort(array, FC.value('a'), localeCompare)).toEqual(expected);

        });

    });


});

