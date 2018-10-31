

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

$(function () {
  //获取对象 二级导航的切换
  $(".lt_aside .nav .category").click(function () {
    console.log($(this).next());
    $(this).next().stop().slideToggle();
  });
  // 左侧菜单的切换
  $('.lt_topbar .icon_menu').click(function () {
    // 切换侧边栏
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
  })

  //退出功能实现
  // 显示退出模态框
  $(".lt_topbar .icon_log_out").click(function () {
    //显示模态框
    $('#logoutModal').modal("show");
  });

  // 前端通过发送ajax请求 让后台销毁当前用户的登录状态
  $("#logoutBtn").click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        // console.log(info);
        if (info.success) {
          //跳转到登陆页面
          location.href = "login.html";
        }
      }
    })
  })


});