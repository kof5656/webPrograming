$(function($) {
  $('#navbar > ul > li > .signup').click(function click(e) {
    var $item = $(e.currentTarget);
    var $pop = $item.closest("body");
    $pop.find("#pause").removeClass('off');
    $pop.find("#pause").addClass('on');

    $pop.find("#form-signup").removeClass('off');
    $pop.find("#form-signup").addClass('on');
  })
});

$(function($) {
  $('#form-signup .signback').click(function click(e) {
    var $item = $(e.currentTarget);
    var $pop = $item.closest("body");
    $pop.find("#pause").removeClass('on');
    $pop.find("#pause").addClass('off');

    $pop.find("#form-signup").removeClass('on');
    $pop.find("#form-signup").addClass('off');
  })
});
