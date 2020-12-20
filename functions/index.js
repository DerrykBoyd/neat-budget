const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const sharp = require("sharp");
const path = require("path");
const os = require("os");
const fs = require("fs");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.saveProfileImg = functions.https.onCall(async (data, context) => {
  if (!context.auth) return { error: "No user" };
  // get the information for the image crop
  const { imageData, cropBoxData, profileImg } = data;
  const { left, top, height, width } = cropBoxData;
  // path to save the temp image for manipulation
  const filePath = path.join(os.tmpdir(), `temp.jpg`);
  // firebase storage bucket ref
  const bucket = admin.storage().bucket();
  // get the image data from dataURI
  const fileBuffer = Buffer.from(profileImg.split(",")[1], "base64");
  // resize to canvas size -> crop -> resize to 400px
  await sharp(fileBuffer)
    .resize(parseInt(imageData.width), parseInt(imageData.height))
    .extract({ left: parseInt(left), top: parseInt(top), width: parseInt(width), height: parseInt(height) })
    .toBuffer()
    .then((data) => {
      // save to temp location
      return sharp(data).resize(200, 200).toFormat("jpeg", {quality: 75}).toFile(filePath);
    });
  // upload temp image to firebase
  const fileUploadRes = await bucket.upload(filePath, {destination: `profileImages/profileImg-${context.auth.uid}.jpg`});
  // Once the thumbnail has been uploaded delete the local file to free up disk space.
  fs.unlinkSync(filePath);
  return fileUploadRes[0];
});
