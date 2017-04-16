"use strict";

var AppExam = (function(module){
    
    /**
    * Question class
    * @type Class
    * @returns {Object} Api object
    */
    function Question(){
        console.info("Question module import completed.");
    }

    // ========================================================================
    
    /**
    * Demo reverse string
    * @description Example: Given s = hello, return olleh.
    * @type {Function} Question method
    */
    Question.prototype.run1 = function(){
        
        var example1 = "hello";
        
        //you can try it
        var example2 = "";
        
        console.info("Q1.1\n", module.exam.answer1(example1));
        console.info("Q1.2\n", module.exam.answer1(example2));
    };
    
    // ========================================================================
    
    /**
    * Demo square number
    * @description Example 1: Input: 16 Returns: True.
    *              Example 2: Input: 14 Returns: False
    * @type {Function} Question method
    */
    Question.prototype.run2 = function(){
        
        var example1 = 16;
        var example2 = 14;
        
        //you can try it
        var example3 = 0;
        
        console.info("Q2.1\n", module.exam.answer2(example1));
        console.info("Q2.2\n", module.exam.answer2(example2));
        console.info("Q2.3\n", module.exam.answer2(example3));
    };
    
    // ========================================================================
    
    /**
    * Demo insert and merge interval
    * @description Example 1: Given intervals [1,3],[6,9],
    *                         insert and merge [2,5] in as [1,5],[6,9].
    *              Example 2: Given [1,2],[3,5],[6,7],[8,10],[12,16],
    *                         insert and merge [4,9] in as [1,2],[3,10],[12,16].
    * @type {Function} Question method
    */
    Question.prototype.run3 = function(){
                
        var Interval =  module.exam.answer3.Interval;
        
        var example1 = {
            intervals: [
                new Interval(1, 3),
                new Interval(6, 9)
            ],
            newInterval: new Interval(2, 5)
        };
        var example2 = {
            intervals: [
                new Interval(1, 2),
                new Interval(3, 5),
                new Interval(6, 7),
                new Interval(8, 10),
                new Interval(12, 16)
            ],
            newInterval: new Interval(4, 9)
        };
        
        //you can try it
        var example3 = {
            intervals: [],
            newInterval: new Interval()
        };
        
        console.info("Q3.1\n", module.exam.answer3.insert(example1.intervals, example1.newInterval));
        console.info("Q3.2\n", module.exam.answer3.insert(example2.intervals, example2.newInterval));
        console.info("Q3.3\n", module.exam.answer3.insert(example3.intervals, example3.newInterval));
    };
    
    // ========================================================================
    
    /**
    * Demo Find if the word exists in the grid
    * @description Example: Given board = [
    *                               ["A", "B", "C", "E"], 
    *                               ["S", "F", "C", "S"], 
    *                               ["A", "D", "E", "E"]] 
    *                       word = "ABCCED", -> returns true,
    *                       word = "SEE",  -> returns true,
    *                       word = "ABCB", -> returns false.
    * @type {Function} Question method
    */
    Question.prototype.run4 = function(){
        
        var example1 = {
            grid: [
                ["A", "B", "C", "E"], 
                ["S", "F", "C", "S"], 
                ["A", "D", "E", "E"]
            ],
            strAry: [
                "ABCCED",
                "SEE",
                "ABCB"
            ]
        };
        
        //you can try it
        var example2 = {
            grid: [],
            strAry: []
        };

        for(var a in example1.strAry){
            console.info("Q4.1." + (Number(a) + 1) + "\n", module.exam.answer4(example1.grid, example1.strAry[a]));
        }
        for(var a in example2.strAry){
            console.info("Q4.2." + (Number(a) + 1) + "\n", module.exam.answer4(example2.grid, example2.strAry[a]));
        }
    };
    
    // ========================================================================
    
    /**
    * Demo calculate the sum of two integers
    * @description Example: Given a = 1 and b = 2, return 3.
    * @type {Function} Question method
    */
    Question.prototype.run5 = function(){
        var example1 = {
            numA: 1,
            numB: 2
        };
        
        //you can try it
        var example2 = {
            numA: 0,
            numB: 0
        };
        
        console.info("Q5.1\n", module.exam.answer5(example1.numA, example1.numB));
        console.info("Q5.2\n", module.exam.answer5(example2.numA, example2.numB));
    };
    
    // ========================================================================
    
    module.question = new Question();
    
    for(var a in module.question){
        try {
            var fn = module.question[a];
            fn();
        } catch(err){
            console.error(err);
        }
    }
    
   	return module;

})(AppExam || {});
