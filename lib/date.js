class glDate {
  constructor(...arg) {
    let dateIns = new Date(...arg);
    Object.setPrototypeOf(dateIns, glDate.prototype);
    Object.setPrototypeOf(glDate.prototype, Date.prototype);
    return dateIns;
  }
  get year() {
    return this.getFullYear();
  }
  set year(val) {
    if (typeof val !== 'number') {
      throw new TypeError('year must be number');
    }
    else {
      this.setFullYear(val);
    }
  }
  get month() {
    return this.getMonth();
  }
  set month(val) {
    if (typeof val !== 'number') {
      throw new TypeError('month must be number');
    }
    else {
      this.setMonth(val);
    }
  }
  get day() {
    return this.getDate();
  }
  set day(val) {
    if (typeof val !== 'number') {
      throw new TypeError('day must be number');
    }
    else {
      this.setDate(val);
    }
  }
  get hours() {
    return this.getHours();
  }
  set hours(val) {
    if (typeof val !== 'number') {
      throw new TypeError('hour must be number');
    }
    else {
      this.setHours(val);
    }
  }
  get minutes() {
    return this.getMinutes();
  }
  set minutes(val) {
    if (typeof val !== 'number') {
      throw new TypeError('minute must be number');
    }
    else {
      this.setMinutes(val);
    }
  }
  get seconds() {
    return this.getSeconds();
  }
  set seconds(val) {
    if (typeof val !== 'number') {
      throw new TypeError('minute must be number');
    }
    else {
      this.setSeconds(val);
    }
  }
  get milliseconds() {
    return this.getMilliseconds();
  }
  set milliseconds(val) {
    if (typeof val !== 'number') {
      throw new TypeError('minute must be number');
    }
    else {
      this.setMilliseconds(val)
    }
  }
  get timeStamp() {
    return this.valueOf();
  }
  set timeStamp(val) {
    let newDate;
    try {
      newDate = new Date(val);
      this.setFullYear(newDate.year, newDate.month, newDate.day);
      this.setHours(newDate.hours, newDate.minutes, newDate.seconds, newDate.milliseconds);
    } catch (e) {
      throw new Error('timeStamp out of range');
    }
  }

  _padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }

  /**
   * format Date
   * @param {String} fmt  eg:'yy-MM-dd'
   * @return {String}
   */
  format(fmt) {
    funtion
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.year + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': this.month + 1,
      'd+': this.day,
      'h+': this.hours,
      'm+': this.minutes,
      's+': this.seconds,
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this._padLeftZero(str));
      }
    }
    return fmt;
  }

  /**
   * 返回从某一时刻开始的时间戳，比如12点，或者0点。
   * @param {number} hour 
   * @param {number} minute
   * @param {number} second
   * @return {number} timeStamp
   */
  getTimeStamp({ hour = 0, minute = 0, second = 0, unit = 'milliSecond' } = {}) {
    let ts = new Date(this.year, this.month, this.day, hour, minute, second).getTime();
    return unit === 'millisecond' ? ts : ts / 1000;
  }

  /**
   * 返回从12点开始的秒级时间戳
   * @return {number} timeStamp
   */
  get12Ts() {
    return this.getTimeStamp({ hour: 12, unit: 'second' });
  }

  /**
   * 返回从12点开始的毫秒级时间戳
   * @return {number} timeStamp
   */
  get12MilliSecondTs() {
    return this.getTimeStamp({ hour: 12, unit: 'milliSecond' });
  }

  /**
   * 可以链式调用
   * @param {Number} num 可以为正数或者负数，负数表示减
   * @param {*} unit 单位
   */
  add(num, unit) {
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
        this.setDate(this.day + num);
        break;
      case 'hour':
      case 'h':
        this.setHours(this.hours + num);
        break;
      case 'second':
      case 's':
        this.setSeconds(this.seconds + number);
        break;
      case 'millisecond':
      case 'ms':
        this.setMilliseconds(this.seconds + number);
        break;
      default:
        break;
    }
    return this;
  }

  /**
   * 是否之前
   * @param {Number|Date|String} compare 
   */
  isBefore(compare) {
    return this.valueOf() < new Date(compare);
  }

  /**
   * 是否之后
   * @param {Number|Date|String} compare 
   */
  isAfter(compare) {
    return this.valueOf() > new Date(compare);
  }

  static getByOffset(num, unit) {
    let now = new glDate();
    now.add(num, unit);
    return now;
  }
}

module.exports = glDate;

module.exports.default = glDate;