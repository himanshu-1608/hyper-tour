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

exports.getUser = getUser;
exports.changeFollowingStatus = changeFollowingStatus;
exports.checkFollowingStatus = checkFollowingStatus;
exports.getSuggestions = getSuggestions;