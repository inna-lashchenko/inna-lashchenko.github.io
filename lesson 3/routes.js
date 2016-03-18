module.exports = {
  get: {
    '/users': require('./controllers/usersController').showUsers
  },
  post: {
    '/': require('./controllers/usersController').addUser
  }
};