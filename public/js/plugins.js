var gist = {
  id: function(str) {
    return document.getElementById(str);
  }
};

 setTimeout(function(){
   gist.id('getGist').focus();
 }, 250);

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
  for (var i = 0; i < 12; i++) {
    if (data[1][i]) {
      gist.id('theGist').innerHTML += '<div class="oneGist"><p class="gistTitle">' + data[1][i] + '</p><p class="gistBody">' + data[2][i] + '</p><p class="nofloat"><a class="gistLink" href="http://en.wikipedia.org/wiki/' + data[1][i] + '"' + 'target="_blank">Read More at Wikipedia.org</a></p></div>';
    }
  }
};

gist.isValidURL = (function() {

    var rg_pctEncoded = "%[0-9a-fA-F]{2}";
    var rg_protocol = "(http|https):\\/\\/";

    var rg_userinfo = "([a-zA-Z0-9$\\-_.+!*'(),;:&=]|" + rg_pctEncoded + ")+" + "@";

    var rg_decOctet = "(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])"; // 0-255
    var rg_ipv4address = "(" + rg_decOctet + "(\\." + rg_decOctet + "){3}" + ")";
    var rg_hostname = "([a-zA-Z0-9\\-\\u00C0-\\u017F]+\\.)+([a-zA-Z]{2,})";
    var rg_port = "[0-9]+";

    var rg_hostport = "(" + rg_ipv4address + "|localhost|" + rg_hostname + ")(:" + rg_port + ")?";

    // chars sets
    // safe           = "$" | "-" | "_" | "." | "+"
    // extra          = "!" | "*" | "'" | "(" | ")" | ","
    // hsegment       = *[ alpha | digit | safe | extra | ";" | ":" | "@" | "&" | "=" | escape ]
    var rg_pchar = "a-zA-Z0-9$\\-_.+!*'(),;:@&=";
    var rg_segment = "([" + rg_pchar + "]|" + rg_pctEncoded + ")*";

    var rg_path = rg_segment + "(\\/" + rg_segment + ")*";
    var rg_query = "\\?" + "([" + rg_pchar + "/?]|" + rg_pctEncoded + ")*";
    var rg_fragment = "\\#" + "([" + rg_pchar + "/?]|" + rg_pctEncoded + ")*";

    var rgHttpUrl = new RegExp(
        "^"
        + rg_protocol
        + "(" + rg_userinfo + ")?"
        + rg_hostport
        + "(\\/"
        + "(" + rg_path + ")?"
        + "(" + rg_query + ")?"
        + "(" + rg_fragment + ")?"
        + ")?"
        + "$"
    );

    // export public function
    return function (url) {
        if (rgHttpUrl.test(url)) {
            return true;
        } else {
            return false;
        }
    };
})();

// This is a redirect from a title with a different spelling. Pages that use this link may be updated to link directly to the target page

// may refer to
