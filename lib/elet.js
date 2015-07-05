/**
 * An internal router for CakeNode
 *
 * @param {Object} request
 * @param {Object} response
 * @api public
 */

module.exports = (function(request, response) {
    var _CONF,
		_CONST = require('./constants'),
		_UTIL = require('./utilities'),
		_TEMPLATE = require('./template');

	/* Debug Methods */
	var dbg  = {
		log : console.log, 
		warn : console.warn,
		info : console.info,
		err : console.error
	}
	
    var _get = function (request, response, reqDetail, reqMethod, params) {
		dbg.log('Triggered _get Method: ');
        if (!reqDetail.reqParam.ext) {
            if (reqDetail.reqParam.hasModuleController && _UTIL.isAlpha(reqDetail.reqParam.controller) && _UTIL.isAlpha(reqDetail.reqParam.actionMethod)) {
                if (reqDetail.reqParam.actionMethod && typeof reqDetail.reqParam.moduleController[reqDetail.reqParam.actionMethod] === 'function') {
                    request.params = {
                        controller : reqDetail.reqParam.controller,
                        action : reqDetail.reqParam.actionMethod,
                        pass : _UTIL.passParams(reqDetail.url),
                        isAjax : request.xhr || request.headers.accept.indexOf('json') > -1 ? true : false,
                        is: function (v) { return _UTIL.buildInDetectors(v, request) },
                        url : _UTIL.urlParams(reqDetail.url),
                        query : _UTIL.queryParams
                    }
                    return reqDetail.reqParam.moduleController[reqDetail.reqParam.actionMethod](request, response);
                } else {
                    dbg.err('ERROR: No method called ' + reqDetail.reqParam.actionMethod + ' is found!');
                }
            } else if (!_UTIL.isAlpha(reqDetail.reqParam.controller) || !_UTIL.isAlpha(reqDetail.reqParam.actionMethod)) {
                dbg.err('ERROR: The controller or action needs to have valid name!');
            }
        }
     };

    var _fetchParsedBody =  function (reqDetail, request) {
		dbg.log('Triggered _fetchParsedBody Method: ', reqDetail.path);
        var querystring = require('querystring');
        var str = reqDetail.url.split('?')[1];
        return str ? querystring.parse(str) : null;
    };

    var _fetchDecodedBody =  function (reqDetail, request) {
		dbg.log('Triggered _fetchDecodedBody Method: ', reqDetail.path);
        var querystring = require('querystring');
        var chunkedData = '';
        request.on('data', function(chunk) {
            chunkedData += chunk.toString();
        });
        return querystring.parse(chunkedData);
    };

    var _fetch = function(reqDetail, contentType, request, response) {
		dbg.log('Triggered _fetch Method: ', reqDetail, contentType);
        if (contentType.ext == '.html') {
            var _fetchBodyParams;
            if (request && request.method === 'GET') {
                _fetchBodyParams = _fetchParsedBody(reqDetail, request);
            } else if (request && request.method === 'POST') {
                _fetchBodyParams = _fetchDecodedBody(reqDetail, request);
            }				
            return _get(request, response, reqDetail, request.method, _fetchBodyParams);
        } else if (request && request.method === 'GET') {
            return _get(request, response, reqDetail, request.method, _fetchParsedBody(reqDetail, request));
        } else if (request && request.method === 'POST') {
            return _get(request, response, reqDetail, request.method, _fetchDecodedBody(reqDetail, request));
        } else {
            return {};
        }
    };

    /*
    * Initialize the router
    *
    * @param {Object} request
    * @param {Object} response
    * */
    var _init = function(request, response) {
        dbg.log('---------------------------------------');
		dbg.log('Triggered _init Method: ', request.url);
        if (!this.configInitialized) {
            _config();
        }

        var fs = require('fs')
        , path = require('path')
        , typeModule = require('./type')
        /*
        * Set file path
        * */
        , getRequestDetail = function(url) {
            var fPath
            , fviewChangePath
			, ext = path.extname(url);
			dbg.log('Triggered filePath Method', url, ext, _CONF.viewsMap);
            var controller = url.split('/')[1];
            var actionMethod = url.split('/')[2];
            if (!ext && url) {
                controller = controller || 'index';
                actionMethod = actionMethod || 'index';
                fPath = _CONF.viewDir  + _CONST.DS + controller + _CONST.DS + actionMethod + _CONST.DOT + _CONF.viewExtension;
                fviewChangePath = _CONF.viewDir  + _CONST.DS + controller;
                dbg.log('Triggered filePath Method fPath ', fPath);
            } else {
                fPath = '.' + url;
                dbg.log('Triggered filePath Method fPath else case ', fPath);
            }
            return {
                path: fPath,
                renderChangeView: fviewChangePath,
                url: url,
                reqParam : { controller : controller, actionMethod : actionMethod, ext: ext }
            };
        }
        /*
        * Set content type
        * */
        , setContentType = function () {
            var extname = path.extname(getRequestDetail(request.url).path);
            dbg.log('ContentType extname ', extname);
            return typeModule.getType(extname);
        },
        /*
        * Set the template engine, defaults to swig.
        * */
        setTemplateRenderedView = function (path, controllerFetch, content) {
            var renderContent;
            switch (_CONF.templateEngine) {
                case 'swig':
                var swig  = require('swig');
                renderContent = swig.renderFile(path, controllerFetch);
                break;
                case 'ejs':
                var ejs  = require('ejs');
                content = content || fs.readFileSync(path, 'utf8');
                renderContent = ejs.render(content, controllerFetch);
                break;
                case 'jade':
                var jade = require('jade');
                renderContent = jade.renderFile(path, controllerFetch);
                break;
                default:
                renderContent = fs.readFileSync(path, 'utf8');
            }
            return renderContent;
        },
		/*
        * Write response.
        * */
        resWrite = function (statusCode, contentType, data, encode) {
            response.writeHead(statusCode, { 'Content-Type': contentType });
            response.end(data, encode);
        },
		/*
        * Render the JSON to response.
        * */
        triggerJSON = function (renderResultObj) {
			resWrite(200, 'application/json', JSON.stringify(renderResultObj), 'utf-8');
        },
        /*
        * Render the content to response.
        * */		
		triggerRender = function (viewTemplate, renderResultObj) {
            dbg.log('Trigger render method: ', viewTemplate, renderResultObj);
			var readViewFilePath = reqDetail.path;
			renderResultObj = renderResultObj || {};
			if ('object' === typeof viewTemplate) {
				renderResultObj = viewTemplate;
				viewTemplate = null;
			}
			if (viewTemplate) {
				readViewFilePath = viewTemplate.indexOf('/') > -1
					?  _CONF.viewDir  + _CONST.DS + viewTemplate + _CONST.DOT + _CONF.viewExtension
					: reqDetail.renderChangeView  + _CONST.DS + viewTemplate + _CONST.DOT + _CONF.viewExtension;
				dbg.log('LOG:: readViewFilePath:: ', readViewFilePath);
			}
            if (!reqDetail.reqParam.ext) {
                fs.exists(readViewFilePath, function(exists) {
                    if (exists) {
                        dbg.log('LOG:: On Render Method File Exist');
                        fs.readFile(readViewFilePath, contentType.encoding || 'utf8', function(error, data) {
                            if (error) {
                                response.writeHead(500);
                                response.end();
                            } else {
                                data = setTemplateRenderedView(readViewFilePath, renderResultObj, data);
								resWrite(200, contentType.contentType, data, contentType.encoding || 'utf8');
                            }
                        });
                    } else if(!exists && contentType.ext !== '.js'&& contentType.ext !== '.css') {
                        dbg.log('LOG:: On Render Method File Not Exists JSON format RETURN');
                        if (renderResultObj) {
							resWrite(200, 'application/json', JSON.stringify(renderResultObj), 'utf8');
                        } else {
                            var contentError = _CONF.errorFilePath ? setTemplateRenderedView(_CONF.errorFilePath) : _TEMPLATE.errorContent;
							resWrite(200, 'text/html', contentError, 'utf8');
                        }
                    } else {
                        dbg.log('LOG:: On Render Method File Not Exist 404 Error');
                        response.writeHead(404);
                        response.end();
                    }
                });
            }

        };		
		
		/*
         * Request and Response Methods
         * */				
        response.render = triggerRender;
        response.json = triggerJSON;
        response.resWriteEnd = resWrite;
        response.getParsedFileData = setTemplateRenderedView;                				
		
		
        var reqDetail = getRequestDetail(request.url)
          , contentType = setContentType()
          , controllerFetch = {};
		  dbg.log('LOG:: ', reqDetail.path, contentType, request.url);

        if (!reqDetail.reqParam.ext) {
            try {
                reqDetail.reqParam.moduleController = require(_CONF.controllerDir + _CONST.DS + reqDetail.reqParam.controller);
                reqDetail.reqParam.hasModuleController = true;
                reqDetail.reqParam.hasActionMethod = typeof reqDetail.reqParam.moduleController[reqDetail.reqParam.actionMethod] == 'function';
            } catch(Ex) {
                dbg.err('ERROR: The controller module ' + reqDetail.reqParam.controller + ' is not found!');
                reqDetail.reqParam.hasModuleController = reqDetail.reqParam.hasActionMethod = false;
            }
        }
		dbg.log('LOG:: Read file reqParam: ', reqDetail.reqParam);
        if (reqDetail.reqParam.ext || !reqDetail.reqParam.hasModuleController || !reqDetail.reqParam.hasActionMethod) {
            fs.exists(reqDetail.path, function(exists) {
                if (exists && reqDetail.reqParam.ext) {
                    dbg.log('LOG:: File Exist');
                    fs.readFile(reqDetail.path, contentType.encoding || 'utf8', function(error, data) {
                        if (error) {
                            response.writeHead(500);
                            response.end();
                        } else {
                            if (contentType.ext  == '.html') {
                                controllerFetch = _fetch(reqDetail, contentType, request, response);
                                data = setTemplateRenderedView(reqDetail.path, controllerFetch, data);
                            }
							resWrite(200, contentType.contentType, data, contentType.encoding || 'utf8');
                        }
                    });
                } else if(exists && !reqDetail.reqParam.ext && (!reqDetail.reqParam.hasModuleController || !reqDetail.reqParam.hasActionMethod)) {
					var contentError = _CONF.errorFilePath ? setTemplateRenderedView(_CONF.errorFilePath) : _TEMPLATE.errorContent;
					resWrite(200, 'text/html', contentError, 'utf8');
				} else if(!exists && contentType.ext !== '.js'&& contentType.ext !== '.css') {
                    dbg.log('LOG:: File Not Exists JSON format RETURN');
                    var fetchedResponse = _fetch(reqDetail, contentType, request, response);
                    dbg.log('LOG:: fetchedResponse', fetchedResponse);
                    if (fetchedResponse) {
						resWrite(200, 'application/json', JSON.stringify(fetchedResponse), 'utf8');
                    } else {
                        var contentError = _CONF.errorFilePath ? setTemplateRenderedView(_CONF.errorFilePath) : _TEMPLATE.errorContent;
						resWrite(200, 'text/html', contentError, 'utf8');
                    }
                } else {
                    dbg.log('LOG:: On Render Method File Not Exist 404 Error');
                    response.writeHead(404);
                    response.end();
                }
            });

        } else {
			_fetch(reqDetail, contentType, request, response);
		}
    },
    /*
    * Set config method
    *  
    * @param {Object} config
    * */
    _config = function (config) {	
		config = config || {};
	
		/* Enable/Disable the debug logs */
		switch (config.debugMode) {
			case 1: case true:
				dbg.log('DEBUG:: DEVELOPMENT MODE ON');
				dbg.log = dbg.info = function () {};
				break;
			case 2:
				dbg.log('DEBUG:: LIBRARY DEVELOPMENT MODE ON');
				break;
			default:
				dbg.log('DEBUG:: TURNED OFF');
				dbg.log = dbg.warn = dbg.info = dbg.err = function () {};
				break;			
		}
	
		dbg.log('Triggered _config Method', config);
        this.configInitialized = true;
        _CONF = {
            templateEngine: config.templateEngine,
            errorFilePath: config.errorFilePath,
            controllerDir: config.controllerDir || process.cwd() + '/controller',
            viewDir: config.viewDir || process.cwd() + '/view',
            webrootDir: config.viewDir || process.cwd() + '/webroot',
            viewExtension: config.viewExtension || config.templateEngine,
			debugMode: config.debugMode || false
        };
    };

    return {
        configInitialized: false,
        config: _config,
        init: _init
    }
})();