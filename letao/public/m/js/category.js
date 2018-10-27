$(function(){
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      $('.cate_left ul').html(template('tpl',info))
      render(info.rows[0].id);
    }
  });

  $('.cate_left ul').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active');
    var id = $(this).data('id');
    render(id);
  })
  function render(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        console.log(info)
        $('.cate_right  ul').html(template('tpl2',info))
      }
    })
  }
})