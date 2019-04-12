/**
 * 给字符串原型上添加方法，
 * 利用字符串方法和正则表达式，
 * 根据输入的模板，返回相应的时间格式，
 * 0--年，1--月，2--日，3--时，4--分，5--秒
 */

String.prototype.myFormatTime = function myFormatTime(template = '{0}年{1}月{2}日 {3}时{4}分{5}秒') {
    // 获取所有数字，并根据长度判断是否补0
    let arr = this.match(/\d+/g).map((item) => item.length < 2 ? '0' + item : item);
    // 将字符串获取的数字，替换模板对应的位置
    return template.replace(/\{(\d)\}/g, (...[, index]) => arr[index] || '00');
}
