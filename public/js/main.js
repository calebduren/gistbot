function revealEmail() {
    $("#email").html('hi@gistbot.com');
    setTimeout(function(){
    $("#email").attr('href', 'mailto:hi@gistbot.com');
  },50);
}

if ( $(window).width() < 768 ) {
  $("#getGist").attr('placeholder', 'i.e. Nitrogen or goo.gl/zWz1jU');
}
