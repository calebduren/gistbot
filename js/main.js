
  function revealEmail() {

    $("#email").html('help@gistbot.com');
    setTimeout(function(){
    $("#email").attr('href', 'mailto:help@gistbot.com');
  },50);
  }
