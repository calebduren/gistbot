
function revealEmail() {
  $("#email").html('&#104;&#105;&#64;&#103;&#105;&#115;&#116;&#98;&#111;&#116;&#46;&#99;&#111;&#109;');
  setTimeout(function () {
    $("#email").attr('href', 'mailto:hi@gistbot.com');
  }, 50);
}


$(window).on("load resize scroll",function(e){
  var scrollDist = $(window).scrollTop(),
      brandBar = $('#brandBar').height(),
      lightHeight = $('#header').height() - brandBar - 30,
      darkHeight = $('#header').height() + brandBar - 30,
      logoLight = $('#logo-light'),
      logoDark = $('#logo-dark');

  if ( scrollDist > lightHeight ) {
    logoLight.addClass('top');
  } else {
    logoLight.removeClass('top');
  }

  if ( scrollDist > darkHeight ) {
    logoDark.removeClass('left');
  } else {
    logoDark.addClass('left');
  }

});
