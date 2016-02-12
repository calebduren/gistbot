module.exports = function (app) {
  var home = function (req, res) {
    res.render('index', {
      livereload: app.get('port') == 3000
    });
  };

  app.get("/", home);
  app.get("/index", home);
  app.get("/privacy-policy", function (req, res) {
    res.render('privacy-policy', {
      livereload: app.get('port') == 3000
    });
  });
};
