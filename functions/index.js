const {https} = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.handleAuthRedirect = https.onCall(async (data, context) => {
  const {uid} = context.auth;

  // Generate the redirect URL based on the user's UID
  const redirectUrl = `https://notes-app-c5a88.web.app/home?uid=${uid}`;

  // Return the redirect URL to the client
  return {redirectUrl};
});

exports.handleLogout = https.onCall(async () => {
  const redirectUrl = `https://notes-app-c5a88.web.app/`;

  // Return the redirect URL to the client
  return {redirectUrl};
});
