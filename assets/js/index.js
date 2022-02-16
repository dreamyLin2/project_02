// 入口函数
$(function() {
    // 调用getUserInfo()获取用户信息
    getUserInfo()
        // 点击按钮，实现退出功能
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        // 提示用户是否退出
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function(index) {
            // 1.清空本地存储的token
            localStorage.removeItem('token')
                // 2.重新跳转到登录页
            location.href = '/login.html'
                //关闭confirm确认框
            layer.close(index);
        });
    })
})

// bug:$.ajax里面必须的headers等属性，必须用小写开头
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // Headers 是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // 不论成功还是失败，最终都会调用compl回调函数
        // complete: function(res) {
        //     // 在回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //             // 2.强制跳转到登录页面
        //         location.href = '/login.html'

        //     }
        // }
    })
}

// 渲染用户头像
//用user接收
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
        // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2渲染文字头像
        $('.layui-nav-img').hide()
            // 首字母大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}