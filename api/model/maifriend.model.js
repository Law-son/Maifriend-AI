const mongoose = require('mongoose');

const db = require('../config/db');

const { Schema } = mongoose;

    const maifriendSchema = new Schema({
        name: {
            type: String,
        },
        imageLink: {
            type: String,      
        },
        role: {
            type: String,      
        },
    });
    
    const mairfriendModel = db.model('Maifriends', maifriendSchema);

    module.exports = mairfriendModel; 