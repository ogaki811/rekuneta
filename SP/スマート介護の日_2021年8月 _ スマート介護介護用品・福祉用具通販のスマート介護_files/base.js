$(document).ready(function() {
  // if !localStorage.getItem 'notified'

  // $('body').css('overflow', 'hidden');
  // localStorage.setItem('notified', true);
  // $('body').append('<div class="smart-notify"></div>');
  // $('header.smart-header').clone().appendTo('.smart-notify');
  // $('.smart-notify').append(`<div class="smart-notify-popup">スマホのカメラで撮影したバーコードから<br>商品を検索することができます</div>`);
  // setTimeout(function() {
  //   return $('.smart-notify').click(function() {
  //     $(this).fadeOut();
  //     return $('body').removeAttr('style');
  //   });
  // }, 1000);

  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 100) {
      return $('body').addClass('asided');
    } else {
      return $('body').removeClass('asided');
    }
  });
  $('.smart-header-gnav-burger, .smart-aside-burger').click(function() {
    $('body').toggleClass('menu');
    if ($('body').hasClass('menu')) {
      return $('.smart-header-gnav-burger div, .smart-aside-burger div').text('閉じる');
    } else {
      return $('.smart-header-gnav-burger div, .smart-aside-burger div').text('メニュー');
    }
  });
  $('.smart-menu-container ul li span').click(function() {
    var li;
    li = $(this).parent();
    li.toggleClass('on');
    if (li.hasClass('on')) {
      return li.next().slideDown({
        duration: 600,
        easing: 'easeOutQuad'
      });
    } else {
      return li.next().slideUp({
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  });
  return $('.smart-pagetop').click(function() {
    return $('html,body').animate({
      scrollTop: 0
    }, 1000, 'easeOutQuart');
  });
});
