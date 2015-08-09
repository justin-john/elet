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
    webrootDir: __dirname + '/webroot',
    viewExtension: 'html'
});

http.createServer(function (request, response) {
  elet.init(request, response);
}).listen(3000);
```

The elet application will listen on port 3000.
The `elet` will use some configs to set the application. It will set config for the template engine and controller, view, webroot directory paths, custom error file path etc in application. The elet supports certain template engines like [swig](http://paularmstrong.github.io/swig), [jade](http://jade-lang.com/), [ejs](http://ejs.co/) etc.
All supported template engines are listed [here](https://github.com/justin-john/elet/blob/master/docs/home.md#supported-template-engines).
The npm module of template engine needs to required/installed in your application. Webroot Directory serve as holding places for CSS stylesheets, images, JavaScript files etc and statically served files.
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
See more details about [request object injected methods and properties](https://github.com/justin-john/elet/blob/master/docs/home.md#accessing-request-parameters) and [application structure](https://github.com/justin-john/elet/blob/master/docs/home.md#sample-app-structure).

By using above files we can start to create an application.

In examples folder of this repo, there is an example usage of elet in an application. Please refer [doc](https://github.com/justin-john/elet/blob/master/examples/README.md) for set up the example application.

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

##### response.render(view, [locals object], templateEngine)
Renders a view and sends the rendered HTML string to the client.

Parameters:
* View: The template name that needs to render. If skipped or give locals as first argument in render. The method will look in view directory with action named file is present and automatically render the template.
* Locals: An object whose properties define local variables for the view.
* TemplateEngine: A string used render with different template engine than config defined default template engine. If swig is
default template engine in application then this property to override to jade/ejs template engine only for
corresponding request. If templateEngine is given, then we must give all other arguments that is view string and locals
object in response.render method. Remember, this templateEngine given must be required before using in application.

If all arguments are omitted, the method will look in view directory with action named file is present and automatically render the template.

#####response.json([locals object])
Sends a JSON response

#####response.resWriteEnd(code, contentType, data, encode)
Sends a response with respect to passed arguments  http status code, content type, data and encode. This method can be used to generate response with any content type like "application/json", "application/xml" etc.

Parameters:
* Code: It will be http status code. The code "200" for status "OK", "404" for "Not found" etc.
* ContentType: The content type like "application/json", "application/xml" etc can be passed.
* Data: This argument will be fetched data that needs to be passed to response.
* Encode: Optional. This is a character encoding.  Defaults to `utf8`.


#####response.getParsedFileData(path, [locals object], encode)
This method returns data parsed by object to create dynamic file content from template engines. The arguments will `path`
for file path, `locals` the objects which parse in file for creating dynamic file and `encoding` is optional, which defaults
to `utf8` encoding.

### Additional Documentation

Visit additional documentation [here](https://github.com/justin-john/elet/blob/master/docs/home.md).


### Contributing

Please have look in Elet and let me know how I can improve it. Your suggestion will be highly appreciated. If any one of you like to contribute with your ideas, please do not hesitate to
create an [issue](https://github.com/justin-john/elet/issues) or make a [pull request](https://github.com/justin-john/elet/pulls) in repository.
If you like to contact me, please come at <justinjohnmathews@gmail.com>.

### Notes

The *v0.2.0* have made change in [application structure](https://github.com/justin-john/elet/blob/master/docs/home.md#sample-app-structure) which was existed in *v0.1.x*.


## License

The MIT License (MIT)

Copyright (c) 2015 Justin John Mathews <justinjohnmathews@gmail.com>
