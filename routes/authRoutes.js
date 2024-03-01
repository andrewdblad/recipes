const passport = require('passport');

module.exports = (app) => {
  app.get('/login', (req, res) => {
    res.render('login'); // Render your login view
  });

  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // Redirect or respond as needed after successful authentication
    res.redirect('/');
  });

  app.get('/logout', (req, res) => {
    req.logout();
    // Redirect or respond as needed after logout
    res.redirect('/');
  });
};
