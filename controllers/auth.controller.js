const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const verifyToken = require('../middleware/verifyToken');

module.exports = app => {
  app.post('/auth', function(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      },
      function(err, user) {
        if (err)
          return res
            .status(500)
            .send('There was a problem registering the user.');
        // create a token
        const token = jwt.sign({ id: user._id }, config.jwtPrivateKey, {
          expiresIn: 3600 // expires in 1 hour
        });
        res.status(200).send({ auth: true, token: token });
      }
    );
  });

  app.post('/login', function(req, res) {
    User.findOne(
      {
        email: req.body.email
      },
      function(err, user) {
        if (err) return status(500).send('Error on the server');
        if (!user) return status(404).send('No user found.');
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid)
          return status(401).send({
            auth: false,
            token: null
          });
        const token = jwt.sign({ id: user._id }, config.jwtPrivateKey, {
          expiresIn: 3600 // Expire in 1 hour
        });
        res.status(200).send({ auth: true, token: token });
      }
    );
  });

  app.get('/user', verifyToken, function(req, res, next) {
    User.findById(req.userId, function(err, user) {
      if (err) return status(500).send('There was a problem finding the user.');
      if (!user) return status(404).send('No user found.');
      res.status(200).send(user);
    });
  });
};
