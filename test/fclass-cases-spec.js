describe('FC', function () {


    describe('Objects as array items', function () {

        it('functionality as a first-class function with FC.has()', function () {

            var maths = {
                allStudents: students,
                predicate: function () {
                    return true;
                },
                getStudents: function () {
                    return this.allStudents.filter(this.predicate);
                }
            };

            // by default the predicate includes all students
            expect(maths.getStudents()).toEqual(students);

            // set the predicate to match specific properties
            maths.predicate = FC.has({interest: 'math', age: 17});

            expect(maths.getStudents()).toEqual([
                {interest: 'math', age: 17, name: "Brendan"}
            ]);

            // change the predicate to a custom function
            maths.predicate = function (x) {
                return x.age > 22;
            };

            expect(maths.getStudents()).toEqual([
                {interest: 'cars', age: 28, name: "Peter"},
                {interest: 'programming', age: 26, name: "Dustin"},
                {interest: 'math', age: 51, name: "John"},
                {interest: 'math', age: 34, name: "Jeremy"},
                {interest: 'programming', age: 33, name: "Brad"},
                {interest: 'math', age: 26, name: "Dean"},
                {interest: 'programming', age: 45, name: "Lukas"}
            ]);

        });


        it('processing can be optimized with FC.addFunctions()', function () {

            var maths = {
                allStudents: students,
                predicates: [function () {
                    return true;
                }],
                getStudents: function () {
                    return this.allStudents.filter(this.predicates.reduce(FC.andFunctions));
                }
            };

            // by default the predicate includes all students
            expect(maths.getStudents()).toEqual(students);

            // add the predicate to match specific properties
            maths.predicates.push(FC.has({interest: 'math'}));

            // add another custom predicate
            maths.predicates.push(function (x) {
                return x.age > 22;
            });

            expect(maths.getStudents()).toEqual([
                {interest: 'math', age: 51, name: "John"},
                {interest: 'math', age: 34, name: "Jeremy"},
                {interest: 'math', age: 26, name: "Dean"}
            ]);

        });


        it('functionality can be extended with FC.compose()', function () {

            var alphabet = {
                firstHalf: function (name) {
                    var firstLetter = name[0].toLowerCase();
                    return firstLetter >= 'a' && firstLetter <= 'm';
                }
            };

            var maths = {
                allStudents: students,
                predicate: function () {
                    return true;
                },
                getStudents: function () {
                    return this.allStudents.filter(this.predicate);
                }
            };

            // by default the predicate includes all students
            expect(maths.getStudents()).toEqual(students);

            // add the predicate to match a specific name
            maths.predicate = FC.value('name', 'John');
            // or
            maths.predicate = FC.compose(FC.value('name'), FC.identity('John'));

            expect(maths.getStudents()).toEqual([
                {interest: 'math', age: 51, name: "John"}
            ]);

            // change the predicate to match the first half of the alphabet
            maths.predicate = FC.compose(FC.value('name'), alphabet.firstHalf);

            expect(maths.getStudents()).toEqual([
                {interest: 'math', age: 22, name: "Jeff"},
                {interest: 'math', age: 17, name: "Brendan"},
                {interest: 'programming', age: 18, name: "David"},
                {interest: 'math', age: 14, name: "Douglas"},
                {interest: 'programming', age: 26, name: "Dustin"},
                {interest: 'math', age: 51, name: "John"},
                {interest: 'math', age: 34, name: "Jeremy"},
                {interest: 'programming', age: 33, name: "Brad"},
                {interest: 'math', age: 22, name: "Julie"},
                {interest: 'cars', age: 14, name: "Dmitry"},
                {interest: 'math', age: 26, name: "Dean"},
                {interest: 'programming', age: 45, name: "Lukas"}
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

