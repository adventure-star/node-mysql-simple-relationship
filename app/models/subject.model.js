module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("subject", {
    name: {
      type: DataTypes.STRING
    }
  });

  return Subject;
};
