const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret, times} = require('../config');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUser = async(req, res, next) => {
    const userName = req.params.uname;
    let user;
    try {
        user = await User.findOne({ name: userName });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, server error.',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'Could not find user for the provided id.',
            404
        );
        return next(error);
    }

    res.status(200).json({
        user: user.toObject({ getters: true }),
        myId: req.userData.userId
    });
};

const changeFollowingStatus = async(req, res, next) => {
    const myId = req.userData.userId;
    const { friendId, decision } = req.body;
    let user, friend;
    try {
        user = await User.findById(myId);
        friend = await User.findById(friendId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the user.',
            500
        );
        return next(error);
    }

    if (!user || !friend) {
        const error = new HttpError('Could not find given user or the friend for the provided ids.', 404);
        return next(error);
    }

    const isFriend = user.following.find(followingId => followingId == friendId);

    try {
        if (decision === "add") {
            if(!isFriend) {
                user.following.push(friend);
                friend.followers.push(user);
                await user.save();
                await friend.save();
            }
            res.json({ message: "Added in Followings" });
        } else if(decision === "remove") {   
            if(isFriend) {
                user.following.pull(friend);
                friend.followers.pull(user);
                await user.save();
                await friend.save();
            }
            res.json({ message: "Removed from Followings" });
        }
    } catch(e) {
        const error = new HttpError(
            'Something went wrong, could not complete request.',
            500
        );
        return next(error);
    }
};

const checkFollowingStatus = async(req, res, next) => {
    const myId = req.userData.userId;
    const { friendId } = req.body;
    let user;
    try {
        user = await User.findById(myId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the user.',
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            'Could not find given user for the provided id.',
            404
        );
        return next(error);
    }

    const isFriend = user.friends.find(id => id === friendId);

    if (isFriend) {
        res.status(200).json({ friend: true });
    } else {
        res.status(404).json({ friend: false });
    }
};

const getSuggestions = async(req, res, next) => {
    const myId = req.userData.userId;
    let user, allList;
    try {
        user = await User.findById(myId);
        allList = await User.find().limit(20);
        
        if (!user || !allList) {
            const error = new HttpError(
                'Could not find given user or suggestions for the provided id.',
                404
            );
            return next(error);
        }
        
        const suggestions = allList.filter(recommendedUser => {
            return (recommendedUser._id != myId) &&
            !(user.following.find(following => following._id == recommendedUser._id.toString())); 
        });

        res.status(200).json(suggestions);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the user.',
            500
        );
        return next(error);
    }
};

const updateImage = async(req, res, next) => {
    let user;
    try {
        user = await User.findById(req.userData.userId);
        user.image = req.file.path
        await user.save();
        res.status(201).json({message: "Image Updated"});
    } catch (err) {
        const error = new HttpError(
            'Image updation failed, please try again.',
            500
        );
        return next(error);
    }
};

const updatePassword = async(req, res, next) => {
    let user;
    const { oldPassword, newPassword } = req.body;
    let isValidPassword;
    try {
        user = await User.findById(req.userData.userId);
        isValidPassword = await bcrypt.compare(
            oldPassword, user.password);
    } catch (err) {
        const error = new HttpError(
            'Password updation failed, please try again.',
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
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(newPassword, times);
    } catch (err) {
        const error = new HttpError(
            'Password updation failed, please try again.',
            500
        );
        return next(error);
    }
    try{
        user.password = hashedPassword;
        await user.save();
        res.status(201).json({message: "Password Updated"});
    } catch(err) {
        const error = new HttpError(
            'Could not update password, please try again.',
            500
        );
        return next(error);
    }
};

exports.getUser = getUser;
exports.changeFollowingStatus = changeFollowingStatus;
exports.checkFollowingStatus = checkFollowingStatus;
exports.getSuggestions = getSuggestions;
exports.updateImage = updateImage;
exports.updatePassword = updatePassword;