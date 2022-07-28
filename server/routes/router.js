const bookRouter = require('./book.js');
const authRouter = require('./auth.js');

module.exports = (app) => {
  app.use('/api/books', bookRouter);
  app.use('/api', authRouter);
};
