/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {String} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp * 1000)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * [DateToTime 日期转换时间戳]
 * @param {[type]} date [日期格式，仅支持标准格式]
 * DateToTime("2018-01-11 11:08:31");
 * DateToTime("2018-01-11");
 * DateToTime("2018年01月11日 11时08分31秒");
 * DateToTime("2018");
 */
export const dateToTime = (date) => {
	let re = /(\d{4})(?:\D?(\d{1,2})(?:\D?(\d{1,2}))?[^\d\s]?)?(?:\s+(\d{1,2})\D?(\d{1,2})\D?(\d{1,2}))?/.exec(date);
	return new Date(re[1],(re[2]||1)-1,re[3]||1,re[4]||0,re[5]||0,re[6]||0).getTime()/1000;
}

// 获取 年月日 格式string
// params: string
export const getFormatDateString = (date, type) => {
  if (!date) return
  var YY = date.getFullYear() + '-'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  if (type === 'year') {
    return YY + MM + DD
  } else {
    return `${YY}${MM}${DD} ${hh}${mm}${ss}`
  }
}