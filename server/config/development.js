export default {
  port: parseInt(process.env.PORT, 10) || 3000,
  'connection': {
    'dialect': 'sqlite',
    'storage': './db.development.sqlite',
    'username': null,
    'password': null,
    'database': null,
    'force': true
  }
};
