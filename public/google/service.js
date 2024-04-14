// // // require("dotenv").config();
// // const { google } = require("googleapis");
// // const { JWT } = require("google-auth-library");
// // const fs = require("fs");

// import { google } from "googleapis";
// import { JWT } from "google-auth-library";

// const SCOPES = ["https://www.googleapis.com/auth/drive"];

// // Create a JWT client
// const auth = new JWT({
//   email: "sridhar@tournament-381812.iam.gserviceaccount.com",
//   key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDLv3CUB9fW79Pr\n5mRVy68G0pSaPKwPk1WLFe21jIZ8dQHUpmpBkEo44lwh6raISKZCdoSqwqbDXn+Y\n/fm+VgcevkwPTNUtbdHwfhWGA/VfJ7BSMLVks8nA9sX/ZzsdMYmBU0+l1Q+KwB7+\nJyw9lmvbjrSPAw4gTVN4E2lw0yy3gU39MaZFaBVJxKkOoPpP/icM3uUwlHW8V4Yw\nqaHb49CIt12PO6nfGKLbgyHj0iR2UsVgCOzv7JhQAIAbQgNtu1ZXAgtiTGOvqvtA\n6YB1Hg2qgJua/tWH07+xy9yXJjZmie7kDUiPl4aHAUUzCVAjCz5rPYIcXQ9evtUU\nNDPkwstbAgMBAAECggEAJjtOeyB7olPPTsklE6pMNfoGs2hmGugZGaesOrBbPfhQ\ntx/g+VuDaegjxKN/y9PiCr+lhktPMoLFa6ZgmhQXcu/fYtGWgNdGGRv3mvWcMdZH\nMiz8pKBN390Oay3qPECi3jcNT39K0szZI/Siyw2yQHknLVyz5mDMJFB0LR0bG3Wc\nexNKhKotDbLwMYkWAk3l0mi7+B/DINVEwfncqmgauTTnfy99lF1QDfSnMb6jEVT6\nRAeFqu/+as1Vz5dsfzCybWi2Ei8uc4hZJp5FidxLBlPW5FT5z8zPTstXI3xtIk1g\n8HBXBdfLSXxv86kJ49itxXrb8OdM87+7tBrcKzt+JQKBgQD3RoAMU2MLq8ZOnCJ8\nYWqs1NnqA+Fuibx38/KTvhrL9UVycbstXpI+S9nmeXJz86nCDEkGqUSFsxzK8cMH\nSwN1uR6uTjjpZxgCgPmA4hmj0lU+gXphbJnqSCLLVMQXI/KLOfe5JqUkg024QFlx\nA2PvTc1tK/RU5Btba8nYnD3dFQKBgQDS78eFG7Zqrh3fcvo9M/joI0tzNbKt68RK\n7LuUdxiReJE5KuiRJ+CDKCybR/IR345ivilNsmc4OTNsyDZSC8YNLys0TLRBvUpG\nKMuomNwnwfB86k6Ar0Pi2Rzisdu2jhhg2PLL1AOAmXy1d3r5UxTDfY8HPGMRs8ct\ngwQWEGSCrwKBgQCT0UAwnhSCYJAuY+W1puKHKMKPwvwbARl6N4lWSnloXVnDfTtg\ndr1DokJDJWyG5i0fxApPghZlOlpG81kb3frWf/BYUIhy9l8C+Ciuo/qh1NWChRIs\ndShZRgAOvsBt+N4/3ko5E2H7PsbSEx2kkltGLaNU1Ma9jJLSBtBlvZi5tQKBgAK+\nA0YDujdg1BqXkBFDn7TE4LI6vHvuWLrwoO+pLLSXcKvhluxsLEsINqw+HzOESIGY\nH0lXTGg6tiRv5eTjKkv5lQI1DRLdtx16Yktq0VHi/5FgKm0Z2jQUxn9b+JNC/aYk\nq+NiejktxaVGTF75aYexFi7t5gvQ3oIE9gSjaesZAoGBAMWuySD0D3qPzvxDkMyt\nldg8WkKY12GEUGT/Z5/GRNf1Z2XArWM7rc1UexHPPEVneFOYCXsG2nATTKgmAXCI\nr1r79tVfOyb+4iSNOweSyz9OoExzSCnrQ4GWYV0RdzjrOmnSJN5THu1x7byc9WtO\n5nlEmK7gD47kuniK2EBEGNji\n-----END PRIVATE KEY-----\n",
//   scopes: SCOPES,
//   //   access_type: "offline",
// });
// const drive = google.drive({ version: "v3", auth });

// // Upload a file to Google Drive
// async function uploadFile(name, type, file) {
//   const fileMetadata = {
//     name: name,
//   };
//   const media = {
//     mimeType: `image/${type}`,
//     // body: fs.createReadStream(path),
//     body: file,
//   };
//   const res = await drive.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: "id",
//   });
//   const result = await generatePublicUrl(res.data.id);
//   console.log("Result:", result);
//   return res.data.id;
// }

// async function generatePublicUrl(file_id) {
//   try {
//     await drive.permissions.create({
//       fileId: file_id,
//       requestBody: {
//         role: "reader",
//         type: "anyone",
//       },
//     });

//     const result = await drive.files.get({
//       fileId: file_id,
//       fields: "webViewLink",
//     });
//     return result.data.webViewLink;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// module.exports = { uploadFile };

const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "983373617473-u6k99v9et56ckfr96suqjcidev4m6dr0.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const authClient = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate a URL for the user to authorize the application
const authorizeUrl = authClient.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

// Once the user has authorized the application, exchange the authorization code for a token
const getToken = async (code) => {
  const { tokens } = await authClient.getToken(code);
  console.log(tokens);
  // Save the tokens to a database or a file for future use

  return tokens;
};

// Use a refresh token to obtain a new access token
const getAccessToken = async (refreshToken) => {
  authClient.setCredentials({ refresh_token: refreshToken });

  const { access_token } = await authClient.getAccessToken();
  console.log(access_token);
  // Use the access token to make API requests to Google Drive

  return access_token;
};

getToken(
  "4/0AVHEtk6jbdtiRBFNd2bbVKezJqk13iHPNSM-4C_l7EBDnuMFgaiHvt-K8RtPP32QhTJg6A"
);
