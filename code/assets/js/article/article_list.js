$(function () {
    template.defaults.imports.dataFormaat = function (date) {
        const dt = new date(date);
        var y = dt.getFullyear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + "-" + m + "-" + d + "" + hh + ":" + mm + ":" + ss

        function padZero(n) {
            return n > 9 ? n : "0" + n;


        }

    }
    var laypage = layui.laypage;

    var layer = layui.layer
    var form = layui.form


    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    }
    initTbale()
    initCate()

    function initTbale() {
        $.ajax({
            method: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg("列表初始化失败")
                } else {
                    var htmlstr = template("tpl-table", res)
                    $("tbody").html(htmlstr)

                    //return layer.msg("列表初始化成功")
                    pagerender(res.total)
                    console.log("inittable" + htmlstr);
                }



            }

        })


    }

    function initCate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg("获取分类数据失败")
                } else {
                    var htmlstr = template("tpl-cate", res)
                    console.log("initcate" + htmlstr);

                    $("[name=cate_id]").html(htmlstr)
                    //ui渲染
                    form.render()
                    return layer.msg("分类数据初始化成功")

                }



            }

        })


    }

    $("#form-search").on("submit", function (e) {
        e.preventDefault();
        var cate_id = $("[name=cate_id]").val()
        q.cate_id = cate_id;
        var state = $("[name=state]").val();
        q.state = state
        console.log("q.cate" + cate_id);
        console.log(state);


        initTbale();



    })




    // 分页渲染
    function pagerender(total) {
        console.log("总数是" + total);

        //执行一个laypage实例
        laypage.render({

            elem: 'pagebox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。

                console.log(obj.limit); //得到每页显示的条数

                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initTbale();
                }
            }
        });

    }
    // 删除
    $("tbody").on("click", ".btn-delete", function () {
        var id = $(this).attr("data-id")
        var len = $(".btn-delete").length
        layer.confirm('是否要删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: "get",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        console.log("删除的" + res);

                        return layer.msg("删除失败")
                    } else {
                        layer.msg("删除成功")
                        if (len === 1) {
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                        }
                        initTbale()
                    }
                }
            })

            layer.close(index);
        });

    })

})