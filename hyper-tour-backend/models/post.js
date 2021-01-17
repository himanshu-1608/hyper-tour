const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    image: { type: String, required: true, unique: true },
    likers: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
    comments: [{
        message: { type: String, required: true },
        commentor: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
    }]
});

module.exports = mongoose.model('Post', postSchema);