const fs = require('fs');
const { google } = require('googleapis');
const credentials = require('../credentials.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];
const stream = require('stream');

class GoogleDriveServices {
    // A Function that can provide access to the Google Drive API
    static async authorize() {
        const jwtClient = new google.auth.JWT(
            credentials.client_email,
            null,
            credentials.private_key,
            SCOPE
        );
        await jwtClient.authorize();
        return jwtClient;
    }

    // A Function that will upload the desired file to the Google Drive folder
    static async uploadFile(authClient, fileName, fileContent) {
        return new Promise((resolve, reject) => {
            const drive = google.drive({ version: 'v3', auth: authClient });

            const fileMetaData = {
                name: fileName,
                parents: ['1pX0UvmswHB_61XkgSa08BTbzvVe07PCC'] // A folder ID to which the file will get uploaded
            };

            const media = {
                mimeType: 'image/*', // Use the image/* wildcard to accept all image MIME types
                body: stream.PassThrough().end(fileContent)
            };            

            drive.files.create(
                {
                    resource: fileMetaData,
                    media: media,
                    fields: 'id'
                },
                (error, file) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(file);
                    }
                }
            );
        });
    }
}

module.exports = GoogleDriveServices;
