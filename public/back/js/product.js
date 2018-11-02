$(function () {
  var currentpage = 1;
  var pageSize = 2;
  var picArr = [];  //图片数组 用于存储已经上传的图片对象 路径和名称
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data:
      {
        page: currentpage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("producttmp", info);
        console.log(htmlStr);
        $('tbody').html(htmlStr);

        //分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: info.total / info.size,//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage = page;
            render();
          }
        });
      },

    })
  };

  // 模态框显示
  $("#addbtn").click(function () {
    $("#addModal").modal("show");

    //获取所有的二级分类 进行渲染下拉菜单
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data:
      {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("productlist", info);
        $('.dropdown-menu').html(htmlStr);
      }

    })
  });

  //给下拉菜单的a 注册点击事件 
  $(".dropdown-menu").on("click", "a", function () {
    //获取文本设置给按钮
    var txt = $(this).text();
    $(".dropdownText").text(txt);
    //获取id 设置给隐藏域
    var id = $(this).data("id");
    console.log(id);
    $('[ name="brandId"]').val(id);

    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });


  //插件初始化
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      var picObj = data.result;
      var picUrl = picObj.picAddr;  //图片路径
      //往数组最前面追加
      picArr.unshift(picObj);

      // 将图片路径设置给img src 添加到imgBox子元素的最前面
      $("#imgBox").prepend('<img src="' + picUrl + '" alt="">')
      // console.log(picUrl)
      //当数组长度>3 删除最后一个
      if (picArr.length > 3) {
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }

      // 如果图片上传满了三张 让picStatus 状态 重置成 校验成功
      if (picArr.length === 3) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });

  //添加表单校验
  $('#form').bootstrapValidator({
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置校验字段
    fields:
    {
      brandId: {
        validators:
        {
          notEmpty:
          {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators:
        {
          notEmpty:
          {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators:
        {
          notEmpty:
          {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators:
        {
          notEmpty:
          {
            message: "请输入商品库存"
          },
          //正则校验\d 表示数字0-9
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '库存格式要求是非零开头的数字'
          }
        }
      },
      size: {
        validators:
        {
          notEmpty:
          {
            message: "请输入商品尺码"
          },
          //正则校验\d 表示数字0-9
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式必须是 xx-xx的格式,例如:32-40'
          }
        }
      },
      oldPrice: {
        validators:
        {
          notEmpty:
          {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators:
        {
          notEmpty:
          {
            message: "请输入商品现价"
          }
        }
      },
      picStatus: {
        validators:
        {
          notEmpty:
          {
            message: "请上传3张图片"
          }
        }
      },
    }
  });

  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();
    // 拼接需要传给后台的参数
    var params = $('#form').serialize();
    params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    console.log(params);
    // 通过ajax提交
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:params,
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success)
        {
          $("#addModal").modal("hide");
          //重新渲染第一页
          currentpage=1;
          render();
          // 重置模态框表单和状态
          $("#form").data("bootstrapValidator").resetForm(true);
          //重置文本和图片
          $(".dropdownText").text("请选择二级分类");
          $("#imgBox img").remove();
        }
      }
    })
  })
})
