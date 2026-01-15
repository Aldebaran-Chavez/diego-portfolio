$(document).ready(function () {
  $('.item-link').click(function () {
    $('.item-link').removeClass('active');
    $(this).addClass('active');
  });

  $('.switch-mode').click(function () {
    $('body').toggleClass('dark');
  });
});
