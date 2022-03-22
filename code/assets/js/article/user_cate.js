$(function () {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg("获取文章失败")
                else {
                    console.log(res);

                    var htmlstr = template("tpl-table", res)
                    $("tbody").html(htmlstr)
                }
            }

        })
    }
    // 添加分类弹出
    var indexAdd = null;
    $("#btnAddCate").on("click", function () {


        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });


    })
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/my/article/addcates",
            type: "post",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("添加分类失败")
                }
                initArtCateList()
                layer.msg("添加成功")
                layer.close(indexAdd)
            }
        })


    })

    // 编辑弹出
    var indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {


        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-edit").html()
        })

        var id = $(this).attr("data-id")
        $.ajax({
            method: "get",
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log("666" + res);

                form.val('form-edit', res.data)
            }

        })
    })

    // 编辑提交
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/my/article/updatecate",
            type: "post",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败")
                }

                layer.close(indexEdit)
                layer.msg("修改成功")
                initArtCateList()

            }
        })


    })

    // 编辑删除

    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })




})