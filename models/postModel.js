import mongoose from 'mongoose';
// Schema for post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  published: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Post', postSchema);
