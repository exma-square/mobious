'use strict';

module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Task.belongsTo(models.User);
      }
    }
  });

  return Task;
};
