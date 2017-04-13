"use strict";

var express = require("express");
var http = require("http");
var path = require("path");
var os = require("os");

function Server(){

};

Server.prototype.getIntranetIp = function(){
    var ip = null;
    var ifaces = os.networkInterfaces();  
    for (var dev in ifaces) {  
        var alias = 0;  
        ifaces[dev].forEach(function(details){  
            if (details.family == "IPv4" && details.address !== "127.0.0.1") {
                ip = details.address; 
            }  
        });  
    }
    return ip;
}

/**
* Http server
*/
Server.prototype.httpServer = function(){
    this.getIntranetIp();
    //const
    var IP = this.getIntranetIp();
    var PORT = "9078";

    //express server
    var server = express();
    //static folder
    server.use("/", express.static(path.join(__dirname, "../../", "app")));
    //http server
    var httpserver = http.Server(server);
    httpserver.listen( PORT, IP, function(){
        console.log("Http Server Run : http://" + IP + ":" + PORT);
    });

    return httpserver;
};

/**
* Start server
*/
Server.prototype.init = function(){
    this.httpServer();
};

//startup
var ap = new Server();
ap.init();
