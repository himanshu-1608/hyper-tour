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

const changeFriendStatus = async(req, res, next) => {
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

    const isFriend = user.friends.find(id => id === friendId);

    try {
        if (decision === "add" && !isFriend) {
            user.friends.push(friend);
            await user.save();
            res.json({ message: "Added Friend" });
        } else if(decision === "remove" && isFriend) {   
            user.friends.pull(friend);
            await user.save();
            res.json({ message: "Removed Friend" });
        }
    } catch(e) {
        const error = new HttpError(
            'Something went wrong, could not complete request.',
            500
        );
        return next(error);
    }
};

const checkFriendStatus = async(req, res, next) => {
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
    let user, allList, suggestions = [];
    try {
        user = await User.findById(myId).populate('friends');
        allList = await User.find().limit(10);
        
        if (!user) {
            const error = new HttpError(
                'Could not find given user for the provided id.',
                404
            );
            return next(error);
        }
        // for (recommend of allList) {
        //     if (recommend.id === user.id) {
        //         continue;
        //     }
        //     isFriend = false;
        //     for (friendUser of user.friends) {
        //         if (recommend.id === friendUser.id) {
        //             isFriend = true;
        //         }
        //     }
        //     if (!isFriend) {
        //         suggestions.push(recommend);
        //     }
        // }
        res.status(200).json({ suggestedUsers: suggestions });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the user.',
            500
        );
        return next(error);
    }
};

exports.getUser = getUser;
exports.changeFriendStatus = changeFriendStatus;
exports.checkFriendStatus = checkFriendStatus;
exports.getSuggestions = getSuggestions;