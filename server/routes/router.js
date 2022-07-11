const bookRouter = require('./book.js');

module.exports = (app) => {
  app.use('/api/books', bookRouter);
};
