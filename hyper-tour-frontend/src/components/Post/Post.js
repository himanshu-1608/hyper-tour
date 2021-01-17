import React, { useContext, useEffect, useState } from 'react';

import './Post.css';

import AuthContext from '../../context/auth-context';

const Post = (props) =>{

    const auth = useContext(AuthContext);

    const [isLiked, setIsLiked] = 
                    useState(props.postLikers.find(liker=> liker.name === auth.userName));
    const [authError, setAuthError] = useState('');

    let response, responseData;
    const likePost= async () => {
        response = await fetch(`http://localhost:5000/api/posts/like`,{
                method: "POST",
                headers:{
                    authorization: `Bearer ${auth.token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    pid: props.postId,
                    decision: "like"
                })
            });
        if(response.ok) {
            setIsLiked(true);
            responseData = await response.json();
            props.changeLike();
        } else {
            responseData = await response.json();
            setAuthError(responseData.message);
        }
    }

    const unlikePost= async () => {
        response = await fetch(`http://localhost:5000/api/posts/like`,{
                method: "POST",
                headers:{
                    authorization: `Bearer ${auth.token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    pid: props.postId,
                    decision: "unlike"
                })
            });
        if(response.ok) {
            setIsLiked(false);
            responseData = await response.json();
            props.changeLike();
        } else {
            responseData = await response.json();
            setAuthError(responseData.message);
        }
    }

    return (
        <div>
            <img onClick={()=>{props.openPost(props.postId)}} className="post-image" src={`http://localhost:5000/${props.imgLink}`} width="330px" alt="user post" />
            <div className="valign-wrapper white-text post-info" >
                <span className="post-user">@{props.creator}</span>
                {!isLiked && (
                    <React.Fragment>
                        <i onClick={likePost} className="material-icons pink-text like-btn">favorite_border</i>
                        <span onClick={()=>{props.openPost(props.postId)}} className="like-count grey-text">{props.postLikers.length}</span>
                    </React.Fragment>
                )}
                {isLiked && (
                    <React.Fragment>
                        <i onClick={unlikePost} className="material-icons pink-text like-btn">favorite</i>
                        <span onClick={()=>{props.openPost(props.postId)}} className="like-count grey-text">{props.postLikers.length}</span>
                    </React.Fragment>
                )}
                <i onClick={()=>{props.openPost(props.postId)}} className="material-icons grey-text comment-btn">comment</i>
                <span onClick={()=>{props.openPost(props.postId)}} className="right-align comment-count grey-text">{props.postComments.length}</span>
            </div>
        </div>
    );
}

export default Post;