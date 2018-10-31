$(function () {
  $.ajax({
    type: "get",
    url: "/user/queryUser",
    data:
    {
      page: 1,
      pageSize: 5
    },
    dataType: "json",
    success: function (info) {
      console.log(info);
      // 通过模板引擎渲染
      var htmlStr = template("tmp", info);
      console.log(htmlStr);
      // 渲染到页面
      $('tbody').html(htmlStr);
    }
  })
})