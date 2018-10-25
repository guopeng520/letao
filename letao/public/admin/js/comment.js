$(function(){
  $(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    NProgress.done();
  })


  $('.cate').prev().on('click',function(){
    $('.cate').slideToggle();
  });

  $('.icon_menu').on('click',function(){
    $('.body').toggleClass('active');
    $('.lt_aside').toggleClass('active');
  })

  $('.icon_logout').on('click',function(){
    $('#logoutModal').modal('show');
  })
  $('.btn-logout').on('click',function(){
    console.log(111);
    
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      success:function(info){
        if(info.success){
          location.href ='login.html'
        }
      }
    })
  })
})
