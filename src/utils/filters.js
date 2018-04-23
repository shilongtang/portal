/**
 * Created by Administrator on 2017/8/18.
 */

//过滤手机号
export function toTel(value) {
  let start = value.slice(0, 4),
    end = value.slice(-2);
  return `${start}******${end}`
}

//小写转大写
export function uppercase(value) {
  return (value || value === 0)
    ? value.toString().toUpperCase()
    : ''
}

//大写转小写
export function lowercase(value) {
  return (value || value === 0)
    ? value.toString().toLowerCase()
    : ''
}

/**
 * 数字转换为货币
 * @param value
 * @param currency : 使用不同的符号 例: currency(£) // 12345 => £12,345.00
 * @param decimals : 使用不同的小数位数 例: currency(' ₽ ',0) // 12345 => ₽12,345
 */
export function currency(value, currency, decimals) {
  var digitsRE = /(\d{3})(?=\d)/g;
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) {
    return '';
  }
  currency = currency != null ? currency : '$';
  decimals = decimals != null ? decimals : 2;
  var stringified = Math.abs(value).toFixed(decimals);
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified;
  var i = _int.length % 3;
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : '';
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : '';
  var sign = value < 0 ? '-' : '';
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

/**
  * currency 接收一个数字，决定保留几位小数 ！会四舍五入
  */
export function area(value, currency) {
  let nNum = parseFloat(value);
  currency = currency != null ? currency : 2;
  if (!isNaN(nNum)) {
    let area = nNum.toFixed(currency);
    return area;
  }
  return 0;
}
