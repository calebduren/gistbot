var gist = {
  id: function (str) {
    return document.getElementById(str);
  }
};

setTimeout(function () {
  gist.id('getGist').focus();
}, 750);

var getGist = function (e) {
  var term = gist.id('getGist').value;
  var queryUrl, jqXhr;
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (regexp.test(term)) {
    //It is a URL, hit gistbot-flask
    queryUrl = 'http://gistbot-flask.herokuapp.com/api/website?url=' + term;
    jqXhr = $.ajax({
      url: queryUrl,
      dataType: 'jsonp' //needed for cross-domain requests (ie gistbot.com calling wikipedia.com)
    });
    jqXhr.done(function (data) {
      window.gistUrlComplete(data);
    });
    jqXhr.fail(function () {
      console.error("Unable to reach wikipedia")
    });
    jqXhr.always(function () {
      console.log("Fetched gist from Wikipedia for term:", term);
    });
  } else {
    //It is not a URL, hit wikipedia
    queryUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=gistComplete&search=' + term;
    jqXhr = $.ajax({
      url: queryUrl,
      dataType: 'jsonp' //needed for cross-domain requests (ie gistbot.com calling wikipedia.com)
    });
    jqXhr.done(function (data) {
      window.gistComplete(data);
    });
    jqXhr.fail(function () {
      console.error("Unable to reach wikipedia")
    });
    jqXhr.always(function () {
      console.log("Fetched gist from Wikipedia for term:", term);
    });
  }


};

gist.id('getGist').onkeyup = function (e) {
  if (!e.keyCode.toString().match(/^(37|38|39|40|13|16|17|18|224)$/)) {
    getGist(e);
  }
};

$("#gist.gistButton").click(function (e) {
  getGist(e);
});


var gistUrlComplete = function (data) {
  var summaries = data.summaries || [];
  var url = data.url || "";

  gist.id('theGist').innerHTML = '';
  gist.id('theGist').innerHTML += '<div class="oneGist">' +
    '<p class="gistTitle">' + url + '</p>' +
    '<p class="gistBody">' + summaries.join(" ").replace(/["']/g, "") + '</p>' +
    '<p class="nofloat">' +
    '<a class="gistLink" href="' + url + '"' + 'target="_blank">View to the full article at ' + url + '</a>' +
    '</p>' +
    '</div>';
};

var gistComplete = function (data) {
  gist.id('theGist').innerHTML = '';
  for (var i = 0; i < 15; i++) {
    if (data[1][i]) {
      gist.id('theGist').innerHTML += '<div class="oneGist">' +
        '<p class="gistTitle">' + data[1][i] + '</p>' +
        '<p class="gistBody">' + data[2][i] + '</p>' +
        '<p class="nofloat">' +
        '<a class="gistLink" href="http://en.wikipedia.org/wiki/' + data[1][i] + '"' + 'target="_blank">Read More at Wikipedia.org</a>' +
        '</p>' +
        '</div>';
    }
  }
};
