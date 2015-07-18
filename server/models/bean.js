'use strict';

module.exports = (sequelize, DataTypes) => {
  var Bean = sequelize.define('Bean', {
    name: DataTypes.STRING,
    place: DataTypes.STRING,
    breed: DataTypes.STRING,
    manor: DataTypes.STRING,
    method: DataTypes.STRING,
    roastDate: DataTypes.STRING,
    roastType: DataTypes.STRING,
    flavour: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT,
    coverUrl: DataTypes.STRING,
    thumbCoverUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Bean.hasOne(models.User);
      }
    }
  });

  return Bean;
};
