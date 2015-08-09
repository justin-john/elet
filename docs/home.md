Guide
=====

### Config

```javascript
elet.config({
    templateEngine: 'swig', // [REQUIRED] - 'jade', 'ejs', 'hogan' etc. No Defaults settings
    controllerDir: __dirname + '/controller', // [OPTIONAL] - Declare controller directory, defaults to "/controller"
    viewDir: __dirname + '/view', // [OPTIONAL] - Declare view directory, defaults to "/view"
    webrootDir: __dirname + '/webroot', // [OPTIONAL] - Declare webroot directory, defaults to "/webroot"
    viewExtension: 'html' // [OPTIONAL] - Must set this property in order to use html extension in view files instead of 'swig' or 'ejs' extension.
    errorFilePath: __dirname + '/view/error.html', // [OPTIONAL] - Declare a custom error html file to override default error content
    debugMode: true // [OPTIONAL] - Errors and waring are logged, defaults to false
});
```

* Template Engine: This will set default javascript templating engine.
* Controller Directory: Set path for controller directory using this property.
* View Directory: Set path for view directory using this property.
* Webroot Directory: The webroot folder path is set using this property. Folder here used to holding places for
 CSS stylesheets, images, JavaScript files etc. All files in this folder can be publicly accessed.
* View Extension: Used to set view directory files file extensions. So `injex.swig` will be created as `index.html`.
* Error File Path: Declare a custom error html file path to override default error content in elet.
* Debug Mode: Errors and waring are logged, defaults to false.

#### Supported template engines

* EJS         `npm install ejs`
* Swig        `npm install swig`
* Jade        `npm install jade`
* Hogan       `npm install hogan.js`
* Mustache    `npm install mustache`

Above configs can used before elet initialisation. 

### Accessing request parameters

The request object is injected with some helpful methods and properties in elet core. The request argument in action
method should posses all these methods are properties. All these methods and properties are added in one property in
request object called "params". So `request.params` can be used in action method
```javascript
var _index = function(req, res) {
    /** "req" as request and "res" as response object arguments
     *  "req.params" will be used in this sample code to access request parameters
     */
};
```
The method can access req.params to get different properties in request.


**request.params.controller** The controller name

**request.params.action** The action method name

**request.params.data** Form data can be accessed through this property. We can use this property to access
 Form data in POST/PUT/DELETE methods as well as querystring in GET method.

**request.params.pass** The passed argument are accessed. For ex "/articles/view/1", here 1 will be accesed by this property.

**request.params.isAjax** Check ajax or not

**request.params.is** Inspecting the request, check request methods "GET", "POST" etc. The method receives an argument.
There are several built-in detectors that you can use:

* **is('get')** Check to see whether the current request is a GET.

* **is('put')** Check to see whether the current request is a PUT.

* **is('post')** Check to see whether the current request is a POST.

* **is('delete')** Check to see whether the current request is a DELETE.

* **is('head')** Check to see whether the current request is HEAD.

* **is('options')** Check to see whether the current request is OPTIONS.

* **is('ajax')** Check to see whether the current request came with X-Requested-With = XMLHttpRequest.


### Sample App Structure
```
  application root/
        ├── webroot/
        │   ├── images/
        │   │   ├── logo.gif
        │   │   └── home.png
        │   ├── css/
        │   │   ├── bootstrap.css
        │   │   └── application.css
        │   └── js/
        │        ├── bootstrap.js
        │        └── application.js
        ├── view/
        │   ├── articles/
        │   │   ├── index.html
        │   │   └── view.html
        │   └── index/
        │        ├── index.html
        │        └── view.html
        ├── controller/
        │   ├── articles.js
        │   └── index.js
        └── app.js
```

###Sample Files
##### app.js
```javascript
var http = require('http');
var elet = require('elet');

elet.config({
    templateEngine: 'swig',
    controllerDir: __dirname + '/controller',
    viewsDir: __dirname + '/view',
    webrootDir: __dirname + '/webroot',
    viewExtension: 'html',
    debugMode: true
});

http.createServer(function (request, response) {
    elet.init(request, response);
}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
```

##### articles.js
```javascript
module.exports = (function () {
    var _index = function(req, res) {
        var locals = {
            title: 'Index',
            test: 'test cvc justin',
            users: ['Gewrt', 'Jim', 'Jane'],
            pagename: 'awesome people locals',
            authors: ['Paul', 'Jim', 'Jane'],
            params: JSON.stringify(req.params)
        };
        res.render('index', locals);

    }, _add = function(req, res) {
        var locals = {
            title: 'A JSON format data returned, Normally used in AJAX response data',
            pagename: 'awesome people locals',
            authors: ['Paul', 'Jim', 'Jane'],
            params: req.params
        };
		res.json(locals);
    }, _swigtojade = function(req, res) {
        var controllerData = {
            title: 'Test',
            pagename: 'awesome peoplexz',
            authors: ['Paul', 'Jim', 'Jane'],
            params: req.params
        };
        /* Override default template engine to another */
        res.render('home', controllerData, 'jade');
    }, _contact = function(req, res) {
        var locals = {
            title: 'Contact',
            pagename: 'awesome people',
            authors: ['Justin', 'John', 'Mathews'],
            params: req.params
        };
        var data = res.getParsedFileData('view/index/home.html', locals);
        res.resWriteEnd(200, 'text/html', data, 'utf-8');
    };

    return {
        index: _index,
        add: _add,
        swigtojade: _swigtojade,
        contact: _contact
    }
})();
```
This controller file handles following URL's routes.

 _`/articles`_ or _`/articles/index`_:   Hit articles controller and call action method "index". The `res.render` will render html from `view/articles/index.html`.
 
 _`/articles/add`_:   Hit articles controller and call action method "add". The `res.json` will return JSON response.

 _`/articles/swigtojade`_:   Hit articles controller and call action method "swigtojade". The `res.render` will render
  html from `view/articles/home.html`, but it will override default templating engine "swig" to "jade".

 _`/articles/contact`_:  Hit articles controller and call action method "contact". The `res.resWriteEnd` will return response with any content type. Here 'text/html' or plain html as content type.
