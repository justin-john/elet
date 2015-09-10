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
            var encoding = '';
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
                case '.png': case '.jpeg': case '.gif':
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

                /* ADDING ADDITIONAL MIME TYPES */
                case '.3dm':
                    contentType = 'x-world/x-3dmf';
                    break;
                case '.3dmf':
                    contentType = 'x-world/x-3dmf';
                    break;
                case '.a':
                    contentType = 'application/octet-stream';
                    break;
                case '.aab':
                    contentType = 'application/x-authorware-bin';
                    break;
                case '.aam':
                    contentType = 'application/x-authorware-map';
                    break;
                case '.aas':
                    contentType = 'application/x-authorware-seg';
                    break;
                case '.abc':
                    contentType = 'text/vnd.abc';
                    break;
                case '.acgi':
                    contentType = 'text/html';
                    break;
                case '.afl':
                    contentType = 'video/animaflex';
                    encoding = 'binary';
                    break;
                case '.ai':
                    contentType = 'application/postscript';
                    break;
                case '.aif':
                    contentType = 'audio/aiff';
                    encoding = 'binary';
                    break;
                case '.aifc':
                    contentType = 'audio/aiff';
                    encoding = 'binary';
                    break;
                case '.aiff':
                    contentType = 'audio/aiff';
                    encoding = 'binary';
                    break;
                case '.aim':
                    contentType = 'application/x-aim';
                    break;
                case '.aip':
                    contentType = 'text/x-audiosoft-intra';
                    break;
                case '.ani':
                    contentType = 'application/x-navi-animation';
                    break;
                case '.aos':
                    contentType = 'application/x-nokia-9000-communicator-add-on-software';
                    break;
                case '.aps':
                    contentType = 'application/mime';
                    break;
                case '.arc':
                    contentType = 'application/octet-stream';
                    break;
                case '.arj':
                    contentType = 'application/arj';
                    break;
                case '.art':
                    contentType = 'image/x-jg';
                    encoding = 'binary';
                    break;
                case '.asf':
                    contentType = 'video/x-ms-asf';
                    encoding = 'binary';
                    break;
                case '.asm':
                    contentType = 'text/x-asm';
                    break;
                case '.asp':
                    contentType = 'text/asp';
                    break;
                case '.asx':
                    contentType = 'application/x-mplayer2';
                    break;
                case '.au':
                    contentType = 'audio/basic';
                    encoding = 'binary';
                    break;
                case '.avs':
                    contentType = 'video/avs-video';
                    encoding = 'binary';
                    break;
                case '.bcpio':
                    contentType = 'application/x-bcpio';
                    break;
                case '.bin':
                    contentType = 'application/mac-binary';
                    encoding = 'binary';
                    break;
                case '.bm':
                    contentType = 'image/bmp';
                    encoding = 'binary';
                    break;
                case '.bmp':
                    contentType = 'image/bmp';
                    encoding = 'binary';
                    break;
                case '.boo':
                    contentType = 'application/book';
                    break;
                case '.book':
                    contentType = 'application/book';
                    break;
                case '.boz':
                    contentType = 'application/x-bzip2';
                    break;
                case '.bsh':
                    contentType = 'application/x-bsh';
                    break;
                case '.bz':
                    contentType = 'application/x-bzip';
                    break;
                case '.bz2':
                    contentType = 'application/x-bzip2';
                    break;
                case '.c':
                    contentType = 'text/plain';
                    break;
                case '.c++':
                    contentType = 'text/plain';
                    break;
                case '.cat':
                    contentType = 'application/vnd.ms-pki.seccat';
                    break;
                case '.cc':
                    contentType = 'text/plain';
                    break;
                case '.ccad':
                    contentType = 'application/clariscad';
                    break;
                case '.cco':
                    contentType = 'application/x-cocoa';
                    break;
                case '.cdf':
                    contentType = 'application/cdf';
                    break;
                case '.cer':
                    contentType = 'application/pkix-cert';
                    break;
                case '.cha':
                    contentType = 'application/x-chat';
                    break;
                case '.chat':
                    contentType = 'application/x-chat';
                    break;
                case '.class':
                    contentType = 'application/java';
                    break;
                case '.com':
                    contentType = 'application/octet-stream';
                    break;
                case '.conf':
                    contentType = 'text/plain';
                    break;
                case '.cpio':
                    contentType = 'application/x-cpio';
                    break;
                case '.cpp':
                    contentType = 'text/x-c';
                    break;
                case '.cpt':
                    contentType = 'application/mac-compactpro';
                    break;
                case '.crl':
                    contentType = 'application/pkcs-crl';
                    break;
                case '.crt':
                    contentType = 'application/pkix-cert';
                    break;
                case '.csh':
                    contentType = 'application/x-csh';
                    break;
                case '.cxx':
                    contentType = 'text/plain';
                    break;
                case '.dcr':
                    contentType = 'application/x-director';
                    break;
                case '.deepv':
                    contentType = 'application/x-deepv';
                    break;
                case '.def':
                    contentType = 'text/plain';
                    break;
                case '.der':
                    contentType = 'application/x-x509-ca-cert';
                    break;
                case '.dif':
                    contentType = 'video/x-dv';
                    encoding = 'binary';
                    break;
                case '.dir':
                    contentType = 'application/x-director';
                    break;
                case '.dl':
                    contentType = 'video/dl';
                    encoding = 'binary';
                    break;
                case '.dp':
                    contentType = 'application/commonground';
                    break;
                case '.drw':
                    contentType = 'application/drafting';
                    break;
                case '.dump':
                    contentType = 'application/octet-stream';
                    break;
                case '.dv':
                    contentType = 'video/x-dv';
                    encoding = 'binary';
                    break;
                case '.dvi':
                    contentType = 'application/x-dvi';
                    break;
                case '.dwf':
                    contentType = 'drawing/x-dwf (old)';
                    break;
                case '.dwg':
                    contentType = 'application/acad';
                    break;
                case '.dxf':
                    contentType = 'application/dxf';
                    break;
                case '.dxr':
                    contentType = 'application/x-director';
                    break;
                case '.el':
                    contentType = 'text/x-script.elisp';
                    break;
                case '.elc':
                    contentType = 'application/x-bytecode.elisp (compiled elisp)';
                    break;
                case '.env':
                    contentType = 'application/x-envoy';
                    break;
                case '.eps':
                    contentType = 'application/postscript';
                    break;
                case '.es':
                    contentType = 'application/x-esrehber';
                    break;
                case '.etx':
                    contentType = 'text/x-setext';
                    break;
                case '.evy':
                    contentType = 'application/envoy';
                    break;
                case '.exe':
                    contentType = 'application/octet-stream';
                    break;
                case '.f':
                    contentType = 'text/plain';
                    break;
                case '.f77':
                    contentType = 'text/x-fortran';
                    break;
                case '.f90':
                    contentType = 'text/plain';
                    break;
                case '.fdf':
                    contentType = 'application/vnd.fdf';
                    break;
                case '.fif':
                    contentType = 'application/fractals';
                    break;
                case '.fli':
                    contentType = 'video/fli';
                    encoding = 'binary';
                    break;
                case '.flo':
                    contentType = 'image/florian';
                    encoding = 'binary';
                    break;
                case '.flx':
                    contentType = 'text/vnd.fmi.flexstor';
                    break;
                case '.fmf':
                    contentType = 'video/x-atomic3d-feature';
                    encoding = 'binary';
                    break;
                case '.for':
                    contentType = 'text/plain';
                    break;
                case '.fpx':
                    contentType = 'image/vnd.fpx';
                    encoding = 'binary';
                    break;
                case '.frl':
                    contentType = 'application/freeloader';
                    break;
                case '.funk':
                    contentType = 'audio/make';
                    encoding = 'binary';
                    break;
                case '.g':
                    contentType = 'text/plain';
                    break;
                case '.g3':
                    contentType = 'image/g3fax';
                    encoding = 'binary';
                    break;
                case '.gl':
                    contentType = 'video/gl';
                    encoding = 'binary';
                    break;
                case '.gsd':
                    contentType = 'audio/x-gsm';
                    encoding = 'binary';
                    break;
                case '.gsm':
                    contentType = 'audio/x-gsm';
                    encoding = 'binary';
                    break;
                case '.gsp':
                    contentType = 'application/x-gsp';
                    break;
                case '.gss':
                    contentType = 'application/x-gss';
                    break;
                case '.gtar':
                    contentType = 'application/x-gtar';
                    break;
                case '.gz':
                    contentType = 'application/x-compressed';
                    break;
                case '.gzip':
                    contentType = 'application/x-gzip';
                    break;
                case '.h':
                    contentType = 'text/plain';
                    break;
                case '.hdf':
                    contentType = 'application/x-hdf';
                    break;
                case '.help':
                    contentType = 'application/x-helpfile';
                    break;
                case '.hgl':
                    contentType = 'application/vnd.hp-hpgl';
                    break;
                case '.hh':
                    contentType = 'text/plain';
                    break;
                case '.hlb':
                    contentType = 'text/x-script';
                    break;
                case '.hlp':
                    contentType = 'application/hlp';
                    break;
                case '.hpg':
                    contentType = 'application/vnd.hp-hpgl';
                    break;
                case '.hpgl':
                    contentType = 'application/vnd.hp-hpgl';
                    break;
                case '.hqx':
                    contentType = 'application/binhex';
                    break;
                case '.hta':
                    contentType = 'application/hta';
                    break;
                case '.htc':
                    contentType = 'text/x-component';
                    break;
                case '.htm':
                    contentType = 'text/html';
                    break;
                case '.htmls':
                    contentType = 'text/html';
                    break;
                case '.htt':
                    contentType = 'text/webviewhtml';
                    break;
                case '.htx':
                    contentType = 'text/html';
                    break;
                case '.ice':
                    contentType = 'x-conference/x-cooltalk';
                    break;
                case '.idc':
                    contentType = 'text/plain';
                    break;
                case '.ief':
                    contentType = 'image/ief';
                    encoding = 'binary';
                    break;
                case '.iefs':
                    contentType = 'image/ief';
                    encoding = 'binary';
                    break;
                case '.iges':
                    contentType = 'application/iges';
                    break;
                case '.igs':
                    contentType = 'application/iges';
                    break;
                case '.ima':
                    contentType = 'application/x-ima';
                    break;
                case '.imap':
                    contentType = 'application/x-httpd-imap';
                    break;
                case '.inf':
                    contentType = 'application/inf';
                    break;
                case '.ins':
                    contentType = 'application/x-internett-signup';
                    break;
                case '.ip':
                    contentType = 'application/x-ip2';
                    break;
                case '.isu':
                    contentType = 'video/x-isvideo';
                    encoding = 'binary';
                    break;
                case '.it':
                    contentType = 'audio/it';
                    encoding = 'binary';
                    break;
                case '.iv':
                    contentType = 'application/x-inventor';
                    break;
                case '.ivr':
                    contentType = 'i-world/i-vrml';
                    break;
                case '.ivy':
                    contentType = 'application/x-livescreen';
                    break;
                case '.jam':
                    contentType = 'audio/x-jam';
                    encoding = 'binary';
                    break;
                case '.jav':
                    contentType = 'text/plain';
                    break;
                case '.java':
                    contentType = 'text/plain';
                    break;
                case '.jcm':
                    contentType = 'application/x-java-commerce';
                    break;
                case '.jfif':
                    contentType = 'image/jpeg';
                    encoding = 'binary';
                    break;
                case '.jfif-tbnl':
                    contentType = 'image/jpeg';
                    encoding = 'binary';
                    break;
                case '.jpe':
                    contentType = 'image/jpeg';
                    encoding = 'binary';
                    break;
                case '.jps':
                    contentType = 'image/x-jps';
                    encoding = 'binary';
                    break;
                case '.jut':
                    contentType = 'image/jutvision';
                    encoding = 'binary';
                    break;
                case '.kar':
                    contentType = 'audio/midi';
                    encoding = 'binary';
                    break;
                case '.ksh':
                    contentType = 'application/x-ksh';
                    break;
                case '.la':
                    contentType = 'audio/nspaudio';
                    encoding = 'binary';
                    break;
                case '.lam':
                    contentType = 'audio/x-liveaudio';
                    encoding = 'binary';
                    break;
                case '.latex':
                    contentType = 'application/x-latex';
                    break;
                case '.lha':
                    contentType = 'application/lha';
                    break;
                case '.lhx':
                    contentType = 'application/octet-stream';
                    break;
                case '.list':
                    contentType = 'text/plain';
                    break;
                case '.lma':
                    contentType = 'audio/nspaudio';
                    encoding = 'binary';
                    break;
                case '.log':
                    contentType = 'text/plain';
                    break;
                case '.lsp':
                    contentType = 'application/x-lisp';
                    break;
                case '.lst':
                    contentType = 'text/plain';
                    break;
                case '.lsx':
                    contentType = 'text/x-la-asf';
                    break;
                case '.ltx':
                    contentType = 'application/x-latex';
                    break;
                case '.lzh':
                    contentType = 'application/octet-stream';
                    break;
                case '.lzx':
                    contentType = 'application/lzx';
                    break;
                case '.m':
                    contentType = 'text/plain';
                    break;
                case '.m1v':
                    contentType = 'video/mpeg';
                    encoding = 'binary';
                    break;
                case '.m2a':
                    contentType = 'audio/mpeg';
                    encoding = 'binary';
                    break;
                case '.m2v':
                    contentType = 'video/mpeg';
                    encoding = 'binary';
                    break;
                case '.m3u':
                    contentType = 'audio/x-mpequrl';
                    encoding = 'binary';
                    break;
                case '.man':
                    contentType = 'application/x-troff-man';
                    break;
                case '.map':
                    contentType = 'application/x-navimap';
                    break;
                case '.mar':
                    contentType = 'text/plain';
                    break;
                case '.mbd':
                    contentType = 'application/mbedlet';
                    break;
                case '.mc$':
                    contentType = 'application/x-magic-cap-package-1.0';
                    break;
                case '.mcd':
                    contentType = 'application/mcad';
                    break;
                case '.mcf':
                    contentType = 'image/vasa';
                    encoding = 'binary';
                    break;
                case '.mcp':
                    contentType = 'application/netmc';
                    break;
                case '.me':
                    contentType = 'application/x-troff-me';
                    break;
                case '.mht':
                    contentType = 'message/rfc822';
                    break;
                case '.mhtml':
                    contentType = 'message/rfc822';
                    break;
                case '.mid':
                    contentType = 'application/x-midi';
                    break;
                case '.midi':
                    contentType = 'application/x-midi';
                    break;
                case '.mif':
                    contentType = 'application/x-frame';
                    break;
                case '.mime':
                    contentType = 'message/rfc822';
                    break;
                case '.mjf':
                    contentType = 'audio/x-vnd.audioexplosion.mjuicemediafile';
                    encoding = 'binary';
                    break;
                case '.mjpg':
                    contentType = 'video/x-motion-jpeg';
                    encoding = 'binary';
                    break;
                case '.mm':
                    contentType = 'application/base64';
                    break;
                case '.mme':
                    contentType = 'application/base64';
                    break;
                case '.mod':
                    contentType = 'audio/mod';
                    encoding = 'binary';
                    break;
                case '.moov':
                    contentType = 'video/quicktime';
                    encoding = 'binary';
                    break;
                case '.mov':
                    contentType = 'video/quicktime';
                    encoding = 'binary';
                    break;
                case '.movie':
                    contentType = 'video/x-sgi-movie';
                    encoding = 'binary';
                    break;
                case '.mp2':
                    contentType = 'audio/mpeg';
                    encoding = 'binary';
                    break;
                case '.mp3':
                    contentType = 'audio/mpeg3';
                    encoding = 'binary';
                    break;
                case '.mpa':
                    contentType = 'audio/mpeg';
                    encoding = 'binary';
                    break;
                case '.mpc':
                    contentType = 'application/x-project';
                    break;
                case '.mpe':
                    contentType = 'video/mpeg';
                    encoding = 'binary';
                    break;
                case '.mpg':
                    contentType = 'audio/mpeg';
                    encoding = 'binary';
                    break;
                case '.mpga':
                    contentType = 'audio/mpeg';
                    encoding = 'binary';
                    break;
                case '.mpp':
                    contentType = 'application/vnd.ms-project';
                    break;
                case '.mpt':
                    contentType = 'application/x-project';
                    break;
                case '.mpv':
                    contentType = 'application/x-project';
                    break;
                case '.mpx':
                    contentType = 'application/x-project';
                    break;
                case '.mrc':
                    contentType = 'application/marc';
                    break;
                case '.ms':
                    contentType = 'application/x-troff-ms';
                    break;
                case '.mv':
                    contentType = 'video/x-sgi-movie';
                    encoding = 'binary';
                    break;
                case '.my':
                    contentType = 'audio/make';
                    encoding = 'binary';
                    break;
                case '.mzz':
                    contentType = 'application/x-vnd.audioexplosion.mzz';
                    break;
                case '.nap':
                    contentType = 'image/naplps';
                    encoding = 'binary';
                    break;
                case '.naplps':
                    contentType = 'image/naplps';
                    encoding = 'binary';
                    break;
                case '.nc':
                    contentType = 'application/x-netcdf';
                    break;
                case '.ncm':
                    contentType = 'application/vnd.nokia.configuration-message';
                    break;
                case '.nif':
                    contentType = 'image/x-niff';
                    encoding = 'binary';
                    break;
                case '.niff':
                    contentType = 'image/x-niff';
                    encoding = 'binary';
                    break;
                case '.nix':
                    contentType = 'application/x-mix-transfer';
                    break;
                case '.nsc':
                    contentType = 'application/x-conference';
                    break;
                case '.nvd':
                    contentType = 'application/x-navidoc';
                    break;
                case '.o':
                    contentType = 'application/octet-stream';
                    break;
                case '.oda':
                    contentType = 'application/oda';
                    break;
                case '.omc':
                    contentType = 'application/x-omc';
                    break;
                case '.omcd':
                    contentType = 'application/x-omcdatamaker';
                    break;
                case '.omcr':
                    contentType = 'application/x-omcregerator';
                    break;
                case '.p':
                    contentType = 'text/x-pascal';
                    break;
                case '.p10':
                    contentType = 'application/pkcs10';
                    break;
                case '.p12':
                    contentType = 'application/pkcs-12';
                    break;
                case '.p7a':
                    contentType = 'application/x-pkcs7-signature';
                    break;
                case '.p7c':
                    contentType = 'application/pkcs7-mime';
                    break;
                case '.p7m':
                    contentType = 'application/pkcs7-mime';
                    break;
                case '.p7r':
                    contentType = 'application/x-pkcs7-certreqresp';
                    break;
                case '.p7s':
                    contentType = 'application/pkcs7-signature';
                    break;
                case '.part':
                    contentType = 'application/pro_eng';
                    break;
                case '.pas':
                    contentType = 'text/pascal';
                    break;
                case '.pbm':
                    contentType = 'image/x-portable-bitmap';
                    encoding = 'binary';
                    break;
                case '.pcl':
                    contentType = 'application/vnd.hp-pcl';
                    break;
                case '.pct':
                    contentType = 'image/x-pict';
                    encoding = 'binary';
                    break;
                case '.pcx':
                    contentType = 'image/x-pcx';
                    encoding = 'binary';
                    break;
                case '.pdb':
                    contentType = 'chemical/x-pdb';
                    break;
                case '.pfunk':
                    contentType = 'audio/make';
                    encoding = 'binary';
                    break;
                case '.pgm':
                    contentType = 'image/x-portable-graymap';
                    encoding = 'binary';
                    break;
                case '.pic':
                    contentType = 'image/pict';
                    encoding = 'binary';
                    break;
                case '.pict':
                    contentType = 'image/pict';
                    encoding = 'binary';
                    break;
                case '.pkg':
                    contentType = 'application/x-newton-compatible-pkg';
                    break;
                case '.pko':
                    contentType = 'application/vnd.ms-pki.pko';
                    break;
                case '.pl':
                    contentType = 'text/plain';
                    break;
                case '.plx':
                    contentType = 'application/x-pixclscript';
                    break;
                case '.pm':
                    contentType = 'image/x-xpixmap';
                    encoding = 'binary';
                    break;
                case '.pm4':
                    contentType = 'application/x-pagemaker';
                    break;
                case '.pm5':
                    contentType = 'application/x-pagemaker';
                    break;
                case '.pnm':
                    contentType = 'application/x-portable-anymap';
                    break;
                case '.pot':
                    contentType = 'application/mspowerpoint';
                    break;
                case '.pov':
                    contentType = 'model/x-pov';
                    break;
                case '.ppa':
                    contentType = 'application/vnd.ms-powerpoint';
                    break;
                case '.ppm':
                    contentType = 'image/x-portable-pixmap';
                    encoding = 'binary';
                    break;
                case '.pps':
                    contentType = 'application/mspowerpoint';
                    break;
                case '.ppt':
                    contentType = 'application/mspowerpoint';
                    break;
                case '.ppz':
                    contentType = 'application/mspowerpoint';
                    break;
                case '.pre':
                    contentType = 'application/x-freelance';
                    break;
                case '.prt':
                    contentType = 'application/pro_eng';
                    break;
                case '.ps':
                    contentType = 'application/postscript';
                    break;
                case '.psd':
                    contentType = 'application/octet-stream';
                    break;
                case '.pvu':
                    contentType = 'paleovu/x-pv';
                    break;
                case '.pwz':
                    contentType = 'application/vnd.ms-powerpoint';
                    break;
                case '.py':
                    contentType = 'text/x-script.phyton';
                    break;
                case '.pyc':
                    contentType = 'application/x-bytecode.python';
                    break;
                case '.qcp':
                    contentType = 'audio/vnd.qcelp';
                    encoding = 'binary';
                    break;
                case '.qd3':
                    contentType = 'x-world/x-3dmf';
                    break;
                case '.qd3d':
                    contentType = 'x-world/x-3dmf';
                    break;
                case '.qif':
                    contentType = 'image/x-quicktime';
                    encoding = 'binary';
                    break;
                case '.qt':
                    contentType = 'video/quicktime';
                    encoding = 'binary';
                    break;
                case '.qtc':
                    contentType = 'video/x-qtc';
                    encoding = 'binary';
                    break;
                case '.qti':
                    contentType = 'image/x-quicktime';
                    encoding = 'binary';
                    break;
                case '.qtif':
                    contentType = 'image/x-quicktime';
                    encoding = 'binary';
                    break;
                case '.ra':
                    contentType = 'audio/x-pn-realaudio';
                    encoding = 'binary';
                    break;
                case '.ram':
                    contentType = 'audio/x-pn-realaudio';
                    encoding = 'binary';
                    break;
                case '.ras':
                    contentType = 'application/x-cmu-raster';
                    break;
                case '.rast':
                    contentType = 'image/cmu-raster';
                    encoding = 'binary';
                    break;
                case '.rexx':
                    contentType = 'text/x-script.rexx';
                    break;
                case '.rf':
                    contentType = 'image/vnd.rn-realflash';
                    encoding = 'binary';
                    break;
                case '.rgb':
                    contentType = 'image/x-rgb';
                    encoding = 'binary';
                    break;
                case '.rm':
                    contentType = 'application/vnd.rn-realmedia';
                    break;
                case '.rmi':
                    contentType = 'audio/mid';
                    encoding = 'binary';
                    break;
                case '.rmm':
                    contentType = 'audio/x-pn-realaudio';
                    encoding = 'binary';
                    break;
                case '.rmp':
                    contentType = 'audio/x-pn-realaudio';
                    encoding = 'binary';
                    break;
                case '.rng':
                    contentType = 'application/ringing-tones';
                    break;
                case '.rnx':
                    contentType = 'application/vnd.rn-realplayer';
                    break;
                case '.roff':
                    contentType = 'application/x-troff';
                    break;
                case '.rp':
                    contentType = 'image/vnd.rn-realpix';
                    encoding = 'binary';
                    break;
                case '.rpm':
                    contentType = 'audio/x-pn-realaudio-plugin';
                    encoding = 'binary';
                    break;
                case '.rt':
                    contentType = 'text/richtext';
                    break;
                case '.rtf':
                    contentType = 'application/rtf';
                    break;
                case '.rtx':
                    contentType = 'application/rtf';
                    break;
                case '.rv':
                    contentType = 'video/vnd.rn-realvideo';
                    encoding = 'binary';
                    break;
                case '.s':
                    contentType = 'text/x-asm';
                    break;
                case '.s3m':
                    contentType = 'audio/s3m';
                    encoding = 'binary';
                    break;
                case '.saveme':
                    contentType = 'application/octet-stream';
                    break;
                case '.sbk':
                    contentType = 'application/x-tbook';
                    break;
                case '.scm':
                    contentType = 'application/x-lotusscreencam';
                    break;
                case '.sdml':
                    contentType = 'text/plain';
                    break;
                case '.sdp':
                    contentType = 'application/sdp';
                    break;
                case '.sdr':
                    contentType = 'application/sounder';
                    break;
                case '.sea':
                    contentType = 'application/sea';
                    break;
                case '.set':
                    contentType = 'application/set';
                    break;
                case '.sgm':
                    contentType = 'text/sgml';
                    break;
                case '.sgml':
                    contentType = 'text/sgml';
                    break;
                case '.sh':
                    contentType = 'application/x-bsh';
                    break;
                case '.shar':
                    contentType = 'application/x-bsh';
                    break;
                case '.shtml':
                    contentType = 'text/html';
                    break;
                case '.sid':
                    contentType = 'audio/x-psid';
                    encoding = 'binary';
                    break;
                case '.sit':
                    contentType = 'application/x-sit';
                    break;
                case '.skd':
                    contentType = 'application/x-koan';
                    break;
                case '.skm':
                    contentType = 'application/x-koan';
                    break;
                case '.skp':
                    contentType = 'application/x-koan';
                    break;
                case '.skt':
                    contentType = 'application/x-koan';
                    break;
                case '.sl':
                    contentType = 'application/x-seelogo';
                    break;
                case '.smi':
                    contentType = 'application/smil';
                    break;
                case '.smil':
                    contentType = 'application/smil';
                    break;
                case '.snd':
                    contentType = 'audio/basic';
                    encoding = 'binary';
                    break;
                case '.sol':
                    contentType = 'application/solids';
                    break;
                case '.spc':
                    contentType = 'application/x-pkcs7-certificates';
                    break;
                case '.spl':
                    contentType = 'application/futuresplash';
                    break;
                case '.spr':
                    contentType = 'application/x-sprite';
                    break;
                case '.sprite':
                    contentType = 'application/x-sprite';
                    break;
                case '.src':
                    contentType = 'application/x-wais-source';
                    break;
                case '.ssi':
                    contentType = 'text/x-server-parsed-html';
                    break;
                case '.ssm':
                    contentType = 'application/streamingmedia';
                    break;
                case '.sst':
                    contentType = 'application/vnd.ms-pki.certstore';
                    break;
                case '.step':
                    contentType = 'application/step';
                    break;
                case '.stl':
                    contentType = 'application/sla';
                    break;
                case '.stp':
                    contentType = 'application/step';
                    break;
                case '.sv4cpio':
                    contentType = 'application/x-sv4cpio';
                    break;
                case '.sv4crc':
                    contentType = 'application/x-sv4crc';
                    break;
                case '.svf':
                    contentType = 'image/vnd.dwg';
                    encoding = 'binary';
                    break;
                case '.svr':
                    contentType = 'application/x-world';
                    break;
                case '.swf':
                    contentType = 'application/x-shockwave-flash';
                    break;
                case '.t':
                    contentType = 'application/x-troff';
                    break;
                case '.talk':
                    contentType = 'text/x-speech';
                    break;
                case '.tar':
                    contentType = 'application/x-tar';
                    break;
                case '.tbk':
                    contentType = 'application/toolbook';
                    break;
                case '.tcl':
                    contentType = 'application/x-tcl';
                    break;
                case '.tcsh':
                    contentType = 'text/x-script.tcsh';
                    break;
                case '.tex':
                    contentType = 'application/x-tex';
                    break;
                case '.texi':
                    contentType = 'application/x-texinfo';
                    break;
                case '.texinfo':
                    contentType = 'application/x-texinfo';
                    break;
                case '.text':
                    contentType = 'application/plain';
                    break;
                case '.tgz':
                    contentType = 'application/gnutar';
                    break;
                case '.tif':
                    contentType = 'image/tiff';
                    encoding = 'binary';
                    break;
                case '.tiff':
                    contentType = 'image/tiff';
                    encoding = 'binary';
                    break;
                case '.tr':
                    contentType = 'application/x-troff';
                    break;
                case '.tsi':
                    contentType = 'audio/tsp-audio';
                    encoding = 'binary';
                    break;
                case '.tsp':
                    contentType = 'application/dsptype';
                    break;
                case '.tsv':
                    contentType = 'text/tab-separated-values';
                    break;
                case '.turbot':
                    contentType = 'image/florian';
                    encoding = 'binary';
                    break;
                case '.uil':
                    contentType = 'text/x-uil';
                    break;
                case '.uni':
                    contentType = 'text/uri-list';
                    break;
                case '.unis':
                    contentType = 'text/uri-list';
                    break;
                case '.unv':
                    contentType = 'application/i-deas';
                    break;
                case '.uri':
                    contentType = 'text/uri-list';
                    break;
                case '.uris':
                    contentType = 'text/uri-list';
                    break;
                case '.ustar':
                    contentType = 'application/x-ustar';
                    break;
                case '.uu':
                    contentType = 'application/octet-stream';
                    break;
                case '.uue':
                    contentType = 'text/x-uuencode';
                    break;
                case '.vcd':
                    contentType = 'application/x-cdlink';
                    break;
                case '.vcs':
                    contentType = 'text/x-vcalendar';
                    break;
                case '.vda':
                    contentType = 'application/vda';
                    break;
                case '.vdo':
                    contentType = 'video/vdo';
                    encoding = 'binary';
                    break;
                case '.vew':
                    contentType = 'application/groupwise';
                    break;
                case '.viv':
                    contentType = 'video/vivo';
                    encoding = 'binary';
                    break;
                case '.vivo':
                    contentType = 'video/vivo';
                    encoding = 'binary';
                    break;
                case '.vmd':
                    contentType = 'application/vocaltec-media-desc';
                    break;
                case '.vmf':
                    contentType = 'application/vocaltec-media-file';
                    break;
                case '.voc':
                    contentType = 'audio/voc';
                    encoding = 'binary';
                    break;
                case '.vos':
                    contentType = 'video/vosaic';
                    encoding = 'binary';
                    break;
                case '.vox':
                    contentType = 'audio/voxware';
                    encoding = 'binary';
                    break;
                case '.vqe':
                    contentType = 'audio/x-twinvq-plugin';
                    encoding = 'binary';
                    break;
                case '.vqf':
                    contentType = 'audio/x-twinvq';
                    encoding = 'binary';
                    break;
                case '.vql':
                    contentType = 'audio/x-twinvq-plugin';
                    encoding = 'binary';
                    break;
                case '.vrml':
                    contentType = 'application/x-vrml';
                    break;
                case '.vrt':
                    contentType = 'x-world/x-vrt';
                    break;
                case '.vsd':
                    contentType = 'application/x-visio';
                    break;
                case '.vst':
                    contentType = 'application/x-visio';
                    break;
                case '.vsw':
                    contentType = 'application/x-visio';
                    break;
                case '.w60':
                    contentType = 'application/wordperfect6.0';
                    break;
                case '.w61':
                    contentType = 'application/wordperfect6.1';
                    break;
                case '.w6w':
                    contentType = 'application/msword';
                    break;
                case '.wav':
                    contentType = 'audio/wav';
                    encoding = 'binary';
                    break;
                case '.wb1':
                    contentType = 'application/x-qpro';
                    break;
                case '.wbmp':
                    contentType = 'image/vnd.wap.wbmp';
                    encoding = 'binary';
                    break;
                case '.web':
                    contentType = 'application/vnd.xara';
                    break;
                case '.wiz':
                    contentType = 'application/msword';
                    break;
                case '.wk1':
                    contentType = 'application/x-123';
                    break;
                case '.wmf':
                    contentType = 'windows/metafile';
                    break;
                case '.wml':
                    contentType = 'text/vnd.wap.wml';
                    break;
                case '.wmlc':
                    contentType = 'application/vnd.wap.wmlc';
                    break;
                case '.wmls':
                    contentType = 'text/vnd.wap.wmlscript';
                    break;
                case '.wmlsc':
                    contentType = 'application/vnd.wap.wmlscriptc';
                    break;
                case '.word':
                    contentType = 'application/msword';
                    break;
                case '.wp':
                    contentType = 'application/wordperfect';
                    break;
                case '.wp5':
                    contentType = 'application/wordperfect';
                    break;
                case '.wp6':
                    contentType = 'application/wordperfect';
                    break;
                case '.wpd':
                    contentType = 'application/wordperfect';
                    break;
                case '.wq1':
                    contentType = 'application/x-lotus';
                    break;
                case '.wri':
                    contentType = 'application/mswrite';
                    break;
                case '.wrl':
                    contentType = 'application/x-world';
                    break;
                case '.wrz':
                    contentType = 'model/vrml';
                    break;
                case '.wsc':
                    contentType = 'text/scriplet';
                    break;
                case '.wsrc':
                    contentType = 'application/x-wais-source';
                    break;
                case '.wtk':
                    contentType = 'application/x-wintalk';
                    break;
                case '.xbm':
                    contentType = 'image/x-xbitmap';
                    encoding = 'binary';
                    break;
                case '.xdr':
                    contentType = 'video/x-amt-demorun';
                    encoding = 'binary';
                    break;
                case '.xgz':
                    contentType = 'xgl/drawing';
                    break;
                case '.xif':
                    contentType = 'image/vnd.xiff';
                    encoding = 'binary';
                    break;
                case '.xl':
                    contentType = 'application/excel';
                    break;
                case '.xla':
                    contentType = 'application/excel';
                    break;
                case '.xlb':
                    contentType = 'application/excel';
                    break;
                case '.xlc':
                    contentType = 'application/excel';
                    break;
                case '.xld':
                    contentType = 'application/excel';
                    break;
                case '.xlk':
                    contentType = 'application/excel';
                    break;
                case '.xll':
                    contentType = 'application/excel';
                    break;
                case '.xlm':
                    contentType = 'application/excel';
                    break;
                case '.xls':
                    contentType = 'application/excel';
                    break;
                case '.xlt':
                    contentType = 'application/excel';
                    break;
                case '.xlv':
                    contentType = 'application/excel';
                    break;
                case '.xlw':
                    contentType = 'application/excel';
                    break;
                case '.xm':
                    contentType = 'audio/xm';
                    encoding = 'binary';
                    break;
                case '.xmz':
                    contentType = 'xgl/movie';
                    break;
                case '.xpix':
                    contentType = 'application/x-vnd.ls-xpix';
                    break;
                case '.xpm':
                    contentType = 'image/x-xpixmap';
                    encoding = 'binary';
                    break;
                case '.x-png':
                    contentType = 'image/png';
                    encoding = 'binary';
                    break;
                case '.xsr':
                    contentType = 'video/x-amt-showrun';
                    encoding = 'binary';
                    break;
                case '.xwd':
                    contentType = 'image/x-xwd';
                    encoding = 'binary';
                    break;
                case '.xyz':
                    contentType = 'chemical/x-pdb';
                    break;
                case '.z':
                    contentType = 'application/x-compress';
                    break;
                case '.zip':
                    contentType = 'application/x-compressed';
                    break;
                case '.zoo':
                    contentType = 'application/octet-stream';
                    break;
                case '.zsh':
                    contentType = 'text/x-script.zsh';
                    break;
                /* END OF MIME TYPES */

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