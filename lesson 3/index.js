var http = require('http');
var url = require('url');
var routes = require('./routes');
var responses = require('./lib/responses');

http.createServer(function (request, result) {

    var requestedPage = url.parse(request.url).pathname;
    var method = request.method.toLowerCase();

    if (routes[method][requestedPage]) {
        routes[method][requestedPage](request, result, function (data) {
            switch (data.status) {
                case 201:
                    responses.created(result);
                    break;
                case 400:
                    responses.badRequest(result);
                    break;
                case 200:
                    responses.showData(result, data.users);
                    break;
            }
        });
    } else {
        responses.pageNotFound(result);
    }
}).listen(3000, "");