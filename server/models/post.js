'use strict';

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Post.belongsTo(models.User),
        Post.hasMany(models.Tag,{joinTableModel:models.Tag});
      }
    }
  });

  return Post;
};
