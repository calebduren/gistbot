function revealEmail() {
  $("#email").html('hi@gistbot.com');
  setTimeout(function () {
    $("#email").attr('href', 'mailto:&#104;&#105;&#64;&#103;&#105;&#115;&#116;&#98;&#111;&#116;&#46;&#99;&#111;&#109;');
  }, 50);
}

if ($(window).width() < 768) {
  $("#getGist").attr('placeholder', 'i.e. Nitrogen or goo.gl/zWz1jU');
}
