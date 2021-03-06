// $ Easing plugin below
$.extend($.easing, {
  easeInBack: function(x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  }
});

$('#email').click(function() {
  $("#email").html('&#104;&#105;&#64;&#103;&#105;&#115;&#116;&#98;&#111;&#116;&#46;&#99;&#111;&#109;');

  setTimeout(function() {
    $("#email").attr('href', 'mailto:hi@gistbot.com');
  }, 50);
});

// Debouncing scroll stuff
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
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

var resizeFn = debounce(function() {
  var headerHeight = header.outerHeight();

  row.css('margin-top', headerHeight - 36);
}, 20);

var scrollFn = debounce(function() {
  var headerHeight = header.outerHeight();

  if ($(this).scrollTop() >= headerHeight - 40) {
    header.addClass('fixed').removeClass('absolute');
    header.css('top', -headerHeight + 40);
  } else {
    header.removeClass('fixed').addClass('absolute');
    header.css('top', '0');
  }

}, 10);

window.addEventListener('scroll', scrollFn);
window.addEventListener('resize', resizeFn);
document.addEventListener('DOMContentLoaded', function() {
    resizeFn();
}, false);


// Clicking welcome text and footer removes them
var close = $('#close');
var footer = $('#footer');
close.click(function() {
  footer.slideUp(250, 'easeInBack');
});
