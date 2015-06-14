describe('FC', function () {


    describe('Objects as array items', function () {

        it('functionality as a first-class function with FC.has()', function () {

            var mathClasses = {
                allStudents: students,
                predicate: function (x) {
                    return x;
                },
                getStudents: function () {
                    return this.allStudents.filter(this.predicate);
                }
            };

            // by default the predicate includes all students
            expect(mathClasses.getStudents()).toEqual(students);

            // set the predicate to match specific properties
            mathClasses.predicate = FC.has({interest: 'math', age: 17});

            expect(mathClasses.getStudents()).toEqual([
                {interest: 'math', age: 17, name: "Brendan"}
            ]);

            // change the predicate to a custom function
            mathClasses.predicate = function (x) {
                return x.age > 22;
            };

            expect(mathClasses.getStudents()).toEqual([
                {interest: 'cars', age: 28, name: "Peter"},
                {interest: 'programming', age: 26, name: "Dustin"},
                {interest: 'math', age: 51, name: "John"},
                {interest: 'math', age: 34, name: "Jeremy"},
                {interest: 'programming', age: 33, name: "Brad"},
                {interest: 'math', age: 26, name: "Dean"},
                {interest: 'programming', age: 45, name: "Lukas"}
            ]);

        });


        it('processing can be build from various parts', function () {

            var mathClasses = {
                allStudents: students,
                predicates: [function (x) {
                    return x;
                }],
                getStudents: function () {
                    return this.allStudents.filter(this.predicates.reduce(FC.andFunctions));
                }
            };

            // by default the predicate includes all students
            expect(mathClasses.getStudents()).toEqual(students);

            // add the predicate to match specific properties
            mathClasses.predicates.push(FC.has({interest: 'math'}));

            // add another custom predicate
            mathClasses.predicates.push(function (x) {
                return x.age > 22;
            });

            expect(mathClasses.getStudents()).toEqual([
                {interest: 'math', age: 51, name: "John"},
                {interest: 'math', age: 34, name: "Jeremy"},
                {interest: 'math', age: 26, name: "Dean"}
            ]);

        });

    });

    // ------------------------- data ---------------------------

    var students = [
        {interest: 'math', age: 22, name: "Jeff"},
        {interest: 'math', age: 17, name: "Brendan"},
        {interest: 'programming', age: 18, name: "David"},
        {interest: 'cars', age: 28, name: "Peter"},
        {interest: 'math', age: 16, name: "Paul"},
        {interest: 'math', age: 14, name: "Douglas"},
        {interest: 'games', age: 17, name: "Nicholas"},
        {interest: 'programming', age: 26, name: "Dustin"},
        {interest: 'math', age: 51, name: "John"},
        {interest: 'math', age: 34, name: "Jeremy"},
        {interest: 'programming', age: 33, name: "Brad"},
        {interest: 'math', age: 22, name: "Julie"},
        {interest: 'cars', age: 14, name: "Dmitry"},
        {interest: 'math', age: 26, name: "Dean"},
        {interest: 'programming', age: 22, name: "Thomas"},
        {interest: 'games', age: 19, name: "Rebecca"},
        {interest: 'programming', age: 45, name: "Lukas"}
    ];

});

