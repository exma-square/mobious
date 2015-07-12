'use strict'

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Comment.belongsTo(models.Post);
      }
    }
  });

  return Comment;
};
