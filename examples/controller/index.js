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

    },_add = function(req, res) {
        var locals = {
            title: 'A JSON format data returned, Normally used in AJAX response data',
            pagename: 'awesome people locals',
            authors: ['Paul', 'Jim', 'Jane'],
            params: req.params
        };
		res.json(locals);
    }, _test = function(req, res) {
        return {
            title: 'Test',
            pagename: 'awesome peoplexz',
            authors: ['Paul', 'Jim', 'Jane'],
            params: req.params
        };
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
        test: _test,
        swigtojade: _swigtojade,
        contact: _contact
    }
})();