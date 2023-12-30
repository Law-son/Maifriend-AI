const OpenAI = require("openai");

require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: apiKey
});

class MsgServices {
    static conversation = [];  // Keep track of the conversation history

    static async sendMessage(message, role, name) {
        try {
            // Add the user's message to the conversation
            this.conversation.push({ role: "user", content: message });

            const apiResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {"role": "system", "content": `Your name is ${name} and you are ${role}.`},
                    ...this.conversation  // Include the entire conversation history
                ],
                max_tokens: 100,
                temperature: 0.5
            });

            // console.log('API Response:', apiResponse);

            let myResponse;

            if (apiResponse.choices && apiResponse.choices.length > 0) {
                myResponse = apiResponse.choices[0].message.content;

                // Add the AI's response to the conversation
                this.conversation.push({ role: "assistant", content: myResponse });
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
            const myResponse = "Error fetching response. Please try again."
            console.error('Error:', error);
            return myResponse;
        }
    }
}

module.exports = MsgServices;
