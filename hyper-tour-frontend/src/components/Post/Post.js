import React from 'react';

import './Post.css';

const Post = (props) =>{

    return (
        <div>
            <img onClick={()=>{props.openPost(props.postId)}} className="post-image" src={`http://localhost:5000/${props.imgLink}`} width="330px" alt="user post" />
            <div className="valign-wrapper white-text post-info" >
                <span className="post-user">@{props.creator}</span>
                <i className="material-icons pink-text like-btn">favorite_border</i>
                <span onClick={()=>{props.openPost(props.postId)}} className="like-count grey-text">{props.postLikers.length}</span>
                <i onClick={()=>{props.openPost(props.postId)}} className="material-icons grey-text comment-btn">comment</i>
                <span onClick={()=>{props.openPost(props.postId)}} className="right-align comment-count grey-text">{props.postComments.length}</span>
            </div>
        </div>
    );
}

export default Post;