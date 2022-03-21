$(function() {
    var layer = layui.layer
    getUseinfo();
    $("#btnLogout").on("click", function() {

        layer.confirm('是否退出?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            localStorage.removeItem("token");
            location.href = "./login.html"

            layer.close(index);
        });


    })

})

function getUseinfo() {
    console.log("调用了")
    $.ajax({
        url: "/my/userinfo",
        method: "get",
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败")
            }
            console.log(res.data);
            rendenavatar(res.data)
        },

    })
}

function rendenavatar(user) {
    var name1 = user.nickname || user.username
    $("#welcome1").html("欢迎&nbsp;&nbsp;" + name1)
    $("#welcome2").html("欢迎&nbsp;&nbsp;" + name1)

    if (user.user_pic !== null) {

        $(".layui-nav-img")
            .attr("src", user.user_pic)
            .show()
        $(".avatar").hide()
            //layer.msg(user.user_pic)

    } else {
        $(".layui-nav-img").hide();
        var first = name1[0].toUpperCase()
        $(".avatar")
            .html(first)
            .show();
        //layer.msg(first)
    };

}