module.exports = {
    badRequest: function badRequest(response) {
        response.writeHead(400, {
            'Content-Type': 'text/plain; charset=UTF-8'
        });
        response.end('400 Bad request');
    },
    created: function created(response) {
        response.writeHead(201, {
            'Content-Type': 'text/plain; charset=UTF-8'
        });
        response.end('201 Created');
    },
    showData: function showData(response, data) {
        response.writeHead(200, {
            'Content-Type': 'application/json; charset=UTF-8'
        });
        response.end(JSON.stringify(data));
    },
    pageNotFound:function pageNotFound(response){
        response.writeHead(404, {
            'Content-Type': 'text/plain; charset=UTF-8'
        });
        response.end('404 Page not found');
    }
};
