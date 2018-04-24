const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config.js');
const UserModel = require('./models/User.js');

async function calculateHash(password) {
  const salt = await bcrypt.genSalt(config.encryption.saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

function jwtSign(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const { login, password } = req.body;
      const user = new UserModel();
      user.login = login;
      user.passwordHash = await calculateHash(password);
      await user.save();
      const userJson = user.toJSON();
      const token = jwtSign(userJson);
      res.send({ token });
    } catch (err) {
      res.status(400).send({
        error: 'User already exists',
      });
    }
  },
  async authorize(req, res, next) {
    try {
      const token = req.headers.authorization;
      const data = await jwt.verify(token, config.authentication.jwtSecret);
      console.log(data);
      next();
    } catch (error) {
      res.status(403).send({ error: 'Forbidden' });
    }
  },
};
