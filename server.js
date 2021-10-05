// importing necessary modules
import express, { urlencoded, json } from 'express';
import connectToDatabase from './utils/dbConfig.js';
import user from './routes/user.js';
import post from './routes/post.js';
import errorMiddleware from './middlewares/error.js';

// creating express app
const app = express();

//express middleware
app.use(urlencoded({ extended: false }));
app.use(json());

// get method on '/'
app.get('/api', (req, res) => {
  res.status(400).send('WelCome to CRUD API with Authentication for user and posts');
});

// seting up router's
app.use('/api/user', user);
app.use('/api/post', post);

// if encounter with the path that is not known, unknow paths responding with 404 status code
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    errors: [
      {
        msg: 'Such path doesn\'t exsit in Server. Please Try another path.',
      },
    ],
  })
});

// adding error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

// first connecting to database then starting the server on the given or default PORT number
// underscore for void parameter 
connectToDatabase().then(_ => {
  // starting the app
  app.listen(PORT, _ => {
    console.log(`The server is running on Port : ${PORT}`)
  });
});
