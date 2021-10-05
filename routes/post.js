import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { findAll, create, findOne, update, del } from '../controllers/post.js';
import { check } from 'express-validator';

// express router
const router = Router();

// get method to get all the post of the current user
router.get('/', findAll);

// post method for creating post for the user
router.post(
  '/create',
  auth,
  [
    check('title', 'Please fill out the field').trim().notEmpty(),
    check('body', 'Please fill out the field').trim().notEmpty(),
  ],
  create
);

// get method provide with the id in url for getting specific post
router.get('/:id', findOne);

// put method for updating post
router.put('/update/:id', auth, update);

// delete methond for deleting the post 
router.delete('/delete/:id', auth, del);

export default router;
