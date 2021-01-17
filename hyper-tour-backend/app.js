const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const { mongoUrl } = require('./config'); 

const authsRoutes = require('./routes/auths-routes');
const usersRoutes = require('./routes/users-routes');
const postsRoutes = require('./routes/posts-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images',
        express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/auths', authsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect(
        mongoUrl
    ).then(() => {
        console.log("DB connection successful!");
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });