// importing modules 
import User from '../models/userModel.js';
import { genSalt, hash, compare } from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from '../utils/jwt.js';
import CustomError from '../utils/CustomError.js';

// Function for signUp
const signUp = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    })
  }

  const { username, email, password } = req.body;
  try {
    // Since email should be unique
    let user = await User.findOne({ email })
    if (user) {
      return next(
        new CustomError('User with provided email already exists in the server!', 403)
      )
    }

    // Since username should also be unique
    user = await User.findOne({ username });

    if (user) {
      return next(
        new CustomError('User with provided Username already exists in the server!', 403)
      )
    }
    // creating new user to store in database
    user = new User({
      username,
      email,
      password,
    });

    const salt = await genSalt(10);
    // hashing password to store in database
    const hashedPassword = await hash(password, salt);

    user.password = hashedPassword;
    // saving the user object
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (err) {
    next(new CustomError('Something went wrong', 500))
  }
}

// Login function  
const login = async (req, res, next) => {
  // validating the respose got from user
  const errors = validationResult(req);
  // if contains some error 
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  };
  // extracting email and password from request body
  const { email, password } = req.body
  try {
    // finding user using email
    let user = await User.findOne({ email });
    // if user doesn't exist for that email
    if (!user) return next(new CustomError('Invalid credentials', 400));

    // comparing the password got from user request and database 
    const isMatch = await compare(password, user.password);
    // if not matched resending error in respose with 400 
    if (!isMatch) {
      return next(new CustomError(`Invalid credentials`, 400))
    }
    // generating accessToken using user id
    const accessToken = jwt.createToken({
      id: user._id,
    });
    
    user.isLoggedIn = true;
    await user.save();

    // sending accessToken and user object in respose
    res
      .header('authorization', accessToken)
      .send({ success: true, accessToken, user });
  } catch (err) {
    // if some error printing it
    console.log(err);
    next(new CustomError('Something went wrong', 500));
  }
};
// exporting the functions
export default { signUp, login };
