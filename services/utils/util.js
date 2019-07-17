/**
 * 工具函数
 */
const Utils = {}

/**
 * 邮箱验证
 * @param {String} email 邮箱名
 */
Utils.validateEmail = (email) => {
  if (!email) {
    return false
  }
  return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(email)
}

/**
 * url验证
 * @param {String} url url
 */
Utils.validateUrl = (url) => {
  if (!url) {
    return false
  }
  // eslint-disable-next-line no-useless-escape
  return /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(url)
}

/**
 * 格式化时间
 * @param {Date} timestamp    时间对象
 * @param {String} formats      格式
 */
Utils.timestampToTime = (timestamp, formats) => {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d H:i:s';

  const zero = function (value) {
      if (value < 10) {
          return '0' + value;
      }
      return value;
  };

  // const myDate = timestamp * 1000 ? new Date(timestamp * 1000): new Date();
  const myDate = new Date(timestamp)

  const year = myDate.getFullYear()
  const month = zero(myDate.getMonth() + 1)
  const day = zero(myDate.getDate())

  const hour = zero(myDate.getHours())
  const minute = zero(myDate.getMinutes())
  const second = zero(myDate.getSeconds())

  return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
      return ({
          Y: year,
          m: month,
          d: day,
          H: hour,
          i: minute,
          s: second
      })[matches]
  })
}

export default Utils
