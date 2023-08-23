import {models, Schema, model} from 'mongoose';

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    tags: {
        type: [String],
        required: [true, 'Tags are required!'],
    },
    country: {
        type: String,
        required: [true, 'Country is required!'],
    },
    picture: {
        type: String,
        required: [true, 'Picture is required!'],
    },
    
    createdDate: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    }
});

const Post = models.Post || model('Post', PostSchema);

export default Post;

