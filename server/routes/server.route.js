const router = require('express').Router();

const serverController = require('../controller/server.controller');


router.post('/createFriend', serverController.createFriend);
router.get('/getFriends', serverController.getFriends);
router.get('/getNewFriends', serverController.getNewFriends);
router.post('/openFriend', serverController.openFriend);
router.post('/getTextResponse', serverController.getTextResponse);
router.post('/getImageResponse', serverController.getImageResponse);
router.post('/sendMessage', serverController.sendMessage);

module.exports = router;


//* Define the various routes to the server in this file
