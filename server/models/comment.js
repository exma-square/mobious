'use strict'

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    author: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
      }
    }
  });

  return Comment;
};
