$('section.awSlider .carousel').carousel({
  pause: '',
  interval: 5000
});

var startImage = $('section.awSlider .item.active > img').attr('src');
$('section.awSlider .carousel').on('slid.bs.carousel', function() {
  var bscn = $(this).find('.item.active > img').attr('src');
  $('section.awSlider > img').attr('src', bscn);
});
