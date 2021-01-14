import React from 'react';

import './Post.css';

const Post = (props) =>{

    return (
        <div id="post">
            <img className="post-image" src={props.imgLink} width="330px" alt="user post" />
            <div className="valign-wrapper white-text post-info" >
                <span className="post-user">himanshu_1608</span>
                <i onClick={()=>{console.log("h");}} className="material-icons pink-text like-btn">favorite_border</i>
                <span className="like-count grey-text">10</span>
                <i className="material-icons grey-text comment-btn">comment</i>
                <span className="comment-count grey-text">10</span>
            </div>
        </div>
    );
}

export default Post;