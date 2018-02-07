(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["glDate"] = factory();
	else
		root["glDate"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var glDate = function () {
  /**
   * create a Date Object
   * 可以使用原生Date的生成方式,或者 new Date('2017.01.12','yyyy.MM.dd')
   * @param  arg 
   */
  function glDate() {
    _classCallCheck(this, glDate);

    var dateIns = void 0;

    for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    dateIns = new (Function.prototype.bind.apply(Date, [null].concat(arg)))();
    //原生创建失败，采用glDate的形式
    if (dateIns.valueOf() != dateIns.valueOf()) {
      var dateStr = arg[0].replace(/(\D)*/g, ''),
          fmt = arg[1].replace(/([^yMdhms])*/g, ''),
          fmtarr = fmt.split('');
      dateIns = new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(['y', 'M', 'd', 'm', 's'].map(function (k) {
        return ~~dateStr.substring(fmtarr.indexOf(k), fmtarr.lastIndexOf(k) + 1);
      })))))();
    }
    Object.setPrototypeOf(dateIns, glDate.prototype);
    Object.setPrototypeOf(glDate.prototype, Date.prototype);
    return dateIns;
  }

  /**
   * get or set year
   */


  _createClass(glDate, [{
    key: '_padLeftZero',
    value: function _padLeftZero(str) {
      return ('00' + str).substr(str.length);
    }

    /**
     * format Date
     * @param {String} fmt  eg:'yy-MM-dd'
     * y for year 
     * M from month 
     * d for date
     * h for hour
     * m for minute
     * s for second
     * @return {String} formated String
     */

  }, {
    key: 'format',
    value: function format(fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.year + '').substr(4 - RegExp.$1.length));
      }
      var o = {
        'M+': this.month + 1,
        'd+': this.date,
        'h+': this.hours,
        'm+': this.minutes,
        's+': this.seconds
      };
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          var str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this._padLeftZero(str));
        }
      }
      return fmt;
    }

    /**
     * 返回从12点开始的秒级时间戳
     * @return {number} timeStamp
     */

  }, {
    key: 'get12Ts',
    value: function get12Ts() {
      return Math.round(this.clone().setStart(12, 'h').timeStamp / 1000);
    }

    /**
     * 修改当前时间,可以链式调用
     * @param {Number} num 可以为正数或者负数，负数表示减
     * @param {*} unit 单位
     * year y for year
     * month M for month
     * day d for day
     * hour h for hour
     * minute m for minute
     * second s for second
     * millisecond ms fro millisecond
     * @returns void 0
     */

  }, {
    key: 'add',
    value: function add(num, unit) {
      switch (unit) {
        case 'year':
        case 'y':
          this.setFullYear(this.year + num);
          break;
        case 'month':
        case 'M':
          this.setMonth(this.month + num);
          break;
        case 'day':
        case 'd':
          this.setDate(this.date + num);
          break;
        case 'hour':
        case 'h':
          this.setHours(this.hours + num);
          break;
        case 'minute':
        case 'm':
          this.setMinutes(this.minutes + num);
          break;
        case 'second':
        case 's':
          this.setSeconds(this.seconds + number);
          break;
        case 'millisecond':
        case 'ms':
          this.setMilliseconds(this.milliseconds + number);
          break;
        default:
          break;
      }
      return this;
    }

    /**
     * 是否在某一时间之前
     * @param {Number|Date|String} compare
     * @return {Boolean}
     */

  }, {
    key: 'isBefore',
    value: function isBefore(compare) {
      return this.timeStamp < new glDate(compare).timeStamp;
    }

    /**
     * 是否在某一时间之后
     * @param {Number|Date|String} compare 
     * @return {Boolean}
     */

  }, {
    key: 'isAfter',
    value: function isAfter(compare) {
      return this.timeStamp > new glDate(compare).timeStamp;
    }

    /**
     * 拷贝当前时间
     * @return { glDate }
     * @return {glDate}
     */

  }, {
    key: 'clone',
    value: function clone() {
      return new glDate(this.valueOf());
    }

    /**
     * 将当前时间置于某一开始时刻
     * @param {Number} num 设置开始的时间
     * @param {String} unit 设定单位
     * year y for year
     * month M for month
     * day d for day
     * hour h for hour
     * minute m for minute
     * second s for second
     * millisecond ms fro millisecond
     * @return viod 0
     */

  }, {
    key: 'setStart',
    value: function setStart(num, unit) {
      switch (unit) {
        case 'year':
        case 'y':
          this.setFullYear(num, 0, 1);
          this.setHours(0, 0, 0, 0);
          break;
        case 'month':
        case 'M':
          this.setFullYear(this.year, num, 1);
          this.setHours(0, 0, 0, 0);
          break;
        case 'day':
        case 'd':
          this.setFullYear(this.year, this.month, num);
          this.setHours(0, 0, 0, 0);
          break;
        case 'hour':
        case 'h':
          this.setHours(num, 0, 0, 0);
          break;
        case 'minute':
        case 'm':
          this.setMinutes(num, 0, 0);
          break;
        case 'second':
        case 's':
          this.setSeconds(num, 0);
          break;
        case 'millisecond':
        case 'ms':
          this.setMilliseconds(num);
          break;
        default:
          break;
      }
      return this;
    }

    /**
     * 返回距当前某一时间段的时间,unit单位同add
     * eg:glDate.getByOffset(1,'day');
     * @param {Number} num 
     * @param {String} unit 单位
     * @return {glDate}
     */

  }, {
    key: 'year',
    get: function get() {
      return this.getFullYear();
    },
    set: function set(val) {
      this.setFullYear(val);
    }

    /**
     * get or set Month
     */

  }, {
    key: 'month',
    get: function get() {
      return this.getMonth();
    },
    set: function set(val) {
      this.setMonth(val);
    }

    /**
     * get week
     */

  }, {
    key: 'week',
    get: function get() {
      var firstDay = new Date(this.year, 0, 1),
          daydiff = Math.round((this.valueOf() - firstDay.valueOf()) / 8.64e7);
      return Math.ceil((daydiff + firstDay.getDay()) / 7);
    }

    /**
     * get or set date
     */

  }, {
    key: 'date',
    get: function get() {
      return this.getDate();
    },
    set: function set(val) {
      this.setDate(val);
    }

    /**
     * get day
     */

  }, {
    key: 'day',
    get: function get() {
      return this.getDay();
    }

    /**
     * get or set hours
     */

  }, {
    key: 'hours',
    get: function get() {
      return this.getHours();
    },
    set: function set(val) {
      this.setHours(val);
    }

    /**
     * get or set minutes
     */

  }, {
    key: 'minutes',
    get: function get() {
      return this.getMinutes();
    },
    set: function set(val) {
      this.setMinutes(val);
    }

    /**
     * get or set seconds
     */

  }, {
    key: 'seconds',
    get: function get() {
      return this.getSeconds();
    },
    set: function set(val) {
      this.setSeconds(val);
    }

    /**
     * get or set milliseconds
     */

  }, {
    key: 'milliseconds',
    get: function get() {
      return this.getMilliseconds();
    },
    set: function set(val) {
      this.setMilliseconds(val);
    }

    /**
     * get or set timeStamp
     */

  }, {
    key: 'timeStamp',
    get: function get() {
      return this.valueOf();
    },
    set: function set(val) {
      var newDate = void 0;
      try {
        newDate = new Date(val);
        this.setFullYear(newDate.year, newDate.month, newDate.date);
        this.setHours(newDate.hours, newDate.minutes, newDate.seconds, newDate.milliseconds);
      } catch (e) {
        throw new Error('timeStamp out of range');
      }
    }
  }], [{
    key: 'getByOffset',
    value: function getByOffset(num, unit) {
      var now = new glDate();
      now.add(num, unit);
      return now;
    }

    /**
     * 返回最大的一个时间
     * @param {Date|glDate} arg
     * @returns { glDate }
     */

  }, {
    key: 'max',
    value: function max() {
      for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        arg[_key2] = arguments[_key2];
      }

      return new glDate(Math.max.apply(Math, _toConsumableArray(arg.map(function (date) {
        return date.valueOf();
      }))));
    }

    /**
     * 返回最小的一个时间
     * @param {Date|glDate} arg
     * @returns { glDate }
     */

  }, {
    key: 'min',
    value: function min() {
      for (var _len3 = arguments.length, arg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        arg[_key3] = arguments[_key3];
      }

      return new glDate(Math.min.apply(Math, _toConsumableArray(arg.map(function (date) {
        return date.valueOf();
      }))));
    }

    /**
     * 返回在一个开始和结束时间段中,按step分隔的时间数组
     * 如果提供format则返回字符串，否则返回glGate
     * @param { Date|glDate } fromDate
     * @param { Date|glDate } toDate 
     * @param { Number } step second为单位
     * @param { String } format
     * @return {Array<glGate|String>}
     */

  }, {
    key: 'duration',
    value: function duration(fromDate, toDate, step, format) {
      if (!step) return;
      var length = Math.floor(toDate.valueOf() - fromDate.valueOf()) / 1000 / step + 1;
      var ts0 = fromDate.valueOf();
      return Array.apply(null, { length: length }).map(function (_, index) {
        return format ? new glDate(ts0 + step * 1000 * index).format(format) : new glDate(ts0 + step * 1000);
      });
    }
  }]);

  return glDate;
}();

module.exports = glDate;

module.exports.default = glDate;

/***/ })
/******/ ]);
});
//# sourceMappingURL=glDate.map