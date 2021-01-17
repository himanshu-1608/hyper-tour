import React, { useCallback, useContext, useEffect, useState } from 'react';

import './InfScroll.css';
import Post from '../Post/Post';
import PostModal from '../PostModal/PostModal';
import AuthContext from '../../context/auth-context';

const InfScroll = (props) => {

    const auth = useContext(AuthContext);
    const [isRendered, setRendered] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currPost, setCurrPost] = useState('');

    const [posts1, setPost1] = useState();
    const [posts2, setPost2] = useState();
    const [posts3, setPost3] = useState();
    
    
    const openModal = (postId) => {
        setCurrPost(postId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setCurrPost('');
        setModalOpen(false);
    };

    const changeState = () => {
        doWork();
    }

    let response, responseData;
    const doWork = useCallback(async () => {
        response = await fetch(`http://localhost:5000/api/posts/all`,{
            method: "GET",
            headers: {
              authorization: `Bearer ${auth.token}`
            }
        });
        responseData = await response.json();
        if(responseData && responseData.length>0) {
            let p1 = [], p2 = [], p3 = [];
            responseData.map((postData, i) => {
                switch(i%3) {
                    case 0: p1.push(
                        <Post key={i} postId={postData._id} changeLike={changeState} openPost={openModal} postLikers={postData.likers} postComments={postData.comments} imgLink={postData.image} creator={postData.creator.name} />);
                        break;
                    case 1: p2.push(
                        <Post key={i} postId={postData._id} changeLike={changeState} openPost={openModal} postLikers={postData.likers} postComments={postData.comments} imgLink={postData.image} creator={postData.creator.name} />);
                        break;
                    case 2: p3.push(
                        <Post key={i} postId={postData._id} changeLike={changeState} openPost={openModal} postLikers={postData.likers} postComments={postData.comments} imgLink={postData.image} creator={postData.creator.name} />);
                        break;
                    default: p1.push(
                        <Post key={i} postId={postData._id} changeLike={changeState} openPost={openModal} postLikers={postData.likers} postComments={postData.comments} imgLink={postData.image} creator={postData.creator.name} />);
                        break;
                }
            });
            setPost1(p1);
            setPost2(p2);
            setPost3(p3);
        }
        setRendered(true);
    },[]);
    
    useEffect(()=> {
        doWork();
    },[]);

    return (
        <div id="inf-scroll" className={`col l9`}>
            <h4 className="white-text"><strong>Feed</strong></h4>
            {isRendered &&
            <div className="row" id="parent-posts">
                <div className="col l4">
                    {posts1}
                </div>
                <div className="col l4">
                    {posts2}
                </div>
                <div className="col l4">
                    {posts3}
                </div>
            </div>
            }
            {isModalOpen &&
            <PostModal postId={currPost} changeComment={changeState} closeModal={closeModal}/>
            }
        </div>
    )
}

export default InfScroll;