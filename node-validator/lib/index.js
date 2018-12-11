
module.exports = {
  isEmail: function (str) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(str);      
  },
  isAllChinese: function (str) {
    return !/[^\u4e00-\u9fa5]/.test(str);      
  },
  isAllEnglish: function (str) {
    return /^[a-zA-Z]+$/.test(str);      
  },
  isAllDigit: function (str) {
    return /^[0-9]+$/.test(str);      
  },
  isChineseTel: function (str) {
    return /^1[34578]\d{9}$/.test(str);      
  },
  isChineseIdCard: function (str) {
    if (!(str.length === 18)) {
      return false;          
    } else {
      return isBirthValid(str) && isCodeValid(str);          
    }
    function isBirthValid (num) {
      var year = num.substring(6, 10);
      var month = num.substring(10, 12);
      var day = num.substring(12, 14);
      var temp = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10));
      return (temp.getFullYear() === parseInt(year, 10) && temp.getMonth() + 1 === parseInt(month, 10) &&temp.getDate() === parseInt(day, 10));
    }
    function isCodeValid (num) {
      var wc = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
      var validCodeArr = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var temp = num.split('');
      if (temp[17].toLowerCase() === 'x') {
        temp[17] = 10;
      }
      for (var i = 0; i < temp.length - 1; i++) {
        sum += wc[i] * temp[i];
      }
      return temp[17] == validCodeArr[sum % 11];
    }
  },
  isVisaCard: function (str) {
        return /^4[0-9]{12}(?:[0-9]{3})?$/.test(str);
          
  },
  isMasterCard: function (str) {
    return /^5[1-5][0-9]{14}$/.test(str);
  },
  isLink: function (str) {
    return /http(s)?\:\/\/([\w\d.?]+(\/)?)+/.test(str);      
  }
}
