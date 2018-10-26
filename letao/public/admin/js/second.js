$(function () {
  var page = 1;
  var pageSize = 5;
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
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

    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tpl2', info))
      }
    })
  })

  $('.dropdown-menu').on('click', 'li', function () {
    $('.dropdown-text').html($(this).children().html());
    $('[name="categoryId"]').val($(this).data('id'));

    $('form')
    .data('bootstrapValidator')
    .updateStatus('categoryId', 'VALID')

  })

  $("#file").fileupload({
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      $('.img_box img').attr('src', data.result.picAddr);
      $('[name=brandLogo]').val(data.result.picAddr);

      $('form')
      .data('bootstrapValidator')
      .updateStatus('brandLogo', 'VALID')
    }
  });

  //使用表单校验插件
  $('form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '二级分类名不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传二级分类图片'
          }
        }
      }
    }
  });

  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('form').serialize(),
      success:function(info){
        if(info.success){
          page = 1 ;
          render();
          $('#addModal').modal('hide');

          $('form').data('bootstrapValidator').resetForm(true);
          $('.dropdown-text').html('请选择一级分类');
          $('.img_box img').attr('src','images/none.png' );
        }
      }
    })
  })
});