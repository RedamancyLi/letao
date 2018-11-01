$(function () {
  // 分页功能
  var currentPage = 1; //当前页
  var pageSize = 5;   //每页多少条
  render();
  //1.发送ajax 进行渲染
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("firstTpl", info);
        $('tbody').html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            // 更新当前页
            currentPage=page;
            render();
          }
        });
      }
    })
  }

});




