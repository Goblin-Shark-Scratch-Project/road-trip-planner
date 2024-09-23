const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const port = 3000;
const userController = require('./controllers/userController');
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;


mongoose.connect(mongoURI)
  .then(() => console.log(`Connected to MongoDB at ${mongoURI}`))
  .catch(err => console.error('Failed to connect to MongoDB', err));
app.use(express.json());

app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'successfully login',
  });
});

app.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'successfully signed up',
  });
});

// used to try to get around broswer's cross origin issues on frontend
// only seems to work with :param syntax?
app.get('/corsproxy/:url', async (req, res, next) => {
  try {
    console.log(req.params.url);
    // TODO: should be refactored to do this more dynamically

    const fetch_url = `${req.query.url}?key=${
      req.query.key
    }&origin=${req.query.origin.replace(
      ' ',
      '+'
    )}&destination=${req.query.destination.replace(' ', '+')}`;

    const response = await fetch(fetch_url);
    const data = await response.json();
    return res
      .status(200)
      .setHeader('Access-Control-Allow-Origin', '*') // all this is to set this header on the response to the browser
      .json(data);

    //
  } catch (error) {
    return next({
      success: false,
      log: 'CORS-Proxy: ' + error,
      status: 500,
      message: 'An Proxy error occurred',
    });
  }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../frontend/vite-app/dist/index.html'));
// });
//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    success: false,
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'An error occurred',
  };
  const errorObj = Object.assign({}, defaultErr, err);

  console.log(errorObj.log);
  return res.status(errorObj.status).json({
    success: errorObj.success,
    message: errorObj.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
