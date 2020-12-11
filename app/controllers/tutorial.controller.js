const db = require("../models");
const Tutorial = db.tutorials;
const Comment = db.comments;
const School = db.schools;
const Subject = db.subjects;
const School_Subject = db.school_subjects;

/////////////////One to Many Relation///////////////////////

// Create and Save new Tutorials
exports.createTutorial = (tutorial) => {
  return Tutorial.create({
    title: tutorial.title,
    description: tutorial.description,
  })
    .then((tutorial) => {
      console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while creating tutorial: ", err);
    });
};

// Create and Save new Comments
exports.createComment = (tutorialId, comment) => {
  return Comment.create({
    name: comment.name,
    text: comment.text,
    tutorialId: tutorialId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};

// Get the comments for a given tutorial
exports.findTutorialById = (tutorialId) => {
  return Tutorial.findByPk(tutorialId, { include: ["comments"] })
    .then((tutorial) => {
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};

// Get the comments for a given comment id
exports.findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["tutorial"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};

// Get all Tutorials include comments
exports.findAll = () => {
  return Tutorial.findAll({
    include: ["comments"],
  }).then((tutorials) => {
    return tutorials;
  });
};

///////////////////Many To Many Relation////////////////////////////


exports.createSchool = (school) => {
  return School.create({
    name: school.name
  })
    .then((school) => {
      console.log(">> Created school: " + JSON.stringify(school, null, 4));
      return school;
    })
    .catch((err) => {
      console.log(">> Error while creating school: ", err);
    });
};

exports.createSubject = (subject) => {
  return Subject.create({
    name: subject.name
  })
    .then((subject) => {
      console.log(">> Created school: " + JSON.stringify(subject, null, 4));
      return subject;
    })
    .catch((err) => {
      console.log(">> Error while creating subject: ", err);
    });
};

exports.createRelation = (relation) => {
  return School_Subject.create({
    schoolId: relation.schoolId,
    subjectId: relation.subjectId
  })
    .then((relation) => {
      console.log(">> Created school: " + JSON.stringify(relation, null, 4));
      return relation;
    })
    .catch((err) => {
      console.log(">> Error while creating relation: ", err);
    });
};

exports.findSchoolById = (schoolId) => {
  return School.findByPk(schoolId, { include: ["relations"] })
    .then(async (relations) => {

      var index = 0;
      var subjects = [];

      for( index = 0 ; index < relations["relations"].length ; index ++) {

        await Subject.findByPk(relations["relations"][index]["subjectId"])
        .then((subject) => {
          subjects.push({id: subject.id, name: subject.name});
        })
        .catch((err) => {
          console.log(">> Error while retrieving subject: ", err);
        });;

      }

      return subjects;

    })
    .catch((err) => {
      console.log(">> Error while finding school: ", err);
    });
};


