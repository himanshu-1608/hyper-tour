import React, { useEffect, useState } from 'react';

import './PostModal.css';

const PostModal = (props) =>{

    const [comments, setComments] = useState();

    useEffect(()=> {
        let commentArray = [];
        for(let i=1;i<10;i++) {
            commentArray.push(
            <div className="grey-text text-lighten-2 modal-comments" key={i}>
                <strong>user {i}</strong>
                <div>Hello friends, chai pi lo... garam hai</div>
            </div>);
        }
        setComments(commentArray);
    },[]);

    return (
        <div id="post-modal">
            <div id="modal-content">
                <span onClick={props.closeModal} className="close right">&times;</span>
                <div className="row">
                    <div className="col l1 center-align">
                        <img className="circle" src="https://raw.githubusercontent.com/himanshu-1608/hello-world/master/IMG_20200607_225558.jpg" width="52px" alt="post-creator" />
                    </div>
                    <div className="col l6">
                        <h5 id="modal-post-creator">himanshu-1608</h5>
                        <h6>haryana</h6>
                    </div>
                </div>
                <div className="center-align">
                    <img src="https://source.unsplash.com/random/?tree" id="modal-post-img" alt="modal post"/>
                </div>
                <div id="modal-like-status">
                    <i className="material-icons pink-text left">favorite</i>
                    <span><strong>
                        Liked by user1, user2 and 
                        <a href="/" className="yellow-text"> 10 others </a>
                    </strong></span>
                </div>
                <div className="row">
                    <div className="col l8 push-l1">
                        <input type="text" />
                    </div>
                    <div className="col l1 offset-l1 center-align">
                        <button className="grey-text black" id="post-comment-btn">
                            Post
                        </button>
                    </div>
                </div>
                <div>
                    {comments}
                </div>
            </div>
        </div>
    );
}

export default PostModal;