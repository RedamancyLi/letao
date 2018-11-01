$(function () {
  var currentPage = 1; //全局的页码
  var pageSize = 5;   //每页多少条

  var currentId; //当前修改的用户id
  var isDelete;  //修改的状态
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data:
      {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        // 通过模板引擎渲染
        var htmlStr = template("tmp", info);
        // console.log(htmlStr);
        // 渲染到页面
        $('tbody').html(htmlStr);

        //调用分页插件
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数

          // 注册点击事件
          onPageClicked: function (event, originalEvent, type, page) {
            console.log(page);
            currentPage = page;
            render();
            //请求对应页码的数据进行渲染

          }
        })
      }
    });
  }

  //点击启用禁用按钮显示模态框
  // 元素动态生成   批量注册事件  使用事件委托
  $('tbody').on("click", ".btn", function () {
    // 显示模态框
    $("#userModal").modal("show");

    //获取父元素 td 中存储的data-id
    currentId = $(this).parent().data("id");
    //获取启用还是禁用 根据按钮的类来判断
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

  });

  //点击模态框确定按钮  进行修改用户状态
  $("#submitBtn").click(function () {
    //发送ajax 请求
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete,
      },
      dataType: "json",
      success: function (info) {
      console.log(info);
      // 关闭模态框
      $("#userModal").modal("hide");
      // 重新渲染
      render();
       console.log(isDelete);
      
      }
    })
   

  })
})