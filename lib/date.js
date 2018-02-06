class GlDate{
  constructor(...arg) {
    this.originalDate = new Date(...arg);
    Object.getOwnPropertyNames(Date.prototype).forEach(method=>{
      if(method !== 'constructor'){
        GlDate.prototype[method] = Date.prototype[method].bind(this.originalDate);
      }
    })
  }

  get year(){
    return this.originalDate.getFullYear();
  }
  set year(val){
    if(typeof val !== 'number'){ 
      throw new TypeError('year must be number');
    }
    else{
      this.originalDate.setFullYear(val);
    }
  }
  get month(){
    return this.originalDate.getMonth();
  }
  set month(val){
    if(typeof val !== 'number'){ 
      throw new TypeError('month must be number');
    }
    else{
      this.originalDate.setMonth(val);
    }
  }
  get day(){
    return this.originalDate.getDate();
  }
  set day(val){
    if(typeof val !== 'number'){ 
      throw new TypeError('day must be number');
    }
    else{
      this.originalDate.setDate(val);
    }
  }
  get hour(){
    return this.originalDate.getHours();
  }
  set hour(val){
    if(typeof val !== 'number'){ 
      throw new TypeError('hour must be number');
    }
    else{
      this.originalDate.setHours(val);
    }
  }
  get minute(){
    return this.originalDate.getMinutes();
  }
  set minute(val){
    if(typeof val !== 'number'){
      throw new TypeError('minute must be number');
    }
    else{
      this.originalDate.setMinutes(val);
    }
  }
  get second(){
    return this.originalDate.getSeconds();
  }
  set second(val){
    if(typeof val !== 'number'){
      throw new TypeError('minute must be number');
    }
    else{
      this.originalDate.setSeconds(val);
    }
  }
  get timeStamp() {
    return this.originalDate.valueOf();
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
      'h+': this.hour,
      'm+': this.minute,
      's+': this.second,
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
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
   * @return {GlDate} 返回距当前时间dayDistance天的GlDate对象，dayDistance可以是整数或负数
   */
  // static getDateByDayDistance(dayDistance, { hour = 0, minute = 0, second = 0 } = {}) {
  //   let now = new GlDate();
  //   return new GlDate(now.year, now.month, now.day + dayDistance, hour, minute, second);
  // }
  static getDateByDayDistance(dayDistance) {
    let now = new GlDate();
    return new GlDate(now.year, now.month, now.day + dayDistance,12);
  } 
}


module.exports = GlDate;

module.exports.default = GlDate;




