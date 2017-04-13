"use strict";

var fs  = require("fs");
var path = require("path");
var uglifyjs = require("uglify-js");
var cheerio = require('cheerio');

function Combine(){
	//process envirement agriments
	this.app = "";
    if (process.argv.length >= 3){
        this.app = process.argv[2];
    };
	this.jsout = null;
    this.init();
};

/**
* load js files in html
* @type Function
* @param {String} htmlPath Html path
* @param {Function} act Callback function
* @api public
*/
Combine.prototype.InputJs = function(htmlPath, act){    
    fs.readFile(htmlPath, "utf8", function (err, data) {
        if (err) {throw err;};
        
        var $ = cheerio.load(data);
		ap.jsout = $("script[data-dev-mini]")[0].attribs["data-dev-mini"];
		var ary = [];
        var list = $("script[data-dev]");
        for(var i = 0, k = list.length; i < k; i++){
            var filename = list[i].attribs.src;
            ary.push(filename);
        };        
        act(ary);
    });
};

/**
* Output single js file minied
* @type Function
* @param {Array} list Js list
* @param {String} The path of output js
* @api public
*/
Combine.prototype.outputJs = function(list, outputFile){
    var result = uglifyjs.minify(list);	
    fs.writeFileSync(outputFile, result.code, "utf8");
    console.log("Write " + outputFile + " completed");
};

/**
* Action When parser js path successful from html file
* @param {Array} result List of js files
* @api public
*/
Combine.prototype.getJsCompleteAct = function(result){
    //output
    var basePath = path.normalize(path.join(__dirname, "../../",
                   "app", ap.app));
    var outFile = path.join(basePath, "js", ap.jsout);
    //input
    for(var i = 0, k = result.length; i < k; i++){
        result[i] = path.join(basePath, result[i]);
    };

    //combine
    ap.outputJs(result, outFile);
};

/**
* Init app
* @type Function
* @api public
*/
Combine.prototype.init = function(){
    //input
    var htmlPath = path.normalize(path.join(__dirname, "../../",
                   "app", this.app, "index_dev.html"));
    this.InputJs(htmlPath, this.getJsCompleteAct);
};

var ap = new Combine();

exports = module.exports = ap;
