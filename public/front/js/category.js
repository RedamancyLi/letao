$(function () {
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function (info) {
      // console.log(info);
      var htmlStr = template("cate_one", info);
      $(".one").html(htmlStr);

      //渲染第一个一级分类  对应的二级分类
      renderById(info.rows[0].id)
    }

  });

  //给左侧的列表 注册点击事件
  $(".one").on("click", "a", function () {
   
    //获取id 
    var id =$(this).data("id");
    console.log(id)
    renderById(id);

     //切换current   自己加上  其他的移除
    $(this).addClass('current').parent().siblings().find("a").removeClass('current');

  })


  //根据一级分类的id渲染二级分类
  function renderById(id) {
    //  发送ajax
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        var htmlStr = template("cate_two", info);
        $(".two").html(htmlStr);
      }
    })
  }
})