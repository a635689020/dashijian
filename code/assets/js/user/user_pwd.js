$(function() {

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6~12位", "且不能出现空格"],
        samepwd: function(value) {
            if (value === $("[name = oldPwd]").val()) {
                return "新密码不能和旧密码相同"
            }
        },
        confirmpwd: function(value) {
            if (value !== $("[name = newPwd]").val()) {
                return "密码不一致"
            }

        }


    })
    $(".layui-form").on("submit", function(e) {


        e.preventDefault();

        $.ajax({
            type: "post",
            data: $(this).serialize(),
            url: "/my/updatepwd",
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg("修改密码失败")
                } else {
                    console.log("修改密码" + res)
                    layer.msg("修改密码成功")


                }
            }
        })
    })


})