const axios = require('axios');

require('dotenv').config();
const key = process.env.OPENAI_API_KEY;

class MaifriendServices {

    static async getImageResponse(description) {
        const apiKey = key;
        const url = 'https://api.openai.com/v1/images/generations'; 
    
        try {
            const response = await axios.post(url, {
                prompt: description,
                n: 1 // Number of images to generate
            }, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            let image_url = response.data.data[0].url;
            return image_url;
        } catch (error) {
            console.error('Error fetching image from DALL-E:', error);
            throw error;
        }
    }

}

module.exports = MaifriendServices;
