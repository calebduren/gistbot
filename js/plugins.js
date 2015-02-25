var gist = {
  id: function(str) {
    return document.getElementById(str);
  }
};

setTimeout(function(){
  gist.id('getGist').focus();
}, 1000);

var tag = '';

gist.id('getGist').onkeyup = function(e) {
  if (!e.keyCode.toString().match(/^(37|38|39|40|13|16|17|18|224)$/)) {
    if (tag !== '') {
      document.body.removeChild(tag);
    }

    tag = document.createElement('script');
    var term = gist.id('getGist').value;

    tag.src = 'http://en.wikipedia.org/w/api.php?action=opensearch&limit=10&format=json&callback=gistComplete&search=' + term;

    document.body.appendChild(tag);
  }
};

var gistComplete = function(data) {
  gist.id('theGist').innerHTML = '';
  for (var i = 0; i < 6; i++) {
    if (data[1][i]) {
      gist.id('theGist').innerHTML += '<div class="oneGist"><p class="gistTitle">' + data[1][i] + '</p><p class="gistBody">' + data[2][i] + '</p><p class="nofloat"><a class="gistLink" href="http://en.wikipedia.org/wiki/' + data[1][i] + '"' + 'target="_blank">Read More at Wikipedia.org</a></p></div>';
    }
  }
};
