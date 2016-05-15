require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(7);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(6);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(5);
  
  var _path = __webpack_require__(12);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(10);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(9);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(8);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _prettyError = __webpack_require__(13);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _assets = __webpack_require__(4);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var port = process.env.PORT || 3000; /**
                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                        *
                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                        *
                                        * This source code is licensed under the MIT license found in the
                                        * LICENSE.txt file in the root directory of this source tree.
                                        */
  
  var server = global.server = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  server.use((0, _cookieParser2.default)());
  server.use(_bodyParser2.default.urlencoded({ extended: true }));
  server.use(_bodyParser2.default.json());
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var statusCode, template, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                statusCode = 200;
                template = __webpack_require__(3);
                data = { entry: _assets2.default.main.js };
  
                res.status(statusCode);
                res.send(template(data));
              } catch (err) {
                next(err);
              }
  
            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
    return function (_x, _x2, _x3) {
      return ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  server.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(2);
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  false ? '' : err.stack
    }));
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(port, function () {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + port + '/');
  });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(11).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(1);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "/Users/hypnos/react-sandbox/src/views/error.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  jade_debug.unshift(new jade.DebugItem( 0, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<html lang=\"en\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<title>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<style>");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("* {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  line-height: 1.2;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("html {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  color: #888;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  display: table;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-family: sans-serif;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  height: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  text-align: center;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  width: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("body {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  display: table-cell;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  vertical-align: middle;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 2em auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  color: #555;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-size: 2em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-weight: 400;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  width: 280px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("pre {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  text-align: left;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  max-width: 1000px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("@media only screen and (max-width: 280px) {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  body, p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    width: 95%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    font-size: 1.5em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    margin: 0 0 0.3em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 59, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 60, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<h1>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 60, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</h1>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 61, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<p>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 61, jade_debug[0].filename ));
  buf.push("Sorry, something went wrong.");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</p>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 62, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</pre>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 63, "/Users/hypnos/react-sandbox/src/views/error.jade" ));
  buf.push("<!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(lang=\"en\")\n  head\n    meta(charset=\"utf-8\")\n    title Internal Server Error\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    style.\n\n      * {\n        line-height: 1.2;\n        margin: 0;\n      }\n\n      html {\n        color: #888;\n        display: table;\n        font-family: sans-serif;\n        height: 100%;\n        text-align: center;\n        width: 100%;\n      }\n\n      body {\n        display: table-cell;\n        vertical-align: middle;\n        margin: 2em auto;\n      }\n\n      h1 {\n        color: #555;\n        font-size: 2em;\n        font-weight: 400;\n      }\n\n      p {\n        margin: 0 auto;\n        width: 280px;\n      }\n\n      pre {\n        text-align: left;\n        max-width: 1000px;\n        margin: 0 auto;\n      }\n\n      @media only screen and (max-width: 280px) {\n\n        body, p {\n          width: 95%;\n        }\n\n        h1 {\n          font-size: 1.5em;\n          margin: 0 0 0.3em;\n        }\n\n      }\n\n  body\n    h1 Internal Server Error\n    p Sorry, something went wrong.\n    pre= stack\n// IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx\n");
  }
  }

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(1);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "/Users/hypnos/react-sandbox/src/views/index.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, entry) {
  jade_debug.unshift(new jade.DebugItem( 0, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<html lang=\"\" class=\"no-js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<title>" + (jade.escape(null == (jade_interp = "Controls") ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 8, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 9, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</div>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 10, "/Users/hypnos/react-sandbox/src/views/index.jade" ));
  buf.push("<script" + (jade.attr("src", entry, true, true)) + ">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(class=\"no-js\", lang=\"\")\n  head\n    meta(charset=\"utf-8\")\n    meta(http-equiv=\"x-ua-compatible\", content=\"ie=edge\")\n    title= \"Controls\"\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n  body\n    #app!= body\n    script(src=entry)\n");
  }
  }

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map