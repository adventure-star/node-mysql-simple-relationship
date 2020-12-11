const db = require("./app/models");
const controller = require("./app/controllers/tutorial.controller");

const run = async () => {

  //////////////////////////One To Many Relation////////////////////

  // const tut1 = await controller.createTutorial({
  //   title: "Tut#1",
  //   description: "Tut#1 Description",
  // });

  // const tut2 = await controller.createTutorial({
  //   title: "Tut#2",
  //   description: "Tut#2 Description",
  // });

  // const comment1 = await controller.createComment(tut1.id, {
  //   name: "bezkoder",
  //   text: "Good job!",
  // });

  // await controller.createComment(tut1.id, {
  //   name: "zkoder",
  //   text: "One of the best tuts!",
  // });

  // const comment2 = await controller.createComment(tut2.id, {
  //   name: "aKoder",
  //   text: "Hi, thank you!",
  // });

  // await controller.createComment(tut2.id, {
  //   name: "anotherKoder",
  //   text: "Awesome tut!",
  // });

  // const tut1Data = await controller.findTutorialById(tut1.id);
  // console.log(
  //   ">> Tutorial id=" + tut1Data.id,
  //   JSON.stringify(tut1Data, null, 2)
  // );

  // const tut2Data = await controller.findTutorialById(tut2.id);
  // console.log(
  //   ">> Tutorial id=" + tut2Data.id,
  //   JSON.stringify(tut2Data, null, 2)
  // );

  // const comment1Data = await controller.findCommentById(comment1.id);
  // console.log(
  //   ">> Comment id=" + comment1.id,
  //   JSON.stringify(comment1Data, null, 2)
  // );

  // const comment2Data = await controller.findCommentById(comment2.id);
  // console.log(
  //   ">> Comment id=" + comment2.id,
  //   JSON.stringify(comment2Data, null, 2)
  // );

  // const tutorials = await controller.findAll();
  // console.log(">> All tutorials", JSON.stringify(tutorials, null, 2));

  //////////////////////Many To Many Relation////////////////////////

  const school1 = await controller.createSchool({
    name: "school1"
  });
  const school2 = await controller.createSchool({
    name: "school2"
  });
  const school3 = await controller.createSchool({
    name: "school3"
  });
  const school4 = await controller.createSchool({
    name: "school4"
  });

  const subject1 = await controller.createSubject({
    name: "subject1"
  });
  const subject2 = await controller.createSubject({
    name: "subject2"
  });
  const subject3 = await controller.createSubject({
    name: "subject3"
  });
  const subject4 = await controller.createSubject({
    name: "subject4"
  });
  const subject5 = await controller.createSubject({
    name: "subject5"
  });
  const subject6 = await controller.createSubject({
    name: "subject6"
  });
  const subject7 = await controller.createSubject({
    name: "subject7"
  });

  await controller.createRelation({
    schoolId: 1,
    subjectId: 1
  });

  await controller.createRelation({
    schoolId: 1,
    subjectId: 3
  });

  await controller.createRelation({
    schoolId: 1,
    subjectId: 5
  });

  await controller.createRelation({
    schoolId: 3,
    subjectId: 2
  });

  await controller.createRelation({
    schoolId: 3,
    subjectId: 4
  });

  await controller.createRelation({
    schoolId: 3,
    subjectId: 6
  });

  const schoolData = await controller.findSchoolById(3);
  // console.log(
  //   ">> School id=" + 1,
  //   JSON.stringify(schoolData, null, 2)
  // );
  console.log(schoolData);


};


// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});
