const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.saveProfileImg = functions.https.onCall((data, context) => {
  let message = data && data.message;
  let userName = (context && context.auth.token.name) || "No Name";
  functions.logger.info("Hello logs!", { structuredData: true });
  return { message: "Hello from Firebase! " + message + " name - " + userName };
});
