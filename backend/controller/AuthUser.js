// authController.js

const User = require('./AuthUser');

module.exports = {
  login: function(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username
    User.findOne({ username })
      .then(user => {
        if (!user || user.password !== password) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        // If login is successful
        res.json({ message: 'Login successful', user: { id: user._id, username: user.username } });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  }
};
