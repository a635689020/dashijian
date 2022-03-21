$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $("#btnChoose").on("click", function() {

        $("#file").click()
    })
    $("#file").on("change", function(e) {
        console.log("文件变化")
        var files = e.target.files
        console.log(files)
        if (files.length === 0) {
            return layer.msg("请打开图片")
        }
        var file = files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $("#btnConfirm").on("click", function() {

        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串



        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },

            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg("图像上传失败")
                } else {
                    layer.msg("图像上传成功")
                    window.parent.getUseinfo()
                }

            }

        })

    })



})