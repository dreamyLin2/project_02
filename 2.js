 $('#form-pub').on('submit', function(e) {
     // 1. 阻止表单的默认提交行为
     e.preventDefault()
         // 2. 基于 form 表单，快速创建一个 FormData 对象
     var fd = new FormData($(this)[0])
         // 3. 将文章的发布状态，存到 fd 中
     fd.append('state', art_state)
         // 4. 将封面裁剪过后的图片，输出为一个文件对象
     $image
         .cropper('getCroppedCanvas', {
             // 创建一个 Canvas 画布
             width: 400,
             height: 280
         })
         .toBlob(function(blob) {
             // 将 Canvas 画布上的内容，转化为文件对象
             // 得到文件对象后，进行后续的操作
             // 5. 将文件对象，存储到 fd 中
             fd.append('cover_img', blob)
                 // 6. 发起 ajax 数据请求
             publishArticle(fd)
         })
 })

 function publishArticle(fd) {
     $.ajax({
         method: 'POST',
         url: '/my/article/add',
         data: fd,
         // 注意：如果向服务器提交的是 FormData 格式的数据，
         // 必须添加以下两个配置项
         contentType: false,
         processData: false,
         success: function(res) {
             if (res.status !== 0) {
                 return layer.msg('发布文章失败！')
             }
             layer.msg('发布文章成功！')
                 // 发布文章成功后，跳转到文章列表页面
             location.href = '/article/art_list.html'
         }
     })
 }