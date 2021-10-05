// Importing modules
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import CustomError from '../utils/CustomError.js';

// function for creating post
export async function create(req, res, next) {
  // checking if body is empty of not, if it is empty generating customerror
  if (!req.body) {
    return next(new CustomError('Body cannot be empty', 400));
  }
  try {
    // creating post object
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      creator: req.uid,
    });

    //finding the current user who is creating the post
    const user = await User.findById(req.uid);
    
    //if user found adding post to it 
    if (user) {
      const posts = [...user.posts, post.id];
      await user.updateOne({ posts });

      return res.status(201).send({ success: true, post });
    }
  } catch (err) {
    console.log(err);
    next(new CustomError('Something went wrong', 500));
  }
};

// function for finding all the post of user
export async function findAll(req, res, next) {
  try {
    // geting all post of the current user
    const post = await Post.find();
    // sending all found post of current user in response
    return res.status(200).send({ success: true, post: post });
  } catch (err) {
    console.log(err);
    next(new CustomError('Something went wrong', 500));
  }
};

// function for finding specific post using post id
export async function findOne(req, res, next) {
  try {
    // Extracting post from database and storing it in variable post
    const post = await Post.findById(req.params.id);

    // if post doesn't exist the generating custom error 
    if (!post) {
      return next(new CustomError('Post not found', 404));
    }
    // everything is fine sending post back to user
    res.send({ success: true, post: post });
  } catch (err) {
    // some unknow error 
    next(new CustomError('Something went wrong', 500));
  }
};

// function for updating post
export async function update(req, res, next) {
  try {
    // finding the post and updating it simultaneously
    const editpost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    // if post doesn't exist generating error
    if (!editpost) {
      return next(new CustomError('Post not found', 404))
    }
    // returnig the updated post to user with success message
    return res.status(200).send({ success: true, post: editpost })
  } catch (err) {
    next(new CustomError('Something went wrong', 500));
  }
};

// function to delete post thus completing CRUD operation.
export async function del(req, res, next) {
  try {
    // first finding the post using id
    const post = await Post.findById(req.params.id)
    // if post doesn't exist returning error
    if (!post) {
      return next(new CustomError('Post not found', 404));
    }
    // if the post creator and user are different, user is not authorized to delete it
    if (post.creator != req.uid) {
      return next(new CustomError('Unauthorized access to delete route', 400));
    }
    // if all seems good deleting the post
    await Post.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.uid);

    // deleting the post from user object too.
    if (user) {
      let posts = user.posts.filter(postId => postId != req.params.id);
      await user.updateOne({ posts });
    }
    // sending respose of success and deleted post to user
    return res.send({ success: true, post })
  } catch (err) {
    next(new CustomError('Something went wrong', 500));
  }
};
