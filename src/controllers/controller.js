const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

//  Google Firebase database setup
//  Initializing app 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capex-sg.firebaseio.com"
});

//Database reference
const db = admin.firestore();


function createDeveloper(name, status, rank) {
  return db.collection('developers').doc().set({
    name: name,
    status: status,
    rank: rank
  });
}

function createProject(name, startDate, endDate, estimatedHours) {
  return db.collection('Projects').doc().set({
    name: name,
    startDate: startDate,
    endDate: endDate,
    estimatedHours: estimatedHours
  });
}

module.exports.createDeveloper = createDeveloper; 
module.exports.createProject = createProject;
