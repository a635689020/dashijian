$(function () {

    var layer = layui.layer
    var form = layui.form

    initCate()
    //初始化类别

    function initCate() {
        $.ajax({
            url: "/my/article/cates",
            type: 'get',
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    layer.msg("发布页面的初始化类别失败")
                }
                var htmstr = template("tpl-cate", res)
                console.log("pub初始化类别" + htmstr)
                $("[name=cate_id]").html(htmstr)

                form.render()
            }
        })
    }
    //初始化类别结束
    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 点击隐藏域
    $(".btn-chooseimg").click(function () {
        $("#coverfile").click()

    })
    // coverfile触发事件
    $("#coverfile").on("change", function (e) {
        var files = e.target.files
        if (files.length == 0) {
            return layer.msg("未上传文件")
        }
        var file = files[0]



        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 表单上传
    var art_state = "已发布"
    $("#btsSave2").click(function () {
        art_state = "草稿"

    })

    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0])
        fd.append("state", art_state)
        // 将图片上传到表单
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append("cover_img", blob)
                // fd.forEach(function (v, k) {
                //     console.log(k, v);
                // })

                publishArticle(fd);


            })

    })

    function publishArticle(fd) {
        $.ajax({
            url: "/my/article/add",
            type: "post",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("上传数据失败")
                } else {
                    layer.msg("上传数据成功")
                    location.href = "../article/article_list.html"
                }

            }



        })

    }

})