$(function () {
  var page = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('tpl', info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  }
  render();

  $('.btn_add').on('click', function () {
    $('#addModal').modal('show');
  })
  $('form').bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: "glyphicon glyphicon-refresh"
    }
  });
  $("form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data: $('form').serialize(),
      success:function(info){
        if(info.success){
          page = 1;
          render();
          $('#addModal').modal('hide');
          $('form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  });
})