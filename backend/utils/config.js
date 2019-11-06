require('dotenv').config();

let { DATABASE_URI } = process.env;
if (process.env.NODE_ENV !== 'production') {
  DATABASE_URI = process.env.LOCAL_DB_URI;
}

const { PORT } = process.env;

module.exports = {
  PORT,
  DATABASE_URI,
};
