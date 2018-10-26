$(function(){
  var currentPage = 1;
  var pageSize = 5;
  
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        $('tbody').html(template('template',info));
  
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:currentPage,//当前页
          totalPages:Math.ceil(info.total/pageSize),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })
  }

  var id,isDelete;
  $('tbody').on('click', '.btn',function(){
    $('#userModal').modal('show');
     id = $(this).parent().data('id');
     isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  })
  $('.btn-user').on('click',function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(info){
        if(info.success){
          $("#userModal").modal("hide");
          render();
        }
      }
    })
  })
});