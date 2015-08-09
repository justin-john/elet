/**
 * An internal router for Elet
 *
 * @param {Object} request
 * @param {Object} response
 * @api public
 */

module.exports = (function(request, response) {
    var CONF,
		CONST = require('./constants'),
		UTIL = require('./utilities'),
		TEMPLATE = require('./template'),
		VIEW = require('./view');

	/* Debug Methods */
	var dbg  = {
		log : console.log, 
		warn : console.warn,
		info : console.info,
		err : console.error
	}

    /**
     * Return a function call to controller methods on request
     *
     * @param {Object} request
     * @param {Object} response
     * @param {Object} reqDetail
     * @param {Object} params
     * @return {Function|null}
     * @private
     */
    var _get = function (request, response, reqDetail, params) {
		dbg.log('Triggered _get Method: ');
        if (!reqDetail.reqParam.ext) {
            if (reqDetail.reqParam.hasModuleController && UTIL.isAlpha(reqDetail.reqParam.controller) && UTIL.isAlpha(reqDetail.reqParam.actionMethod)) {
                if (reqDetail.reqParam.actionMethod && typeof reqDetail.reqParam.moduleController[reqDetail.reqParam.actionMethod] === 'function') {
                    request.params = {
                        controller : reqDetail.reqParam.controller,
                        action : reqDetail.reqParam.actionMethod,
                        pass : UTIL.passParams(reqDetail.url),
                        isAjax : request.xhr || request.headers.accept.indexOf('json') > -1 ? true : false,
                        is: function (v) { return UTIL.buildInDetectors(v, request) },
                        url : UTIL.urlParams(reqDetail.url),
                        query : UTIL.queryParams,
                        data : params
                    }
                    return reqDetail.reqParam.moduleController[reqDetail.reqParam.actionMethod](request, response);
                } else {
                    dbg.err('ERROR: No method called ' + reqDetail.reqParam.actionMethod + ' is found!');
                }
            } else if (!UTIL.isAlpha(reqDetail.reqParam.controller) || !UTIL.isAlpha(reqDetail.reqParam.actionMethod)) {
                dbg.err('ERROR: The controller or action needs to have valid name!');
            }
        }
     };

    /**
     * Return a object on GET request used to parse data
     *
     * @param {Object} reqDetail
     * @param {Object} request
     * @param {Object} response
     * @return {Object|null}
     * @private
     */
    var _fetchParsedBody =  function (reqDetail, request, response) {
		dbg.log('Triggered _fetchParsedBody Method: ', reqDetail.path);
        var querystring = require('querystring');
        var str = reqDetail.url.split('?')[1];
        return str ? querystring.parse(str) : null;
    };

    /**
     * Return a function call on POST request, this method is used to parse form data
     *
     * @param {Object} reqDetail
     * @param {Object} request
     * @param {Object} response
     * @return {Function}
     * @private
     */
    var _fetchDecodedBody =  function (reqDetail, request, response) {
		dbg.log('Triggered _fetchDecodedBody Method: ', reqDetail.path);
        var querystring = require('querystring');
        var chunkedData = '';
        request.isStreamEmitOnData = true;
        request.on('data', function(chunk) {
            chunkedData += chunk.toString();
        }).on('end', function() {
            return _get(request, response, reqDetail, querystring.parse(chunkedData));
        });
    };

    /**
     * Return a function
     *
     * @param {Object} reqDetail
     * @param {Object} contentType
     * @param {Object} request
     * @param {Object} response
     * @return {Function}
     * @private
     */
    var _fetch = function(reqDetail, contentType, request, response) {
		dbg.log('Triggered _fetch Method: ', reqDetail, contentType);
        if (request && request.method === 'GET') {
            return _get(request, response, reqDetail, _fetchParsedBody(reqDetail, request, response));
        } else if (request && request.method === 'POST') {
            return _fetchDecodedBody(reqDetail, request, response);
        }  else {
            /* HTTP PUT and DELETE methods will be handle here */
            return _fetchDecodedBody(reqDetail, request, response);
        }
    };

    /**
     * Initialize the router
     *
     * @param {Object} request
     * @param {Object} response
     */
    var _init = function(request, response) {
        dbg.log('---------------------------------------');
		dbg.log('Triggered _init Method: ', request.url);
        if (!this.configInitialized) {
            _config();
        }

        var fs = require('fs')
        , path = require('path')
        , typeModule = require('./type')
        /**
         * Set file path
         * @param {String} url
         */
        , getRequestDetail = function(url) {
            var fPath
            , fviewChangePath
            , controller
            , actionMethod
            , isNameNotValid
			, ext = path.extname(url);
			dbg.log('Triggered filePath Method', url, ext, CONF.viewsMap);
            controller = url.split('/')[1];
            /**
             * Check controller name has `?`, `#`, `=`, `&` chars, split name upto corresponding first matched character
             * as controller name, otherwise give controller name without any check.
             **/
            isNameNotValid = /(\?|#|=|&)/.exec(controller);
            controller = isNameNotValid ? controller.split(isNameNotValid[0])[0] : controller;
            /* If controller name is not valid/have matched `?`, `#`, `=`, `&` char, then set action name to null */
            actionMethod = isNameNotValid ? null : url.split('/')[2];
            /* Action name check same as above controller name check */
            isNameNotValid = /(\?|#|=|&)/.exec(actionMethod);
            actionMethod = isNameNotValid ? actionMethod.split(isNameNotValid[0])[0] : actionMethod;
            if (!ext && url) {
                controller = controller || 'index';
                actionMethod = actionMethod || 'index';
                fPath = CONF.viewDir  + CONST.DS + controller + CONST.DS + actionMethod + CONST.DOT + CONF.viewExtension;
                fviewChangePath = CONF.viewDir  + CONST.DS + controller;
                dbg.log('Triggered filePath Method fPath ', fPath);
            } else {
                fPath = CONF.webrootDir + url;
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
        }
        /**
         * Get template content parsed with controller fetched data.
         * This method is exposed to public as `response.getParsedFileData`.
         *
         *  Examples:
         *  res.getParsedFileData('view/index/index.html', { name: 'Elet' });
         *  res.getParsedFileData('view/index/index.html', { name: 'Elet' }, '', 'jade');
         *
         * @param {String} path
         * @param {Object} controllerFetch
         * @param {String} content
         * @param {String} templateEngine
         * @public
         **/
        , setTemplateRenderedView = function (path, controllerFetch, content, templateEngine) {
            return VIEW.engine(path, controllerFetch, content, templateEngine || CONF.templateEngine);
        }
        /**
         * Write a response, a wrapper to node  response's `writeHead` method.
         * This method is exposed to public as `response.resWrite`.
         *
         *  Examples:
         *  res.resWrite(200, 'text/html', data, 'utf8');
         *  res.resWrite(200, 'application/json', data, 'utf8');
         *
         * @param {Number} statusCode
         * @param {Object} contentType
         * @param {Object} data
         * @param {String} encode
         * @public
         **/
        , resWrite = function (statusCode, contentType, data, encode) {
            response.writeHead(statusCode, { 'Content-Type': contentType });
            response.end(data, encode || CONST.UTF_8);
        }
        /**
         * Render the JSON to response. This method is exposed to public as `response.json`.
         *
         *  Examples:
         *  res.json({ name: 'Justin' })
         *
         * @param {Object} renderResultObj
         * @public
         **/
        , triggerJSON = function (renderResultObj) {
			resWrite(CONST.ST_CODE_OK, CONST.MIME_JSON, JSON.stringify(renderResultObj), CONST.UTF_8);
        }
        /**
         * Render the template content to response. This method is exposed to public as `response.render`.
         * Method accepts `view file name without file extension`, `controller fetched data`, and
         * `template engine name for override`.
         *
         *  Examples:
         *  res.render('index', { name: 'Angeline' }) 
         *  res.render('index')
         *  // Call default template same as action name with object passed
         *  res.render({ name: 'Angeline' })
         *  // Call default template same as action name
         *  res.render() 
         *  // Render with different template engine than config defined template engine.
         *  // Here swig is default template engine overridden to jade template engine only for corresponding request.
         *  res.render('index', { name: 'Angeline' }, 'jade')
         *
         * @param {String} viewTemplate
         * @param {Object} renderResultObj
         * @param {Object} templateEngine
         * @public
         **/
		, triggerRender = function (viewTemplate, renderResultObj, templateEngine) {
            dbg.log('Trigger render method: ', viewTemplate, renderResultObj, templateEngine);
			var readViewFilePath = reqDetail.path
            , templateExtension;
            dbg.log('LOG:: readViewFilePath On Call:: ', readViewFilePath);
			renderResultObj = renderResultObj || {};
            /* If first argument is object, set it to renderResultObj` and `viewTemplate` to empty */
			if ('object' === typeof viewTemplate) {
				renderResultObj = viewTemplate;
				viewTemplate = null;
			}
            /* If templateEngine is present, override default view extension of view file. */
            templateExtension = templateEngine || CONF.viewExtension;
			if (viewTemplate) {
				readViewFilePath = viewTemplate.indexOf('/') > -1
					?  CONF.viewDir  + CONST.DS + viewTemplate + CONST.DOT + CONF.viewExtension
					: reqDetail.renderChangeView  + CONST.DS + viewTemplate + CONST.DOT + templateExtension;
				dbg.log('LOG:: readViewFilePath:: ', readViewFilePath);
			}
            if (!reqDetail.reqParam.ext) {
                fs.exists(readViewFilePath, function(exists) {
                    if (exists) {
                        dbg.log('LOG:: On Render Method File Exist');
                        fs.readFile(readViewFilePath, contentType.encoding || CONST.UTF_8, function(error, data) {
                            if (error) {
                                response.writeHead(CONST.ST_CODE_INT_SER_ERR);
                                response.end();
                            } else {
                                data = setTemplateRenderedView(readViewFilePath, renderResultObj, data, templateEngine);
								resWrite(CONST.ST_CODE_OK, contentType.contentType, data, contentType.encoding || CONST.UTF_8);
                            }
                        });
                    } else {
                        dbg.log('LOG:: On Render Method File Not Exists data return on JSON format');
                        if (renderResultObj  && 'object' === typeof renderResultObj) {
							resWrite(CONST.ST_CODE_OK, CONST.MIME_JSON, JSON.stringify(renderResultObj), CONST.UTF_8);
                        } else {
                            var contentError = CONF.errorFilePath ? setTemplateRenderedView(CONF.errorFilePath) : TEMPLATE.errorContent;
							resWrite(CONST.ST_CODE_OK, CONST.MIME_HTML, contentError, CONST.UTF_8);
                        }
                    }
                });
            }

        };		
		
		/**
         * Request and Response Public API Methods
         */
        response.render = triggerRender;
        response.json = triggerJSON;
        response.resWriteEnd = resWrite;
        response.getParsedFileData = setTemplateRenderedView;                				
		
		
        var reqDetail = getRequestDetail(request.url)
          , contentType = setContentType()
          , controllerFetch = {};
		  dbg.log('LOG:: ', reqDetail.path, contentType, request.url);

        /**
         * Check the request accesses controller file and action method by using request url have extension and
         * require `ModuleController` and set `hasModuleController` and `hasActionMethod` variable to know the request
         * have valid hit point in controller file, otherwise set `ModuleController` and `ActionMethod` to `undefined`.
         * This `undefined` leads to request to "Page Not Found".
         **/
        if (!reqDetail.reqParam.ext) {
            try {
                reqDetail.reqParam.moduleController = require(CONF.controllerDir + CONST.DS + reqDetail.reqParam.controller);
                reqDetail.reqParam.hasModuleController = true;
                reqDetail.reqParam.hasActionMethod = typeof reqDetail.reqParam.moduleController[reqDetail.reqParam.actionMethod] == 'function';
            } catch(Ex) {
                dbg.err('ERROR: The controller module ' + reqDetail.reqParam.controller + ' is not found!');
                reqDetail.reqParam.hasModuleController = reqDetail.reqParam.hasActionMethod = false;
            }
        }
		dbg.log('LOG:: Read file reqParam: ', reqDetail.reqParam);

        /**
         * Check the request have extension in url OR not have module controller OR not have action method in
         * controller.
         **/
        if (reqDetail.reqParam.ext || !reqDetail.reqParam.hasModuleController || !reqDetail.reqParam.hasActionMethod) {
            fs.exists(reqDetail.path, function(exists) {
                if (exists && reqDetail.reqParam.ext) {
                    /**
                     * IF Case: File exists on any type of file.
                     **/
                    dbg.log('LOG:: File Exist');
                    fs.readFile(reqDetail.path, contentType.encoding || CONST.UTF_8, function(error, data) {
                        if (error) {
                            response.writeHead(CONST.ST_CODE_INT_SER_ERR);
                            response.end();
                        } else {
                            /**
                             * Check the request have readable stream emit on `data` event and send response only on 
                             * readable stream emit on `end` event, otherwise send response without in events callbacks
                             */
                            if (request.isStreamEmitOnData) {
                                request.on('end', function() {
                                    resWrite(CONST.ST_CODE_OK, contentType.contentType, data, contentType.encoding || CONST.UTF_8);
                                });
                            } else {
                                resWrite(CONST.ST_CODE_OK, contentType.contentType, data, contentType.encoding || CONST.UTF_8);
                            }
                        }
                    });
                } else if(exists && !reqDetail.reqParam.ext && (!reqDetail.reqParam.hasModuleController || !reqDetail.reqParam.hasActionMethod)) {
					/**
                     * ELSE IF Case: View file exists for request in view folder, but no module controller OR
                     * action method. If this case excluded, the current request will fallback to 404 error instead of
                     * "Page Not Found Exception".
                     **/
                    dbg.log('LOG:: File Exists but no controller/action method');
                    var contentError = CONF.errorFilePath ? setTemplateRenderedView(CONF.errorFilePath) : TEMPLATE.errorContent;
					resWrite(CONST.ST_CODE_OK, CONST.MIME_HTML, contentError, CONST.UTF_8);
				} else if(!exists && !reqDetail.reqParam.ext) {
                    /**
                     * ELSE IF Case: File not exist and no extension in request url. Check any controller data is
                     * fetched in request, then set response to json mime type with controller data,
                     * otherwise set an error content to response
                     **/
                    dbg.log('LOG:: File Not Exists JSON format RETURN');
                    var fetchedResponse = _fetch(reqDetail, contentType, request, response);
                    dbg.log('LOG:: fetchedResponse', fetchedResponse);
                    if (fetchedResponse) {
                        if (request.isStreamEmitOnData) {
                            request.on('end', function() {
                                resWrite(CONST.ST_CODE_OK, CONST.MIME_JSON, JSON.stringify(fetchedResponse), CONST.UTF_8);
                            });
                        } else {
                            resWrite(CONST.ST_CODE_OK, CONST.MIME_JSON, JSON.stringify(fetchedResponse), CONST.UTF_8);
                        }
                    } else {
                        var contentError = CONF.errorFilePath ? setTemplateRenderedView(CONF.errorFilePath) : TEMPLATE.errorContent;
                        if (request.isStreamEmitOnData) {
                            request.on('end', function() {
                                resWrite(CONST.ST_CODE_OK, CONST.MIME_HTML, contentError, CONST.UTF_8);
                            });
                        } else {
                            resWrite(CONST.ST_CODE_OK, CONST.MIME_HTML, contentError, CONST.UTF_8);
                        }
                    }
                } else {
                    dbg.log('LOG:: On Render Method File Not Exist 404 Error');
                    response.writeHead(CONST.ST_CODE_NOT_FOUND);
                    response.end();
                }
            });

        } else {
			_fetch(reqDetail, contentType, request, response);
		}
    },
    /**
     * Set config method
     *
     * @param {Object} config
     */
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
        CONF = {
            templateEngine: config.templateEngine,
            errorFilePath: config.errorFilePath,
            controllerDir: config.controllerDir || process.cwd() + '/controller',
            viewDir: config.viewDir || process.cwd() + '/view',
            webrootDir: config.webrootDir || process.cwd() + '/webroot',
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