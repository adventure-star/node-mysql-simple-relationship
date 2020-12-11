const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.schools = require("./school.model.js")(sequelize, Sequelize);
db.subjects = require("./subject.model.js")(sequelize, Sequelize);
db.school_subjects = require("./school_subject.model.js")(sequelize, Sequelize);

//One To Many Relationship

db.tutorials.hasMany(db.comments, { as: "comments" });
db.comments.belongsTo(db.tutorials, {
  foreignKey: "tutorialId",
  as: "tutorial",
});

//Many To Many Relationship

db.schools.hasMany(db.school_subjects, { as: "relations" });
db.subjects.hasMany(db.school_subjects, { as: "relation" });

module.exports = db;
