# FClass

**FClass** is a JavaScript utility library, that gives support for manipulating data in a functional way.

## Principles

* allows to work easily with iteration *Array.prototype* methods, like: *forEach*, *map*, *filter*, *some*, *every*, *find*, *findIndex*, *reduce*, *reduceRight*, combining their functional approach with JavaScript flavor

* gives support for manipulating plain Objects as well, being fully capable tool to use with JSON data structures

* doesn't ship countless iteration or predicate methods, rather allows to build them yourself


## Comparison to Underscore.js

### Iteration methods

**Underscore.js:**

	_.each(array, predicateFunction, [context]);
	_.map(array, predicateFunction, [context]);
	_.filter(array, predicateFunction, [context]);
	_.some(array, predicateFunction, [context]);
	_.every(array, predicateFunction, [context]);
	_.find(array, predicateFunction, [context]);
	_.findIndex(array, predicateFunction, [context]);
	_.reduce(array, predicateFunction, [context]);
	_.reduceRight(array, predicateFunction, [context]);

**FClass encourages to use native JavaScript methods:**

	array.forEach(predicateFunction, [context]);
	array.map(predicateFunction, [context]);
	array.filter(predicateFunction, [context]);
	array.some(predicateFunction, [context]);
	array.every(predicateFunction, [context]);
	array.find(predicateFunction, [context]);
	array.findIndex(predicateFunction, [context]);
	array.reduce(predicateFunction, [context]);
	array.reduceRight(predicateFunction, [context]);
	
### Case 1: Objects as array items

Filter out all objects from array items that do not contain given properties.

**Underscore.js:**

	_.where(array, { interest: 'math', age: 22 });

**FClass:**

	array.filter(FC.has({ interest: 'math', age: 22 }))
	
#### FClass advantages ####

**1) functionality as a first-class function**

We don't have to stick to strict 'where' functionality. We can easily change it later to entirely different predicate, store it or parametrize it. We can abstract the predicate function away from the processing method.

	var predicate = FC.has({ interest: 'math', age: 17 })
	var mathStudents = students.filter(predicate);
	
	// change the predicate to custom function
	predicate = function(x) { return x.age > 22; };
	
	// re-apply the same filtering
	mathStudents = students.filter(predicate);

**2) processing can be optimized**

We can compose functionality from different methods, rather then concurrently apply different methods. 

    var predicates = [];
	predicates.push(FC.has({ interest: 'math' }));
	predicates.push(function(x) { return x.age > 22; });
	
	// compose the predicate function and apply filtering only once
	var mathStudents = students.filter(predicates.reduce(FC.andFunctions));


**3) functionality can be extended**

Different parts of processing can be decoupled. We don't have to duplicate functionality where it is used in a slightly different way.
It gives us a lot more flexibility - during development and in run-time.

    var getName = FC.value("name");
    var comparison = FC.identity("John");
        
	var selectedStudents = students.filter(FC.compose(getName, comparison);
	
	comparison = startsWith("J");
	
	// re-apply the same filtering 
	selectedStudents = students.filter(FC.compose(getName, comparison));
	

**4) custom functions can be easily constructed**

All that is needed can be built on the fly, or packaged in custom libraries.

    // the startsWith() method from the above example can be built
    
    var stringStartsWith = function (text, searchString) {
        return text.indexOf(searchString, 0) === 0;
    };
    
    var startsWith = FC.curry(1, stringStartsWith);
    
    ["John", "Jeff", "Douglas"].filter(startsWith("J"));
    

