import jwt from '../utils/jwt.js';
import User from '../models/userModel.js';
import CustomError from '../utils/CustomError.js';

// defualt middleware function for authorization 
export default async (req, res, next) => {
  try {
    let token;
    if (
      // request header should contain token in formate "Bearer <token>"
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // extracting token values from request header if exsist
      token = req.headers.authorization.split(' ')[1]
    }
    // token is not found Unauthorized access should return error
    if (!token) {
      return next(
        new CustomError('Unauthorized access, provide the token', 401)
      )
    }

    let decoded;
    // decoding the token get from request header
    try {
      // verifying the token and storing its value in decoded vairable
      decoded = jwt.verifyToken(token);
    } catch (err) {
      // if unable to decode token, token is wrong or something else happen
      return next(
        new CustomError('Unauthorized access, provide the correct token', 401)
      )
    };
    // Decoded token contains id using it finding the user from the database
    const user = await User.findById(decoded.id);

    // if the user is not found generating error and sending it back to user 
    if (!user) {
      return next(new CustomError('Unauthorized access', 401));
    }
    // seting req.uid equals to id get from token
    req.uid = decoded.id;
    next();
  } catch (err) {
    // If some error happen requesting user to try again
    next(new CustomError('Something went wrong, please try again!', 500));
  }
}
