'use strict';

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Post.belongsTo(models.User, {as: 'Creater'} ),
        Post.belongsTo(models.User, {as: 'Editor'} ),
        Post.hasMany(models.Tag);
      }
    }
  });

  return Post;
};
