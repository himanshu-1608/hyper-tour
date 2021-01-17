import React, { useContext, useEffect, useState } from 'react';

import './PostModal.css';

import AuthContext from '../../context/auth-context';

const PostModal = (props) =>{

    const auth = useContext(AuthContext);
    const [comments, setComments] = useState();
    const [commentAdded, setCommentAdded] = useState(false);
    const [authError, setAuthError] = useState('');
    const [image, setImage] = useState('');
    const [author, setAuthor] = useState('');
    const [authorImg, setAuthorImg] = useState('');
    const [likes, setLikes] = useState(0);
    const [currComment, setCurrComment] = useState('');

    const changeCommentHandler = e => setCurrComment(e.target.value);

    let response, responseData;
    const addCommentHandler = async() => {
        response = await fetch(`http://localhost:5000/api/posts/addComment`,{
                method: "POST",
                headers:{
                    authorization: `Bearer ${auth.token}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    pid: props.postId,
                    message: currComment
                })
            });
        if(response.ok) {
            setCurrComment('');
            responseData = await response.json();
            console.log(responseData);
            setCommentAdded(!commentAdded);
        } else {
            responseData = await response.json();
            setAuthError(responseData.message);
        }
    }

    useEffect(()=> {
        const getPost = async() => {
            response = await fetch(`http://localhost:5000/api/posts/${props.postId}`,{
              headers:{
                authorization: `Bearer ${auth.token}`
              }
            });
            if(response.ok) {
                responseData = await response.json();
                console.log(responseData);
                setImage(responseData.image);
                setAuthorImg(responseData.creator.image);
                setAuthor(responseData.creator.name);
                setLikes(responseData.likers.length);
                setComments(
                    responseData.comments.map(comment => {
                        return (
                        <div className="grey-text text-lighten-2 modal-comments" key={comment.id}>
                            <strong>{comment.commentor.name}</strong>
                            <div>{comment.message}</div>
                        </div>); 
                    })
                );
            } else {
                responseData = await response.json();
                setAuthError(responseData.message);
            }
        }
        getPost();
        // let commentArray = [];
        // for(let i=1;i<10;i++) {
        //     commentArray.push(
        //     <div  key={i}>
        //         <strong>user {i}</strong>
        //         <div>Hello friends, chai pi lo... garam hai</div>
        //     </div>);
        // }
        // setComments(commentArray);
    },[commentAdded]);

    return (
        <div id="post-modal">
            <div id="modal-content">
                <span onClick={props.closeModal} className="close right">&times;</span>
                <div className="row">
                    <div className="col l1 center-align">
                        <img className="circle" src={authorImg} width="52px" alt="post-creator" />
                    </div>
                    <div className="col l6">
                        <h5 id="modal-post-creator">{author}</h5>
                        <h6>haryana</h6>
                    </div>
                </div>
                <div className="center-align">
                    <img src={`http://localhost:5000/${image}`} id="modal-post-img" alt="modal post"/>
                </div>
                <div id="modal-like-status">
                    <i className="material-icons pink-text left">favorite</i>
                    <span><strong>
                        Liked by {likes} users
                    </strong></span>
                </div>
                <div className="row">
                    <div className="col l8 push-l1">
                        <input value={currComment} onChange={changeCommentHandler} type="text" />
                    </div>
                    <div className="col l1 offset-l1 center-align">
                        <button onClick={addCommentHandler} className="grey-text black" id="post-comment-btn">
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