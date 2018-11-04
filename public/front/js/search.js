$(function () {
  // var arr=["阿迪达斯","耐克","新百伦","彪马"]
  // var jsonStr=JSON.stringify(arr);
  // localStorage.setItem("search_list",jsonStr)

  // 渲染历史记录 
  // 读取本地存储 读取得到jsonStr
  //对空数据 进行处理  读取出来是null 取后面的
  //  读取本地存储 返回一个数组
  render();
  function getHistory() {
    var jsonStr = localStorage.getItem("search_list") || '[]';
    console.log(jsonStr);
    var arr = JSON.parse(jsonStr);
    console.log(arr);
    return arr;
  }
  //将渲染的数据进行封装
  function render() {
    var arr = getHistory();
    var htmlStr = template("list", { list: arr });
    console.log({ list: arr })
    $(".lt_history").html(htmlStr);
  }

  // 清空搜索历史  点击事件  事件委托
  $(".lt_history").on("click", ".btn_empty", function () {
    mui.confirm("亲!确定要清空历史记录吗？", "温馨提示", ["取消", "确认"], function (e) {
      if (e.index === 1) {
        localStorage.removeItem("search_list");
        render();
      }

    })
  });
  // 删除单条历史记录
  $(".lt_history").on("click", ".btn_delete", function () {
    // 获取下标
    var index = $(this).data("index");
    console.log(index);
    //获取数组
    var arr = getHistory();
    //根据下标删除
    arr.splice(index, 1);
    //存储到本地
    localStorage.setItem("search_list", JSON.stringify(arr));
    //页面渲染
    render();

  });


  // 添加搜索历史记录
  $(".search").click(function () {
    //获取输入框的值
    var key = $(".lt_search input").val().trim()  //val 获取 input里面的值  trim 去除所有的空格
    if (key === "") {
      mui.toast("请输入搜索关键字!");
      return;
    }
    //往数组的最前面添加
    //获取数组
    var arr = getHistory();
    // 如果发现在追加前 有重复的项 删除重复的项
    var index = arr.indexOf(key);
    console.log(index);
    if (index != -1) {
      // 有重复项  删除
      arr.splice(index, 1);
    }
    // 长度在10个以内

    if (arr.length >= 10) {
      //删除最后一个
      arr.pop();
    }
    //  追加到最前面
    arr.unshift(key);
    //转成jsonStr 存储到本地
    localStorage.setItem("search_list", JSON.stringify(arr));
    //重新渲染
    render();
    //清空内容
    $(".lt_search input").val("");


    //跳转到searchList 列表页面
    location.href = "searchList.html?key=" + key;

  })

})