/**
 * A module to get content type.
 *
 * @api private
 */

module.exports = (function() {
    /*
    * Set content type
    * */
     var _getContentType = function (extension) {
            var contentType = 'text/html';
            var encoding = 'utf8';
            switch (extension) {
                /* TEXT MIMES */
                case '.js':
                    contentType = 'text/javascript';
                    break;
                case '.txt':
                    contentType = 'text/plain';
                    break;
                case '.html': case '.xml': case '.css': case '.csv':
                    contentType = 'text/' + extension.slice(1);
                    break;

                /* IMAGES MIMES */
                case '.png': case '.jpeg':
                    contentType = 'image/' + extension.slice(1);
                    encoding = 'binary';
                    break;
                case '.jpg':
                    contentType = 'image/jpeg';
                    encoding = 'binary';
                    break;
                case '.ico':
                    contentType = 'image/x-icon';
                    encoding = 'binary';
                    break;
                case '.svg':
                    contentType = 'image/svg+xml';
                    encoding = 'binary';
                    break;

                /* VIDEO MIMES */
                case '.mp4': case '.webm':
                    contentType = 'video/' + extension.slice(1);
                    encoding = 'binary';
                    break;
                case '.mpeg':
                    contentType = 'video/mp3';
                    encoding = 'binary';
                    break;
                case '.avi':
                    contentType = 'video/avi';
                    encoding = 'binary';
                    break;
                case '.ogg':
                    contentType = 'video/ogg';
                    encoding = 'binary';
                    break;

                /* APPLICATION MIMES */
                case '.doc': case '.dot':
                    contentType = 'application/msword';
                    break;
                case '.pdf': case '.json':
                    contentType = 'application/' + extension.slice(1);
                    break;
            }
            return {
                ext: extension,
                contentType: contentType,
                encoding: encoding
            };
        };

    return {
        getType: _getContentType
    }
})();