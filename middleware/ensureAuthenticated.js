

module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // Redirect or respond as needed for unauthenticated users
    res.redirect('/login'); // You might want to redirect to a login page
  };
  