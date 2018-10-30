$(function () {
  $('#form').bootstrapValidator(
    {
      //2. 指定校验时的图标显示，默认是bootstrap风格
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',  //校验成功
        invalid: 'glyphicon glyphicon-remove',  //校验失败
        validating: 'glyphicon glyphicon-refresh' //校验中
      },
      // 配置校验 要先给input配置name
      fields: {
        username:
        {
          // 配置校验规则
          validators:
          {
            //非空校验
            notEmpty: {
              message: "用户名不能为空"
            },
            //  长度校验
            stringLength:
            {
              min: 2,
              max: 6,
              message: "用户名长度必须是2-6位"
            },
            callback:
            {

              message: "用户名不存在"
            }
          }
        },
        password:
        {
          validators:
          {
            notEmpty:
            {
              message: "密码不能为空"
            },
            //长度校验
            stringLength:
            {
              min: 6,
              max: 12,
              message: "密码长度必须是6-12位"
            },
            callback: {
              message: "密码错误"
            }
          }
        }
      }
    }
  );

  //登录功能
  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();
    console.log("阻止了默认的提交");
    console.log(e);
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          location.href = "index.html";
        }
        if (info.error === 1000) {
          //提示用户名不存在
          // alert(info.message);
          // 调用插件方法 更新校验状态为失败
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
        }
        if (info.error === 1001) {
          //密码错误
          // alert(info.message);
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
      },
      error: function () {
        console.log("错误");
      }
    })
  });

  //重置功能
  $('[type="reset"]').click(function () {
    //调用实例的方法  重置校验状态和内容  不传true 只重置文本内容
    $('#form').data("bootstrapValidator").resetForm(true);
  })
});