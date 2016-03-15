"use strict";

let counter = 0;

module.exports = function handler (req, res, next) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if(req.url=="/index.html"){
        res.end("Привіт, світ!");
        counter++;
    }
    else if(req.url=="/count.html"){
        res.end("Index.html показувалась: " +counter+" разів");
    }
    else res.end("404 page not found");

};
