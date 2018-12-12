var validator = require('../lib');

// isEmail
console.log(validator.isEmail('test@gmail.com'));

// isAllChinese
console.log(validator.isAllChinese('测试'));

// isAllEnglish
console.log(validator.isAllEnglish('test'));

// isAllDigit
console.log(validator.isAllDigit('12345'));

// isChineseIdCard
console.log(validator.isChineseIdCard('15210319861215033x'));