const HttpError = require('../models/http-error');
const Post = require('../models/post');
const { findUserById, createNewPost, findPostById } = require('../utils/db-utils');

const createPost = async(req, res, next) => {
    let creator, createdPost;
    try {
        creator = await findUserById(req.userData.userId);
        createdPost = await createNewPost({
            creator,
            image: req.file.path,
            likers: [],
            comments: []
        });
        await createdPost.save();
        creator.posts.push(createdPost);
        await creator.save();
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500
        );
        return next(error);
    }
    res.status(201).json({
        message: "Post Created",
        imgLink: req.file.path
    });
};

const getAllPosts = async(req, res, next) => {
    let allPosts;
    try {
        allPosts = await Post.find({}).limit(100)
            .populate('creator').populate('likers').exec();
        res.status(201).json(allPosts);
    } catch(e) {
        const error = new HttpError(
            'Fetching places failed, please try again.',
            500
        );
        return next(error);
    }
};

const changeLikeStatus = async(req, res, next) => {
    const myId = req.userData.userId;
    const { pid, decision } = req.body;
    let user, post;
    try {
        user = await findUserById(myId);
        post = await findPostById(pid);
        if (!user || !post) {
            const error = new HttpError('Could not find given user or post for the provided ids.', 404);
            return next(error);
        }
        const isLiked = post.likers.find(id => id == myId);
        if (decision==="unlike") {
            if(isLiked) {
                post.likers.pull(user);
                await post.save();
            }
            res.status(200).json({ val: "Removed Like" });
        } else if(decision==="like"){
            if(!isLiked) {
                post.likers.push(user);
                await post.save();
            }
            res.status(200).json({ val: "Added Like" });
        }
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find the user.',
            500
        );
        return next(error);
    }
};

const addCommentToPost = async(req, res, next) => {
    const myId = req.userData.userId;
    const { pid, message } = req.body;
    let user, post;
    try {
        user = await findUserById(myId);
        post = await findPostById(pid);
        if (!user || !post) {
            const error = new HttpError(
                'Could not find given user or post for the provided id.',
                404
            );
            return next(error);
        }
        post.comments.push({ message, commentor: user });
        await post.save();
        res.json({ addedComment: true });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not add comment.',
            500
        );
        return next(error);
    }
};

const getCurrentPost = async(req, res, next) => {
    const postId = req.params.pid;
    let post;
    try {
        post = await Post.findById(postId).populate('creator').populate({
            path: 'comments',
            populate: {
                path: 'commentor'
            }
        }).exec();
        if (!post) {
            const error = new HttpError(
                'Could not find given user or post for the provided id.',
                404
            );
            return next(error);
        }
        res.json(post.toObject({getters: true}));
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not add comment.',
            500
        );
        return next(error);
    }
};

exports.createPost = createPost;
exports.getAllPosts = getAllPosts;
exports.changeLikeStatus = changeLikeStatus;
exports.addCommentToPost = addCommentToPost;
exports.getCurrentPost = getCurrentPost;