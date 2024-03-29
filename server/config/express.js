const cors = require('cors');
const whitelist = ['http://localhost:3000', 'https://react-library-su-aarshev.herokuapp.com/'];
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'AArshev';

module.exports = (app, express) => {
  app.use(express.static('public'));
  app.use(cors({ origin: whitelist, credentials: true }));
  app.use(express.json());
  app.use(cookieParser(cookieSecret));
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500).json({ message: error.message || 'An unknown error occurred!' });
  });
};
