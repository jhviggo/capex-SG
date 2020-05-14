const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

const Project = require('../models/project').Project;
const Developer = require('../models/developer').Developer;

//  Google Firebase database setup
//  Initializing app 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capex-sg.firebaseio.com"
});

//Database reference
const db = admin.firestore();

function createDeveloper(name, status, rank) {
  return db.collection('Developers').add({
    name: name,
    status: status,
    rank: rank
  })
  .then((docRef) => {
    return new Developer(docRef.id, name, status, rank);  
  });
}

function createProject(name, startDate, endDate, estimatedHours) {
  return db.collection('Projects').add({
    name: name,
    startDate: startDate,
    endDate: endDate,
    estimatedHours: estimatedHours
  })
  .then((docRef) => {
    return new Project(docRef.id, name, startDate, endDate, estimatedHours);
  });
}

function addDeveloperToProject(project, developer) {
  db.collection('DevelopersInProject')
  .doc()
  .set({
    projectDocId: project.docId,
    developerDocId: developer.docId
  });

  project.addDeveloper(developer);
}

//TODO deleteDeveloperFromProject

async function getAllProjects() {
  let projectSnapshot = await db.collection('Projects').get();
  let projectArray = [];

  for (project of projectSnapshot._docs()) {
    let projectData = project.data();
    let projectObj = new Project(project.id, projectData.name, new Date(projectData.startDate.toDate()), new Date(projectData.endDate.toDate()), projectData.estimatedHours);
    projectArray.push(projectObj);
    
    let developerInProjectSnapshot = await db.collection('DevelopersInProject').where('projectDocId', '==', projectObj.docId).get();

    for (developerInProject of developerInProjectSnapshot._docs()) {
      let developerInProjectData = developerInProject.data();

      projectObj.addDeveloper(new Developer(developerInProject.id, developerInProjectData.name, developerInProjectData.status, developerInProjectData.rank));
    }
  }

  return projectArray;
}

async function getProject(projectDocId) {
  let dbProject = await db.collection('Projects').doc(projectDocId).get();
  let objProject = undefined;

  if (dbProject.exists) {
    let projectData = dbProject.data();
    objProject = new Project(projectDocId, projectData.name, new Date(projectData.startDate.toDate()), new Date(projectData.endDate.toDate()), projectData.estimatedHours);

    let developersInProject = await db.collection('DevelopersInProject').where('projectDocId', '==', projectDocId).get();

    for (developerInProject of developersInProject._docs()) {
      let developerInProjectData = developerInProject.data();

      let developer = await db.collection('Developers').doc(developerInProjectData.developerDocId).get();
      let developerData = developer.data();

      objProject.addDeveloper(new Developer(developer.id, developerData.name, developerData.status, developerData.rank));
    }
  }
  else {
    throw new Error('Project Does not exsists');
  }

  return objProject;
}

module.exports.getProject = getProject;
module.exports.createDeveloper = createDeveloper; 
module.exports.createProject = createProject;
module.exports.addDeveloperToProject = addDeveloperToProject;
module.exports.getAllProjects = getAllProjects;

