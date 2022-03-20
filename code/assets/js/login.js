$(function() {
    $("#bt").on("click", function() {

        alert("halo")

    })
    $("#link_reg").on("click", function() {
        console.log("ll")
        $(".loginbox").hide()
        $(".regbox").show()

    })
    $("#link_login").on("click", function() {
        $(".regbox").hide();
        $(".loginbox").show()


    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位且不能出现空格'],
        repwd: function(value) {
            var pwd = $(".regbox [name =password]").val()
            if (pwd !== value) {
                return "密码不一致"
            }
        }

    });
    $("#reg_form").on("submit", function(e) {

        e.preventDefault();
        var data = {
            username: $("#reg_form [name = username]").val(),
            password: $("#reg_form [name = password]").val()
        }
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            } else layer.msg("注册成功")
            $("#link_login").click()
        })


    })
    $("#login_form").submit(function(e) {

        e.preventDefault();
        $.ajax({
            data: $(this).serialize(),
            url: "/api/login",
            method: "post",
            success: function(res) {

                if (res.status !== 0)
                    return layer.msg(res.message)
                else
                    layer.msg("登录成功")
                console.log(res.token)
                localStorage.setItem("token", res.token)
                    // location.href("/index.html")
            }


        })


    })




})