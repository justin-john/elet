Elet
=====

[CakePHP](http://cakephp.org) inspired micro framework in Node.js. Elet makes building web applications simpler, faster and require less code.

## Installation

```bash
$ npm install elet
```

## Get Started

#### Routing
Elet default routing is very similar CakePHP's default routing.
You can access an action directly via the URL by putting its name in the request.
You can also pass parameters to your controller actions using the URL.
```
URL pattern default routes:
http://example.com/controller/action/param1/param2/param3
```

A very basic Elet app requires `app.js` to initialise elet module and controller file, which receives route control.
We consider a sample url route "http://example.com/articles/view" .

#####  app.js
```javascript
var http = require('http');
var elet = require('elet');

elet.config({
    templateEngine: 'swig',
    controllerDir: __dirname + '/controller',
    viewDir: __dirname + '/view',
    viewExtension: 'html'
});

http.createServer(function (request, response) {
  elet.init(request, response);
}).listen(3000);
```

The elet application will listen on port 3000.
The `elet` will use some configs to set the application. It will initialise the template engine, controller and view directories, custom error file etc in application. The elet supports [swig](http://paularmstrong.github.io/swig), [jade](http://jade-lang.com/) and [ejs](http://embeddedjs.com/) template engines. The npm module of template engine needs to required/installed in your application.
Read more about [config](https://github.com/justin-john/elet/blob/master/docs/home.md#config) on guide.

##### Sample controller File (controller/articles.js)
```javascript
exports.view = function () {
    var locals = {
        title: 'Index',
        authors: ['Paul', 'Jim', 'Jane'],
        params: JSON.stringify(req.params)
    };
    res.render('index', locals);
}
```

The URL route "http://example.com/articles/view" will hit articles controller(articles.js) and call view method. The request(`req`) argument provide certain useful methods and properties in view method in `req.params`. The `view` method will render a template "index" from "view/articles" directory by calling `res.render` method.
See more details about [request object injected methods and properties](https://github.com/justin-john/elet/blob/master/docs/home.md#accessing-request-parameters) and application [structure](https://github.com/justin-john/elet/blob/master/docs/home.md#sample-app-structure).

By using above files we can start to create an application.

In examples folder of this repo, there is an example usage of elet in an application. Please refer [doc](https://github.com/justin-john/elet/blob/master/examples/README.md) for set up the example application.

### Guide

Visit [docs](https://github.com/justin-john/elet/blob/master/docs/home.md).

### Working of elet

When user access a route(request url) like "localhost:3000/index/contact", the request first passes to "index" controller and call action method "contact". The action method then call `response.render` method to render a view.

#### Some routing examples

| URL                          | Request Method  | Controller | Action Method   |
|------------------------------|:----------------|------------|:---------------:|
| localhost:3000               | GET             |      index | index           |
| localhost:3000/index/add     | POST            |      index | add             |
| localhost:3000/index/contact | GET/POST        |      index | contact         |
| localhost:3000/register/add  | GET/POST        |   register | add             |

### API Reference

##### response.render(view, [locals object]);
Renders a view and sends the rendered HTML string to the client.
Parameters:

view, The template name that needs to render. If skipped or give locals as first argument in render. The method will look in view directory with action named file is present and automatically render the template.

locals, an object whose properties define local variables for the view.

If both parameters are omitted. The method will look in view directory with action named file is present and automatically render the template.

#####response.json([locals object])
Sends a JSON response

#####response.resWriteEnd(code, contentType, data, encode)
Sends a response with respect to passed arguments  http status code, content type, data and encode. This method can be used to generate response with any content type like "application/json", "application/xml" etc.

Parameters:

code, It will be http status code. The code "200" for status "OK", "404" for "Not found" etc.

contentType, The content type like "application/json", "application/xml" etc can be passed.

data, This argument will be fetched data that needs to be passed to response.

encode, Optional. This is a character encoding.  Defaults to `utf8`.


#####response.getParsedFileData(path, [locals object], encode)
This method returns data parsed by object to create dynamic file content from template engines. The arguments will `path`
for file path, `locals` the objects which parse in file for creating dynamic file and `encoding` is optional, which defaults
to `utf8` encoding.

### Relases Notes

Want to improve the elet, please don’t hesitate to fork and make a [Pull Request](https://github.com/justin-john/elet/pulls). If you have any questions, thoughts, concerns or feedback, please don't hesitate to create an [issue](https://github.com/justin-john/elet/issues).
Your suggestions are always welcome!

## License

The MIT License (MIT)

Copyright (c) 2015 Justin John Mathews <justinjohnmathews@gmail.com>
