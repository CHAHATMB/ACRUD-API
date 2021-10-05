import { Router } from 'express';
import { check } from 'express-validator';

import userController from '../controllers/user.js';

const router = Router();

// post method for signing up the user
router.post(
  '/signup',
  [
    // checking if all the field are exsist or not
    check('username', 'Please enter a valid username').trim().notEmpty(),
    check('email', 'Please enter a valid email').trim().isEmail(),
    check('password', 'Please enter a valid password')
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.signUp
);

// post method for login
router.post(
  '/login',
  [
    // checking email and password exsist or not
    check('email', 'Please enter a valid email').trim().isEmail(),
    check('password', 'Please enter a valid password')
      .trim()
      .isLength({ min: 6 }),
  ],
  userController.login
);

// exporting defualt router
export default router;
