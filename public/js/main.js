function revealEmail() {
  $("#email").html('&#104;&#105;&#64;&#103;&#105;&#115;&#116;&#98;&#111;&#116;&#46;&#99;&#111;&#109;');
  setTimeout(function () {
    $("#email").attr('href', 'mailto:hi@gistbot.com');
  }, 50);
}

if ($(window).width() < 768) {
  $("#getGist").attr('placeholder', 'i.e. Nitrogen or goo.gl/zWz1jU');
}

$(window).scroll(function(){
  var scrollDist = $(window).scrollTop(),
      brandBar = $('#brandBar').height(),
      lightHeight = $('#header').height() - brandBar - 20,
      darkHeight = $('#header').height() + brandBar - 20,
      logoLight = $('#logo-light'),
      logoDark = $('#logo-dark');

  if ( scrollDist > lightHeight ) {
    logoLight.stop().css({'display': 'none'});
  } else {
    logoLight.stop().css({'display': 'inline-block'});
  }

  if ( scrollDist > darkHeight ) {
    logoDark.stop().css({'display': 'inline-block'});
  } else {
    logoDark.stop().css({'display': 'none'});
  }

});
