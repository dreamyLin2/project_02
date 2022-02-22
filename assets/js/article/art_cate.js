$(function() {
    initArtCateList()
    var layer = layui.layer
    var form = layui.form

    // 渲染分类的信息
    function initArtCateList() {
        // T2 使用$.ajax调用服务器分类数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // T5 调用template 函数，并将数据传到页面结构中
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            },
        })
    }

    // 添加分类的弹出层
    // 为弹出层layer.open()增加索引，这里先定义为空，为后面关闭弹出层做准备
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 实现点击添加分类的功能
    // 通过代理的方式，为form-add表单绑定submit事件
    //选择页面已经存在的元素body
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        console.log('ok');
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                    // 新增成功后，关闭对应的弹出层
                layer.close(indexAdd)
                layer.msg('新增分类成功')
            }
        })
    })

    //编辑分类的弹出层
    //通过代理的方式，为btn-edit 编辑按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
            console.log('OK');
            indexEdit = layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章分类',
                content: $('#dialog-edit').html()
            });

            // 修正
            var id = $(this).attr('data-id')
                // 发起请求获取对应分类的数据
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }
            })
        })
        // BUG:点击编辑按钮，弹出id的功能要放在点击事件里面
        // var id = $(this).attr('data-id')
        // console.log(id);

    // 通过代理的方式，为修改分类的表单绑定submit事件   
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()


        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        // 获取删除选项的id
        var id = $(this).attr('data-id')
        console.log(id);
        // 提示用户是否删除
        layer.confirm('确认是否删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    layer.msg('删除分类成功')
                    layer.close(index)
                    initArtCateList()
                }
            })
        });
    })
})