// 获取 年月日 格式string
// params: string
export const getFormatDateString = (date, type) => {
  if (!date) return
  var YY = date.getFullYear() + '-'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  if (type === 'year') {
    return YY + MM + DD
  } else {
    return `${YY}${MM}${DD} ${hh}${mm}${ss}`
  }
}
