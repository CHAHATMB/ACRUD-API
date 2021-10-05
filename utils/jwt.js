import jwt from 'jsonwebtoken';

// getting secret key from environment variable or using default 
const jwtSecret = process.env.JWT_SECRET || 'secretkey';

// function for creating jwt token
const createToken = payload => {
  return jwt.sign(payload, jwtSecret);
};

// function to verify the token with the secretkey
const verifyToken = token => {
  return jwt.verify(token, jwtSecret);
};

export default { createToken, verifyToken };
