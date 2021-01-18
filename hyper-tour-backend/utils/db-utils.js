const User = require('../models/user');
const Post = require('../models/post');
const HttpError = require('../models/http-error');

const createNewUser = async(userData) => {
    let user;
    try {
        user = User(userData);
    } catch(err) {
        const error = new HttpError(
            'Could not create user', 500);
        throw(error);
    }
    return user;
}

const findUserById = async(userId) => {
    let user;
    try{
        user = await User.findById(userId);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, server error.',500);
        throw (error);
    }
    if (!user) {
        const error = new HttpError(
            'Could not find user for the provided id.', 404);
        throw(error);
    }
    return user;
}

const findUserByName = async (userName) => {
    let user;
    try{
        user = await User.findOne({ name: userName });
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, server error.',500);
        throw (error);
    }
    if (!user) {
        const error = new HttpError(
            'Could not find user for the provided id.', 404);
        throw(error);
    }
    return user;
}

const findUserByEmail = async (userMail) => {
    let user;
    try{
        user = await User.findOne({ email: userMail });
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, server error.',500);
        throw (error);
    }
    return user;
}

const getLimitedUsers = async(limits) => {
    let userList;
    try{
        userList = await User.find().limit(limits);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, server error.',500);
        throw (error);
    }
    if (!userList) {
        const error = new HttpError(
            'Could not find suggestions.', 404);
        throw(error);
    }
    return userList;
}

const findPostById = async(postId) => {
    let post;
    try{
        post = await Post.findById(postId);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong, server error.',500);
        throw (error);
    }
    if (!post) {
        const error = new HttpError(
            'Could not find user for the provided id.', 404);
        throw(error);
    }
    return post;
}

const createNewPost = async(postData) => {
    let post;
    try {
        post = Post(postData);
    } catch(err) {
        const error = new HttpError(
            'Could not create post', 500);
        throw(error);
    }
    return post;
}

exports.createNewUser = createNewUser;
exports.findUserByName = findUserByName;
exports.findUserById = findUserById;
exports.findUserByEmail = findUserByEmail;
exports.getLimitedUsers = getLimitedUsers;
exports.findPostById = findPostById;
exports.createNewPost = createNewPost;