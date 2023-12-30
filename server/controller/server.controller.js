const ImgGenServices = require('../services/imgGen.services');
const MsgServices = require('../services/msg.services');
const TextGenServices = require('../services/textGen.services');
const MaifriendServices = require('../services/maifriend.services');
const GoogleDriveServices = require('../services/googleDrive.services');
const multer = require('multer');


// Multer configuration
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage }).single('image');


exports.createFriend = async (req, res, next) => {
    try {
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ status: false, error: err.message });
            } else if (err) {
                return res.status(500).json({ status: false, error: 'Internal Server Error' });
            }

            const { name, role } = req.body;

            if (!req.file) {
                return res.status(400).json({ status: false, error: 'Image file is required.' });
            }

            // Access the uploaded file via req.file
            const imageBuffer = req.file.buffer;

            try {
                const authClient = await GoogleDriveServices.authorize();
                const driveFile = await GoogleDriveServices.uploadFile(authClient, name, imageBuffer);

                // Get the link to the uploaded file
                const fileLink = `https://drive.google.com/uc?id=${driveFile.data.id}`;

                // Now, you can use 'name', 'role', and 'fileLink' to create a Maifriend
                let maifriend = await MaifriendServices.createFriend(name, role, fileLink);

                res.json({ status: true, success: maifriend });
            } catch (error) {
                console.error('Google Drive upload error:', error);
                return res.status(500).json({ status: false, error: 'Error uploading to Google Drive' });
            }
        });
    } catch (error) {
        next(error);
    }
};


exports.getFriends = async (req, res, next) => {
    try {
        let maifriends = await MaifriendServices.getFriends();

        res.json({ status: true, success: maifriends });
    } catch (error) {
        next(error);
    }
}

exports.getNewFriends = async (req, res, next) => {
    try {
        let newFriends = await MaifriendServices.getNewFriends();

        res.json({ status: true, success: newFriends });
    } catch (error) {
        next(error);
    }
}

exports.openFriend = async (req, res, next) => {
    try {
        const { itemID } = req.body;

        let friend = await MaifriendServices.openFriend(itemID);

        res.json({ status: true, success: friend });
    } catch (error) {
        next(error);
    }
}

exports.getTextResponse = async (req, res, next) => {
    try {
        const { description } = req.body;
        // console.log(description)

        let response = await TextGenServices.getTextResponse(description);

        res.json({ status: true, success: response });
    } catch (error) {
        next(error);
    }
}

exports.getImageResponse = async (req, res, next) => {
    try {
        const { description } = req.body;
        // console.log(description)

        let response = await ImgGenServices.getImageResponse(description);

        res.json({ status: true, success: response });
    } catch (error) {
        next(error);
    }
}

exports.sendMessage = async (req, res, next) => {
    try {
        const { message, role, name } = req.body;

        let response = await MsgServices.sendMessage(message, role, name);
        // console.log(response)

        res.json({ status: true, success: response });
    } catch (error) {
        next(error);
    }
}
