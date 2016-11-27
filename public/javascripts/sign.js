$(function($) {
  $('.signup').click(function click(e) {
    var $item = $(e.currentTarget);
    var $pop = $item.closest("body");
    $pop.find("#pause").removeClass('off');
    $pop.find("#pause").addClass('on');

    $pop.find("#form-signin").removeClass('on');
    $pop.find("#form-signin").addClass('off');
    $pop.find("#form-signup").removeClass('off');
    $pop.find("#form-signup").addClass('on');
  })
});

$(function($) {
  $('.signin').click(function click(e) {
    var $item = $(e.currentTarget);
    var $pop = $item.closest("body");
    $pop.find("#pause").removeClass('off');
    $pop.find("#pause").addClass('on');

    $pop.find("#form-signup").removeClass('on');
    $pop.find("#form-signup").addClass('off');
    $pop.find("#form-signin").removeClass('off');
    $pop.find("#form-signin").addClass('on');
  })
});

$(function($) {
  $('.signback').click(function click(e) {
    var $item = $(e.currentTarget);
    var $pop = $item.closest("body");
    $pop.find("#pause").removeClass('on');
    $pop.find("#pause").addClass('off');

    $pop.find("#form-signup").removeClass('on');
    $pop.find("#form-signup").addClass('off');
    $pop.find("#form-signin").removeClass('on');
    $pop.find("#form-signin").addClass('off');
  })
});
