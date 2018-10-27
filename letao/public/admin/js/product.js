$(function () {
  var page = 1;
  var pageSize = 2;
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        $('tbody').html(template('tpl', info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          itemTexts: function (type, page, current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'page':
                return page;
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'page':
                return '第' + page + '页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
            }
          },
          useBootstrapTooltip: true,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })
      }
    })
  }
  render()

  $('.btn_add').on('click', function () {
    $('#productModal').modal('show');

    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info);
        $('.dropdown-menu').html(template('tpl2', info));

      }
    })
  })

  $('.dropdown-menu').on('click', 'li', function () {
    // console.log('hehe');
    $('.dropdown-text').html($(this).children().html());
    $('[name="brandId"]').val($(this).data('id'));
    $("form").data('bootstrapValidator').updateStatus('brandId', 'VALID');

  })

  var imgs = [];
  $("#file").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(e,data);
      if (imgs.length >= 3) {
        return false
      }
      $('.img_box').append('<img width="100" height="100" src=' + data.result.picAddr + ' alt="">');
      imgs.push(data.result)
      if (imgs.length == 3) {
        $('form')
          .data('bootstrapValidator')
          .updateStatus('brandLogo', 'VALID')
      } else {
        $('form')
          .data('bootstrapValidator')
          .updateStatus('brandLogo', 'INVALID');
      }

    }
  });

  $('form').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: "glyphicon glyphicon-refresh"
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品的名称'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品的库存'
          },
          regexp: {
            //不能是0开头，必须是数字
            regexp: /^[1-9]\d*$/,
            message: "请输入合法的库存"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品的尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入合法的尺码,例如(32-46)"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品的原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品的价格'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    var data = $('form').serialize();
    data += "&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
    data += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    data += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:data,
      success:function(info){
        console.log(info);
        if(info.success){
          $('#productModal').modal('hide');
          page = 1 ;
          render();
          $('form').data("bootstrapValidator").resetForm(true);
          $('.dropdown-text').html('请选择二级分类');
          $('.img_box').html('');
          imgs = [];
        }
      }
    })
  })
})