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
    } catch (error) {
      console.log(error);
      res.status(409).send({
        error: 'User already exists',
      });
    }
  },
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await UserModel.findOne({ login }).exec();
      if (!user) return res.status(401).send({ error: 'Incorrect login or password' });

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) return res.status(401).send({ error: 'Incorrect login or password' });

      const userJson = user.toJSON();
      const token = jwtSign(userJson);
      res.send({ token });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        error: 'An error has occured trying to log in',
      });
    }
  },
  async authorize(req, res, next) {
    try {
      const token = req.headers.authorization;
      await jwt.verify(token, config.authentication.jwtSecret);
      next();
    } catch (error) {
      res.status(403).send({ error: 'Forbidden' });
    }
  },
};
