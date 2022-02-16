    //bug0215:监听表单提交行为记得使用submi事件
    $(function() {
        var form = layui.form

        form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在1~6个字符之间'
                }
            }
        })

        initUserInfo()

        var layer = layui.layer

        function initUserInfo() {
            $.ajax({
                method: 'GET',
                url: '/my/userinfo',
                success: function(res) {
                    if (res.status !== 0) {
                        return lazyrouter.msg('获取用户信息失败！')
                    }
                    console.log(res);
                    // 调用form.val()快速为表单赋值
                    form.val('formUserInfo', res.data)
                }
            })
        }
        // 监听重置按钮的行为
        $('#btnReset').on('click', function(e) {
            // 阻止表单的默认重置行为
            e.preventDefault()
            initUserInfo()
        })

        //监听表单提交修改的行为
        //bug0215:监听表单提交行为记得使用submi事件
        // $('.layui-form').on('submit', function(e) {
        //     // 阻止表单的默认提交行为
        //     e.preventDefault()
        //     $.ajax({
        //         method: 'POST',
        //         url: '/my/userinfo',
        //         data: $(this).serialize(),
        //         success: function(res) {
        //             if (res.status !== 0) {
        //                 return layer.msg('更新用户信息失败！')
        //             }
        //             layer.msg('更新用户信息成功')
        //                 // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        //             window.parent.getUserInfo()
        //         }
        //     })
        // })
        $('.layui-form').on('submit', function(e) {
            // 阻止表单的默认提交行为
            e.preventDefault()
                // 发起 ajax 数据请求
            $.ajax({
                method: 'POST',
                url: '/my/userinfo',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新用户信息失败！')
                    }
                    layer.msg('更新用户信息成功！')
                        // 子页面调用父页面中的方法，重新渲染用户的头像和用户的信息
                    window.parent.getUserInfo()
                }
            })
        })


    })