const maifriendModel = require('../model/maifriend.model');

class MaifriendServices {
    static async createFriend(name, role, imagePath) {
        try {
          const createFriend = new maifriendModel({ name, imageLink: imagePath, role });
          const savedFriend = await createFriend.save();
          return savedFriend;
        } catch (error) {
          console.error('Error creating friend:', error);
          throw new Error('Error creating friend. Please try again.');
        }
      }

    static async getFriends() {
        const maifriends = await maifriendModel.find();
        return maifriends;
    }
    static async getNewFriends() {
        // Sort the results in descending order based on the _id field
        const newFriends = await maifriendModel.find().sort({ _id: -1 }).limit(10);
        return newFriends;
    }    
    static async openFriend(itemId) {
        const friend = await maifriendModel.findOne({ _id: itemId });
        if (!friend) {
            // If the friend with the given _id is not found, you can handle it accordingly
            throw new Error('Friend not found');
        }
        return friend;
    }
    static async editNote(id, title, description) {
        const note = await noteModel.findById(id);
        if (!note) {
            throw new Error('Note not found');
        }

        note.title = title;
        note.description = description;
        return await note.save();
    }
    static async deleteNote(id) {
        const note = await noteModel.findOneAndDelete({ _id: id });
        if (!note) {
            throw new Error('Note not found');
        }

        return note;
    }
}

module.exports = MaifriendServices;