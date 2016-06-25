(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Detector = function () {
  function Detector() {
    _classCallCheck(this, Detector);
  }

  _createClass(Detector, null, [{
    key: 'platform',
    value: function platform() {
      if (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) {
        return 'ios';
      } else if (/Android/i.test(window.navigator.userAgent)) {
        return 'android';
      }
    }
  }]);

  return Detector;
}();

exports.default = Detector;

},{}],2:[function(require,module,exports){
'use strict';

var _smartbanner = require('./smartbanner.js');

var _smartbanner2 = _interopRequireDefault(_smartbanner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smartbanner = new _smartbanner2.default();
smartbanner.publish();

},{"./smartbanner.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function valid(name) {
  // TODO: validate against options dictionary
  return name.indexOf('smartbanner:') !== -1 && name.split(':')[1].length > 0;
}

function convertToCamelCase(name) {
  var parts = name.split('-');
  parts.map(function (part, index) {
    if (index > 0) {
      parts[index] = part.charAt(0).toUpperCase() + part.substring(1);
    }
  });
  return parts.join('');
}

var OptionParser = function () {
  function OptionParser() {
    _classCallCheck(this, OptionParser);
  }

  _createClass(OptionParser, [{
    key: 'parse',
    value: function parse() {
      var metas = document.getElementsByTagName('meta');
      var options = {};
      var optionName = null;
      Array.from(metas).forEach(function (meta) {
        var name = meta.getAttribute('name');
        var content = meta.getAttribute('content');
        if (name && content && valid(name) && content.length > 0) {
          optionName = name.split(':')[1];
          if (optionName.includes('-')) {
            optionName = convertToCamelCase(optionName);
          }
          options[optionName] = content;
        }
      });
      return options;
    }
  }]);

  return OptionParser;
}();

exports.default = OptionParser;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _optionparser = require('./optionparser.js');

var _optionparser2 = _interopRequireDefault(_optionparser);

var _detector = require('./detector.js');

var _detector2 = _interopRequireDefault(_detector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SmartBanner = function () {
  function SmartBanner() {
    _classCallCheck(this, SmartBanner);

    var parser = new _optionparser2.default();
    this.options = parser.parse();
    this.platform = _detector2.default.platform();
  }

  _createClass(SmartBanner, [{
    key: 'publish',
    value: function publish() {
      if (Object.keys(this.options).length === 0) {
        throw new Error('No options detected. Please consult documentation.');
      }
      document.write(this.html);
    }
  }, {
    key: 'priceSuffix',
    get: function get() {
      if (this.platform === 'ios') {
        return this.options.priceSuffixApple;
      } else if (this.platform == 'android') {
        return this.options.priceSuffixGoogle;
      }
      return '';
    }
  }, {
    key: 'icon',
    get: function get() {
      if (this.platform == 'android') {
        return this.options.iconGoogle;
      } else {
        return this.options.iconApple;
      }
    }
  }, {
    key: 'html',
    get: function get() {
      return '<div class="smartbanner smartbanner--' + this.platform + '">\n      <a href="#exit" class="smartbanner__exit"></a>\n      <div class="smartbanner__icon" style="background-image: url(' + this.icon + ');"></div>\n      <div class="smartbanner__info">\n        <div class="smartbanner__info__title">' + this.options.title + '</div>\n        <div class="smartbanner__info__author">' + this.options.author + '</div>\n        <div class="smartbanner__info__price">' + this.options.price + this.priceSuffix + '</div>\n      </div>\n      <a href="#view" class="smartbanner__button"><span class="smartbanner__button__label">' + this.options.button + '</span></a>\n    </div>';
    }
  }]);

  return SmartBanner;
}();

exports.default = SmartBanner;

},{"./detector.js":1,"./optionparser.js":3}]},{},[2]);