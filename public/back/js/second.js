$(function () {
  var currentpage = 1;
  var pagesize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data:
      {
        page: currentpage,
        pageSize: pagesize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);

        var htmlStr = template("secondtmp", info);
        $('tbody').html(htmlStr);


        //分页插件
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil(info.total / info.size),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage = page;
            render();
          }
        });
      }



    })
  }

  //显示模态框
  $("#addbtn").click(function () {
    //显示模态框 请求模态框下拉菜单数据进行渲染
    $("#addModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data:
      {
        page: 1,
        pagesize: 100
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("downtmp", info);
        console.log(htmlStr);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  })

  //给下拉菜单的a 注册点击事件 事件委托
  $(".dropdown-menu").on("click", "a", function () {
    // console.log($(this).text());
    //获取a的文本
    var txt = $(this).text();
    // 设置给按钮
    $('.spa').text(txt);

    //获取选择的一级分类id 设置给隐藏域
    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);
    //让一级分类的id 设置给隐藏域

    // 让一级分类对应的隐藏域  校验状态 设置成 校验成功
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  })


  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      // 图片的路径
      var picUrl = data.result.picAddr;
      //设置给img 的src 属性
      $("#imgBox img").attr("src", picUrl);

      //设置给隐藏域
      $("[name='brandLogo']").val(picUrl);
      
      //让隐藏域 检验状态 变为 检验成功
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  });


  // 表单校验
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // 对任意配置的input都进行了检验
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields:
    {
      categoryId:
      {
        validators:
        {
          notEmpty:
          {
            message: "请选择一级分类"
          }
        }
      },
      brandName:
      {
        validators:
        {
          notEmpty:
          {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo:
      {
        validators:
        {
          notEmpty:
          {
            message: "请选择图片"
          }
        }
      },
    }
  });


  //注册表单检验成功事件 阻止默认的表单提交  通过ajax 提交
  $("#form").on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
      console.log(info);
      if(info.success)
      {
         //分类添加成功  模态框隐藏  表单重置  页面刷新
          $("#addModal").modal("hide");
        //  重新渲染第一页
          currentPage=1;
          render();
          //表单重置 状态和内容
          $('#form').data("bootstrapValidator").resetForm(true);

          // 重置img和文本
          $(".spa").text("请选择一级分类");
          $('#imgBox img').attr("src","images/none.png");
      } 
      }
    })
  })
})