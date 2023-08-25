// import mongoose from 'mongoose';
import {models, Schema, model} from 'mongoose';
const CommentSchema =new Schema({
    name: {
        type: String,
        // required: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        // required: true
    },
    comments: {
        type: String,
        required: true
    }
});


const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;