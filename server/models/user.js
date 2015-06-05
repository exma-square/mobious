'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    cell: DataTypes.STRING,
    picture: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Task);
      }
    }
  });

  return User;
};
