
var http = require('http');
var elet = require('elet');

elet.config({
    templateEngine: 'swig',
    controllerDir: __dirname + '/controller',
    viewsMap: __dirname + '/view',
    viewExtension: 'html',
    debugMode: true
});

http.createServer(function (request, response) {
    elet.init(request, response);
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');