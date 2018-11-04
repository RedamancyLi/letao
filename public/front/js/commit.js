mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false,
});

function getSearch(k) {
  // 获取地址栏的参数
  var str = location.search;
  //解码成中文
  str = decodeURI(str);
  //去掉？
  str = str.slice(1);
  //&切割
  var arr = str.split('&')
  // 遍历数组
  var obj = {};
  arr.forEach(function (v, i) {
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[key] = value;
  });
  // console.log(obj);
  return obj[k];
}