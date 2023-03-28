const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const CLIENT_ID =
  "983373617473-u6k99v9et56ckfr96suqjcidev4m6dr0.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04hEvgrEqDaC-CgYIARAAGAQSNwF-L9IrOqgblbHioKftyM86zNulUHnKjpr0HFJ5m8RvpgJ--e86mhLGFvWH65kyXEv0_l7EbKI";

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

/* 
  filepath which needs to be uploaded
  Note: Assumes example.jpg file is in root directory, 
  though this can be any filePath
  */
const filePath =
  "C:\\Users\\Sridhar\\Downloads\\tournament-app-main\\tournament-app-main\\public\\bgimage.jpg";

async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "example.jpg", //This can be name of your choice
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

uploadFile();

async function deleteFile() {
  try {
    const response = await drive.files.delete({
      fileId: "YOUR FILE ID",
    });
    console.log(response.data, response.status);
  } catch (error) {
    console.log(error.message);
  }
}

// deleteFile();

async function generatePublicUrl() {
  try {
    const fileId = "1AME0oEqeU1sUoIEGugdf_vwkcsKdu8w3";
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    /* 
      webViewLink: View the file in browser
      webContentLink: Direct download link 
      */
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}

// generatePublicUrl();
