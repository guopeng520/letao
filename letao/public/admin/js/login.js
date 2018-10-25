$(function () {
  $('form').bootstrapValidator({
    // 设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度为6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }

    }
  })
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    console.log('haha');
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('form').serialize(),
      success: function (data) {
        if (data.success) {
          location.href = 'index1.html';
        }
        if (data.error === 1000) {
          $('form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
        }
        if (data.error === 1001) {
            $('form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
          }
        }
      });
  });
  $("button[type='reset']").on('click',function(){
    $('form').data('bootstrapValidator').resetTorm();
  })
});