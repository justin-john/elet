module.exports = (function() {
	var _isEmptyObj = function (obj) {
		return !Object.keys(obj).length;
	},
	_passParams = function (url) {
		var uParams = url.split('/'),
		    uParamsLen = url.split('/').length;
		return uParams.slice(3, uParamsLen);
	},
	/*
	 * TODO: Implement url params
	 *
	 */
	_urlParams = function (url) {
		var uParams = [_passParams(url).join('/')],
		    uQueryStr = url.split('?')[1];
			urlResultQueryStr =  !uQueryStr ? uParams : uParams; 
		return urlResultQueryStr;
	},
    /*
	 * TODO: Query params
	 *
	 */
	_queryParams = function (name) {
        return null;
	},
	/*
	 *  Built-in detectors 
	 *  TODO: Add more detectors methods 
	 */
	_buildInDetectors = function (v, req) {
		if (v == 'get' && req.method == 'GET') {
			return true;
		} else if (v == 'post' && req.method == 'POST') {
			return true;
		} else if (v == 'put' && req.method == 'PUT') {
			return true;
		} else if (v == 'delete' && req.method == 'DELETE') {
			return true;
		} else if (v == 'head' && req.method == 'HEAD') {
			return true;
		} else if (v == 'options' && req.method == 'OPTIONS') {
			return true;
		} else if (v == 'mobile' && /mobile/i.test(request.headers['user-agent'])) {
			return true;
		} else if (v == 'ajax' && (req.xhr || req.headers.accept.indexOf('json') > -1)) {
			return true;
		} else {
			return false;
		}

	},
	/*
	 *  Check string contains only contains chars
	 */
	_isAlpha = function (v) {
		return /^[a-zA-Z]+$/.test(v);
	};
	
	return {
		'isEmptyObj' : _isEmptyObj,
		'passParams' : _passParams,
		'urlParams' : _urlParams,
		'queryParams' : _queryParams,
		'buildInDetectors' : _buildInDetectors,
		'isAlpha' : _isAlpha
	}
})();