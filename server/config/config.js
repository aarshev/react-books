const { PORT, DB_NAME, DB_CONNECTION, MONGODB_URI } = process.env;

module.exports = {
  port: PORT || 3005,
  dbConnection: MONGODB_URI || `${DB_CONNECTION}/${DB_NAME}`,
};
