module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
          Tag.belongsTo(models.Post);
      }
    }
  });

  return Tag;
};
