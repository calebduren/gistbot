// jQuery Easing plugin below
jQuery.extend(jQuery.easing, {
  easeInBack: function(x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutCirc: function(x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  }
});
// End jQuery Easing

// Remove the helper text box after first visit

$(document).ready( function() {
  var welcome = $('#welcome'),
      close = $('#close'),
      footer = $('#footer');

if (!localStorage.noFirstVisit) {
    welcome.delay(800).animate({'opacity': '1'}, 600);
  localStorage.noFirstVisit = "1";
  } else {
    welcome.delay(500).slideUp(500, 'easeOutCirc');
  }
});

function revealEmail() {
  $("#email").html('&#104;&#105;&#64;&#103;&#105;&#115;&#116;&#98;&#111;&#116;&#46;&#99;&#111;&#109;');
  setTimeout(function() {
    $("#email").attr('href', 'mailto:hi@gistbot.com');
  }, 50);
}

$(window).on("load resize", function() {

  var welcome = $('#welcome'),
    close = $('#close'),
    footer = $('#footer');

  close.click(function() {
    footer.slideUp(250, 'easeInBack');
  });
  welcome.click(function() {
    welcome.slideUp(250, 'easeInBack');
  });
});

$(window).on("load resize scroll", function(e) {
  if ($(window).width() > 1300) {
    var scrollDist = $(window).scrollTop(),
      brandBar = $('#brandBar').height(),
      lightHeight = $('#header').outerHeight() - brandBar - 30,
      darkHeight = $('#header').outerHeight() + brandBar - 30,
      logoLight = $('#logo-light'),
      logoDark = $('#logo-dark');

    if (scrollDist > lightHeight) {
      logoLight.addClass('top');
      // setTimeout(function() {
      //   logoLight.addClass('left').removeClass('top');
      //   }, 200);
      setTimeout(function() {
        logoLight.remove();
      }, 200);
    }
    // else {
    //   logoLight.removeClass('left');
    // }

    if (scrollDist > darkHeight) {
      logoDark.removeClass('left');
    }
    // else {
    //   logoDark.addClass('left');
    // }
  }
});
