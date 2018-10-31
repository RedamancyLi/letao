//进入页面判断当前用户是否是登陆的（发送请求 询问后台） 如果是已登录才能继续访问
$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function (info) {
    console.log(info);
    if (info.error === 400) {
      // 未登录 拦截到登录页
      location.href = "login.html";
    }
  }
})