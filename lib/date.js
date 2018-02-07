class glDate {
  constructor(...arg) {
    let dateIns = new Date(...arg)
    Object.setPrototypeOf(dateIns, glDate.prototype)
    Object.setPrototypeOf(glDate.prototype, Date.prototype)
    return dateIns
  }
  get year() {
    return this.getFullYear()
  }
  set year(val) {
    this.setFullYear(val)
  }
  get month() {
    return this.getMonth()
  }
  set month(val) {
    this.setMonth(val)
  }
  get week() {
    let firstDay = new Date(a, 0, 1),
      daydiff = Math.round((this.valueOf() - firstDay.valueOf()) / 8.64e7)
    return Math.ceil((daydiff + firstDay.getDay()) / 7)
  }

  get date() {
    return this.getDate()
  }

  set date(val) {
    this.setDate(val)
  }

  get day() {
    return this.getDay()
  }

  get hours() {
    return this.getHours()
  }
  set hours(val) {
    this.setHours(val)
  }
  get minutes() {
    return this.getMinutes()
  }
  set minutes(val) {
    this.setMinutes(val)
  }
  get seconds() {
    return this.getSeconds()
  }
  set seconds(val) {
    this.setSeconds(val)
  }
  get milliseconds() {
    return this.getMilliseconds()
  }
  set milliseconds(val) {
    this.setMilliseconds(val)
  }
  get timeStamp() {
    return this.valueOf()
  }
  set timeStamp(val) {
    let newDate
    try {
      newDate = new Date(val)
      this.setFullYear(newDate.year, newDate.month, newDate.date)
      this.setHours(newDate.hours, newDate.minutes, newDate.seconds, newDate.milliseconds)
    } catch (e) {
      throw new Error('timeStamp out of range')
    }
  }

  // method

  _padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }

  /**
   * format Date
   * @param {String} fmt  eg:'yy-MM-dd'
   * @return {String}
   */
  format(fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.year + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': this.month + 1,
      'd+': this.date,
      'h+': this.hours,
      'm+': this.minutes,
      's+': this.seconds,
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this._padLeftZero(str))
      }
    }
    return fmt
  }

  /**
   * 返回从12点开始的秒级时间戳
   * @return {number} timeStamp
   */
  get12Ts() {
    return Math.round(this.clone().setStart(12, 'h').timeStamp / 1000);
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
        this.setFullYear(this.year + num)
        break
      case 'month':
      case 'M':
        this.setMonth(this.month + num)
        break
      case 'day':
      case 'd':
        this.setDate(this.date + num)
        break
      case 'hour':
      case 'h':
        this.setHours(this.hours + num)
        break
      case 'minute':
      case 'm':
        this.setMinutes(this.minutes + num);
        break
      case 'second':
      case 's':
        this.setSeconds(this.seconds + number)
        break
      case 'millisecond':
      case 'ms':
        this.setMilliseconds(this.milliseconds + number)
        break
      default:
        break
    }
    return this
  }

  /**
   * 是否之前
   * @param {Number|Date|String} compare 
   */
  isBefore(compare) {
    return this.valueOf() < new Date(compare)
  }

  /**
   * 是否之后
   * @param {Number|Date|String} compare 
   */
  isAfter(compare) {
    return this.valueOf() > new Date(compare)
  }

  clone() {
    return new glDate(this.valueOf())
  }

  setStart(num, unit) {
    switch (unit) {
      case 'year':
      case 'y':
        this.setFullYear(num, 0, 1)
        this.setHours(0, 0, 0, 0)
        break
      case 'month':
      case 'M':
        this.setFullYear(this.year, num, 1)
        this.setHours(0, 0, 0, 0)
        break
      case 'day':
      case 'd':
        this.setFullYear(this.year, this.month, num);
        this.setHours(0, 0, 0, 0);
        break
      case 'hour':
      case 'h':
        this.setHours(num, 0, 0, 0);
        break
      case 'minute':
      case 'm':
        this.setMinutes(num, 0, 0);
        break
      case 'second':
      case 's':
        this.setSeconds(num, 0)
        break
      case 'millisecond':
      case 'ms':
        this.setMilliseconds(num)
        break
      default:
        break
    }
    return this
  }

  static getByOffset(num, unit) {
    let now = new glDate()
    now.add(num, unit)
    return now
  }

  /**
   * @param {Date|glDate} arg
   * @returns glDate
   */
  static max(...arg) {
    return new glDate(Math.max(...arg.map(date => date.valueOf())))
  }

  /**
   * @param {Date|glDate} arg
   * @returns glDate
   */
  static min(...arg) {
    return new glDate(Math.min(...arg.map(date => date.valueOf())))
  }

  /**
   * 
   * @param { Date|glDate } fromDate
   * @param { Date|glDate } toDate 
   * @param { Number } step (second) 
   * @param { String } format
   */
  static duration(fromDate, toDate, step, format) {
    if(!step) return;
    let length = (Math.floor(toDate.valueOf() - fromDate.valueOf()) / 1000) / step + 1
    let ts0 = fromDate.valueOf()
    return Array.apply(null, { length }).map((_, index) => {
      return format ? new glDate(ts0 + step * 1000 * index).format(format) : new glDate(ts0 + step * 1000);
    })
  }
}

module.exports = glDate

module.exports.default = glDate