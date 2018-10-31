//调用进度条方法
// NProgress.start();
$(document).ajaxStart(function () {
  // 开启进度条
  NProgress.start();
});

$(document).ajaxStop(function () {
  // 请求完成时调用
  // 模拟网络环境
  setTimeout(function () {
    NProgress.done();
  }, 500);
})