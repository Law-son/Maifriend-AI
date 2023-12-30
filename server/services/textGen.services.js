const OpenAI = require("openai");
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey
});

let myResponse = '';


class TextGenServices{
    static async getTextResponse(description){
        try {
            const apiResponse = await openai.completions.create({
                model: 'text-davinci-003',
                max_tokens: 100,
                temperature: 0.1,
                prompt: description
            });

            if (apiResponse.choices && apiResponse.choices.length > 0) {
                // console.log(apiResponse.choices[0].text);
                myResponse = apiResponse.choices[0].text;
            } else {
                myResponse = "Error returning response";
                if (apiResponse.error && apiResponse.error.message) {
                    console.error('API error message:', apiResponse.error.message);
                } else {
                    console.error('Unknown error');
                }
            }

            return myResponse;

        } catch (error) {
            // Handle any errors and send an error response.
            myResponse = "Error fetching response. Please try again."
            console.error('Error:', error);
            return myResponse;
        }
    }
}

module.exports = TextGenServices;