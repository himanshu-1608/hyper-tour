const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret, times} = require('../config');
const {findUserByEmail, createNewUser} = require('../utils/db-utils');
const HttpError = require('../models/http-error');

const signup = async(req, res, next) => {
    
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await findUserByEmail(email);
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists already, please login instead.',
            422
        );
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, times);
    } catch (err) {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }

    const createdUser = await createNewUser({
        name,
        email,
        password: hashedPassword,
        image: 'uploads/images/new-user.png',
        following: [],
        followers: [],
        posts: []
    });
    
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({
            userId: createdUser.id,
            email: createdUser.email
        },secret);
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }
    res.status(201).json({
            userId: createdUser.id,
            email: createdUser.email,
            token: token,
            userName: name
        });
};

const login = async(req, res, next) => {
    
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await findUserByEmail(email);
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    if (!existingUser) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(
            password, existingUser.password);
    } catch (err) {
        const error = new HttpError(
            'Could not log you in, please try again.',
            500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Invalid credentials, could not log you in.',
            403
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({
            userId: existingUser.id,
            email: existingUser.email
        }, secret);
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    res.status(200).json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
        userName: existingUser.name,
    });
};

exports.signup = signup;
exports.login = login;