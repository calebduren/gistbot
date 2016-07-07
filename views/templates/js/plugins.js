// function to detect mobile browsers, will be used in the focus function directly below it
(function(a) {
  ($.browser = $.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

if ($('.input').length) {
  // Focus the gist input if not a mobile device

  if ($.browser.mobile !== true) {
    setTimeout(function() {
      gist.id('get').focus();
    }, 800);
  }

  var gist = {
    id: function(str) {
      return document.getElementById(str);
    }
  };

  var getGist = function(e) {
    var term = gist.id('get').value;
    var queryUrl, jqXhr;
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if (regexp.test(term)) {

      // Add a class to gist to indicate loading
      $('#loading').removeClass('not').addClass('loading');

      //It is a URL, hit gistbot-flask
      queryUrl = 'https://gistbot-flask.herokuapp.com/api/website?url=' + term;
      jqXhr = $.ajax({
        url: queryUrl,
        dataType: 'jsonp' //needed for cross-domain requests (ie gistbot.com calling wikipedia.com)
      });
      jqXhr.done(function(data) {
        window.gistUrlComplete(data);
      });
      jqXhr.fail(function() {
        console.error("Unable to reach wikipedia")
      });
      jqXhr.always(function() {
        console.log("Fetched gist from Wikipedia for term:", term);
      });
    } else {
      //It is not a URL, hit wikipedia
      queryUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=gistComplete&search=' + term;
      jqXhr = $.ajax({
        url: queryUrl,
        dataType: 'jsonp' //needed for cross-domain requests (ie gistbot.com calling wikipedia.com)
      });
      jqXhr.done(function(data) {
        window.gistComplete(data);
      });
      jqXhr.fail(function() {
        console.error("Unable to reach wikipedia")
      });
      jqXhr.always(function() {
        console.log("Fetched gist from Wikipedia for term:", term);
      });
    }
  };

  gist.id('get').onkeyup = function(e) {
    if (!e.keyCode.toString().match(/^(37|38|39|40|13|16|17|18|224)$/)) {
      getGist(e);
    }
  };

  var gistUrlComplete = function(data) {

    var summaries = data.summaries || [];
    var url = data.url || "";
    var hostname = new URL(url).hostname.replace('www.', '');

    var inner = '';
    for (i = 0; i < summaries.length; i++) {
      inner += '<li>' + summaries[i] + '</li>';
    }

    gist.id('gist').innerHTML = '';
    gist.id('gist').innerHTML += '<div class="a-gist">' +
      '<p class="gist-title">From ' + hostname + '</p>' +
      '<ul class="gist-body">' +
      inner +
      '</ul>' +
      '<p class="right">' +
      '<a class="gist-link" href="' + url + '"' + 'target="_blank">View the full article at ' + hostname + '</a>' +
      '</p>' +
      '</div>';

    // Remove loading class
    $('#loading').fadeOut(100).removeClass('loading').addClass('not');

    if (summaries <= 0) {
      gist.id('gist').innerHTML = '';
      gist.id('gist').innerHTML += '<div class="a-gist">' +
        '<p class="gist-title">😬 Oh, no!</p>' +
        '<p class="gist-body">We can&rsquo;t seem to create a gist from the ' + hostname + ' link that you provided</p>' +
        '<p class="gist-body">Double check the URL and make sure it starts with http, https, or www.</p>' +
        '</div>';
    }
  };

  var gistComplete = function(data) {
    gist.id('gist').innerHTML = '';
    var string = 'may refer to:';
    var redirect = 'is a redirect from a title';
    for (var i = 0; i < 20; i++) {
      if (data[1][i] && data[2][i] && data[2][i].indexOf(string) == -1 && data[2][i].indexOf(redirect) == -1) {
        gist.id('gist').innerHTML += '<div class="a-gist">' +
          '<p class="gist-title">' + data[1][i] + '</p>' +
          '<p class="gist-body">' + data[2][i] + '</p>' +
          '<p class="right">' +
          '<a class="gist-link" href="https://en.wikipedia.org/wiki/' + data[1][i] + '"' + 'target="_blank">Read more at wikipedia.org</a>' +
          '</p>' +
          '</div>';
      }
    }

    if ( !data[1].length ) {
      gist.id('gist').innerHTML = '';
      gist.id('gist').innerHTML += '<div class="a-gist">' +
        '<p class="gist-title">😬 Oh, no!</p>' +
        '<p class="gist-body">We can&rsquo;t seem to create a gist for that.</p>' +
        '</div>';    }
  };
}
