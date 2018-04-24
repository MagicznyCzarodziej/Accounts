const User = require('./User.js');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('API running');
  });
  app.post('/register', (req, res) => {
    User.register(req, res);
  });
  app.get('/secret', User.authorize, (req, res) => {
    res.send({ data: 'secret data' });
  });
};
