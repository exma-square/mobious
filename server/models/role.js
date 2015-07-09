module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    authority: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Role.belongsTo(models.User);
      }
    }
  });

  return Role;
};
