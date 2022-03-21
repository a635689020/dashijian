$(function() {

    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {

            if (value.length > 6)

                return "昵称长度必须在1~6个字符之间"
        }
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户失败")
                }
                console.log(res)
                form.val("formUserInfo", res.data)
            }


        })



    }
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        alert("1")
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),

            success: function(res) {
                console.log(res)
                if (res.status !== 0) { return layer.msg("提交失败") } else {
                    console.log(res.message)
                    window.parent.getUseinfo()
                }

            }

        })

    })

    // 重置
    $("#btnReset").on("click", function(e) {
        alert("执行重置")
        e.preventDefault();
        initUserInfo();

    })


})