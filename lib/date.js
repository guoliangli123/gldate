export default class glDate{
  constructor(...arg) {
    let dateIns = new Date(...arg);
    Object.setPrototypeOf(dateIns, glDate.prototype);
    Object.setPrototypeOf(glDate.prototype, Date.prototype);
    return dateIns;
  }
  get year(){
    return this.getFullYear();
  }
  set year(val){
    if(typeof val !== 'number'){ 
      throw new TypeError('year must be number');
    }
    else{
      this.setFullYear(val);
    }
  }
  get month(){
    return this.getMonth();
  }
  set month(val){
    if(typeof val !== 'number'){ 
      throw new TypeError('month must be number');
    }
    else{
      this.setMonth(val);
    }
  }
  get day(){
    return this.getDate();
  }
  set day(val){
    if(typeof val !== 'number'){ 
      throw new TypeError('day must be number');
    }
    else{
      this.setDate(val);
    }
  }
  get hours(){
    return this.getHours();
  }
  set hours(val){
    if(typeof val !== 'number'){ 
      throw new TypeError('hour must be number');
    }
    else{
      this.setHours(val);
    }
  }
  get minutes(){
    return this.getMinutes();
  }
  set minutes(val){
    if(typeof val !== 'number'){
      throw new TypeError('minute must be number');
    }
    else{
      this.setMinutes(val);
    }
  }
  get seconds(){
    return this.getSeconds();
  }
  set seconds(val){
    if(typeof val !== 'number'){
      throw new TypeError('minute must be number');
    }
    else{
      this.setSeconds(val);
    }
  }
  get timeStamp() {
    return this.valueOf();
  }

  _padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }

  /**
   * format Date
   * @param {String} fmt
   * @return {String}
   */
  format(fmt) {
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
  getTimeStamp({hour = 0, minute = 0, second = 0,unit = 'milliSecond' } = {}) {
    let ts = new Date(this.year, this.month, this.day, hour, minute, second).getTime();
    return unit==='millisecond'?ts:ts/1000;
  }

  /**
   * 返回从12点开始的秒级时间戳
   * @return {number} timeStamp
   */
  get12Ts() {
    return this.getTimeStamp({hour:12,unit:'second'});
  }

  /**
   * 返回从12点开始的毫秒级时间戳
   * @return {number} timeStamp
   */
  get12MilliSecondTs(){
    return this.getTimeStamp({hour:12,unit:'milliSecond'});
  }

  /**
   * @param {number} dayDistance整数
   * @param {Object} option
   * @return {glDate} 返回距当前时间dayDistance天的glDate对象，dayDistance可以是整数或负数
   */
  // static getDateByDayDistance(dayDistance, { hour = 0, minute = 0, second = 0 } = {}) {
  //   let now = new glDate();
  //   return new glDate(now.year, now.month, now.day + dayDistance, hour, minute, second);
  // }
  static getDateByDayDistance(dayDistance) {
    let now = new glDate();
    return new glDate(now.year, now.month, now.day + dayDistance,12);
  } 
}

module.exports = GlDate;

module.exports.default = GlDate;




