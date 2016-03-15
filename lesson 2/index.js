"use strict";

const http = require("http"),
    handler = require("./module");

let server = http.createServer(handler).listen(3000);
