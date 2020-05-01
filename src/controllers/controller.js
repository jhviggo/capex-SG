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