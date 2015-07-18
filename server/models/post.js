'use strict';

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    tags: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Post.belongsTo(models.User);
      }
    }
  });

  return Post;
};
