$(document).ready( function() {

  // $ Easing plugin below
  $.extend($.easing, {
    easeInBack: function(x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }
  });

  // Put the email address in footer when "contact us" is clicked
  function revealEmail() {
    $("#email").html('&#104;&#105;&#64;&#103;&#105;&#115;&#116;&#98;&#111;&#116;&#46;&#99;&#111;&#109;');

    setTimeout(function() {
      $("#email").attr('href', 'mailto:hi@gistbot.com');
    }, 50);
  }

  // Debouncing scroll stuff
  function debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };

  var header = $('#header');
  var row = $('.row');
  var headerHeight = header.outerHeight();

  row.css('margin-top', headerHeight + 45);

  var scrollFn = debounce(function() {
    $(window).scroll(function() {
      if ($(this).scrollTop() >= headerHeight - 56) {
        header.addClass('fixed').removeClass('absolute');
        header.css('top', - headerHeight + 56 );
      } else {
        header.removeClass('fixed').addClass('absolute');
        header.css('top', '0' );
      }
    });
  }, 5);

  window.addEventListener('scroll', scrollFn);
});

// Clicking welcome text and footer removes them
$(window).load( function() {
  var close = $('#close');
  var footer = $('#footer');
  close.click(function() {
    footer.slideUp(250, 'easeInBack');
  });
});
