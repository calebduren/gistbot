module.exports = function (app) {
  var home = function (req, res) {
    res.render('index', {
      env: process.env.ENV
    });
  };

  app.get("/", home);
  app.get("/index", home);
};

