'use strict';

module.exports = (sequelize, DataTypes) => {
  var Passport = sequelize.define('Passport', {
    protocol: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    accessToken: DataTypes.STRING,
    provider: DataTypes.STRING,
    identifier: DataTypes.STRING,
    tokens: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Passport.belongsTo(models.User);
      }
    }
  });

  return Passport;
};
