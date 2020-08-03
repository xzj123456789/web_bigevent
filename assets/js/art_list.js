$(function () {

    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    var layer = layui.layer
    var form = layui.form

    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('')

                }
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)

            }
        })
    }
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // console.log(res);
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }


        })
    }
    initCate()
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })
    var laypage = layui.laypage
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 7],
            //分页发生切换的时候,触发jump回调
            //用frist参数来触发点击事件,防止出现laypage.render()方法中出现的死循环
            jump: function (obj, first) {
                q.pagenum = obj.curr//最新页码值
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })

    }
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        console.log($(this));
        var len = $('.btn-delete').length
        console.log(len);
        layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })

            layer.close(index);
        })

    })

})

