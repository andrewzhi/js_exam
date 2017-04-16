"use strict";

var AppExam = (function(module){
    
    /**
    * Exam class
    * @type Class
    * @returns {Object} Api object
    */
    function Exam(){
        console.info("Exam module import completed.");
    }
    
    // ========================================================================
    
    /**
    * Reverse string
    * @type Function
    * @param {String} str Input value
    * @returns {String} A string
    */
    Exam.prototype.answer1 = function(str){
        return (str === "") ? "" : this.answer1(str.substr(1)) + str.charAt(0);
    };
    
    // ========================================================================
    
    /**
    * Check input number is a perfect square
    * @type Function
    * @param {Number} num Input value
    * @returns {Boolean} If the number is a perfect square
    */
    Exam.prototype.answer2 = function(num){
        for (var i = 1; i <= num / i; ++i) {
            if (i * i == num) {return true;}
        }
        
        return false;
    };
    
    // ========================================================================
        
    /**
    * Insert a new interval into the intervals class
    * @type Class
    * @returns {Object} Api object
    */
    function Answer3(){
    
    }
        
    /**
    * Insert and merge interval
    * @type Function
    * @param {Array} intervals The group of interval object
    * @param {Object} newInterval Interval object
    * @returns {Array} New array
    */
    Answer3.prototype.insert = function(intervals, newInterval){
        var result = [];
 
        for(var i=0; i<intervals.length; i++){
            var interval = intervals[i];
            if(interval.end < newInterval.start){
                result.push(interval);
            } else if(interval.start > newInterval.end){
                result.push(newInterval);
                newInterval = interval;        
            } else if(interval.end >= newInterval.start ||
					  interval.start <= newInterval.end){
                newInterval = new this.Interval(
					Math.min(interval.start, newInterval.start), 
					Math.max(newInterval.end, interval.end)
				);
            }
        }
        result.push(newInterval);
        
        return result;
    };
    
    /**
    * Build interval class
    * @type Class
    * @param {Number} start Start number, must > end number
    * @param {Number} end End number, must < start number
    * @returns {Object} Interval object,
    *                   start: {Number} start nember,
    *                   end: {Number} end nember
    */
    Answer3.prototype.Interval = function(start, end){
        this.start = start;
        this.end = end;
    };
    
    /**
    * Instances answer3 created from Answer3 class
    * @type Object
    * @returns {Object} answer2 object,
    *                   insert: {Function} insert method,
    *                   Interval: {Function} Build interval class
    */
    Exam.prototype.answer3 = new Answer3();
    
    // ========================================================================
    
    /**
    * Find if the word exists in the grid.
    * @type Function
    * @param {Array[][]} grid
    * @param {String} str
    * @return {Boolean}
    */
    Exam.prototype.answer4 = function(grid, str){
        if(str === "") {return true;}
        
        function check(index, x, y){
            if(index === str.length) {return true;}
            if(!grid[x] || !grid[x][y]) {return false;}
            
            if(grid[x][y] !== "#" && grid[x][y] === str[index]){
                var ch = grid[x][y];
                grid[x][y] = "#";
                if(check(index + 1, x - 1, y)) {return true;}
                if(check(index + 1, x + 1, y)) {return true;}
                if(check(index + 1, x, y - 1)) {return true;}
                if(check(index + 1, x, y + 1)) {return true;}
                grid[x][y] = ch;
            }
            
            return false;
        }
        
        for(var i = 0; i < grid.length; i++){
            for(var j = 0; j < grid[i].length; j++) {
                if(grid[i][j] === str[0]) {
                    if(check(0, i, j)) {return true;}
                }
            }
        }
        
        return false;
    };
    
    // ========================================================================
    
    /**
    * Calculate the sum of two integers
    * @type Function
    * @param {Number} numA Input number1
    * @param {Number} numB Input number2
    * @return {Number}
    */
    Exam.prototype.answer5 = function(numA, numB){
        if(numB === 0){return numA;}
        if(numA === 0){return numB;}  
    
        while(numB != 0){
            var carry = numA & numB;
            numA = numA ^ numB;
            numB = carry << 1;
        }
        
        return numA;
    };
    
    // ========================================================================
    
    module.exam = new Exam();
        
   	return module;

})(AppExam || {});
