/**
 * Template Engine Module
 * This is to get template content parsed with controller fetched data.
 *
 * // TODO
 * // Create a common module to handle all popular template engines
 *
 * @param {String} path
 * @param {Object} controllerFetch
 * @param {String} content
 * @param {String} templateEngine
 * @private
 */
exports.engine = function(path, controllerFetch, content, templateEngine) {
    var fs = require('fs')
     , CONST = require('./constants')
     , renderContent = '';
    switch (templateEngine) {
        case 'swig':
        var swig  = require('swig');
        renderContent = swig.renderFile(path, controllerFetch);
        break;
        case 'ejs':
        var ejs  = require('ejs');
        content = content || fs.readFileSync(path, CONST.UTF_8);
        renderContent = ejs.render(content, controllerFetch);
        break;
        case 'jade':
        var jade = require('jade');
        renderContent = jade.renderFile(path, controllerFetch);
        break;
        case 'hogan':
        var hogan = require('hogan.js');
        content = fs.readFileSync(path, CONST.UTF_8);
        renderContent = hogan.compile(content, controllerFetch).render(controllerFetch);
        case 'mustache':
        var mustache = require('mustache');
        content = fs.readFileSync(path, CONST.UTF_8);
        renderContent = mustache.render(content, controllerFetch);
        break;
        default:
        renderContent = fs.readFileSync(path, CONST.UTF_8);
    }
    return renderContent;
}
