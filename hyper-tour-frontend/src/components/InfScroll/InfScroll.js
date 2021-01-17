import React, { useCallback, useEffect, useState } from 'react';

import './InfScroll.css';
import Post from '../Post/Post';
import PostModal from '../PostModal/PostModal';

const InfScroll = (props) => {

    const [isRendered, setRendered] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const [posts1, setPost1] = useState();
    const [posts2, setPost2] = useState();
    const [posts3, setPost3] = useState();
    
    
    const openModal = (postId) => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const doWork = useCallback(async () => {
        response = await fetch(`http://localhost:5000/api/posts/all`,{
            method: "GET",
            headers: {
              authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDAzZTFkZWY5NTA1MjEzZTRmYzBlNTkiLCJlbWFpbCI6Im9uZUBnbWFpbC5jb20iLCJpYXQiOjE2MTA4NjcxNjZ9.yvpXZlZoo30f3Z5OIxt77nPQwIKn5Sxh3CsA970t_E8'
            }
        });
        responseData = await response.json();
        if(responseData && responseData.length>0) {
            let p1 = [], p2 = [], p3 = [];
            responseData.map((postData, i) => {
                switch(i%3) {
                    case 0: p1.push(
                        <Post key={i} postId={postData.id} openPost={openModal} postLikers={postData.likers} postComments={postData.comments} imgLink={postData.image} creator={postData.creator.name} />);
                        break;
                    case 1: p2.push(
                        <Post key={i} postId={postData.id} openPost={openModal} postLikers={postData.likers} postComments={postData.comments} imgLink={postData.image} creator={postData.creator.name} />);
                        break;
                    case 2: p3.push(
                        <Post key={i} postId={postData.id} openPost={openModal} postLikers={postData.likers} postComments={postData.comments} imgLink={postData.image} creator={postData.creator.name} />);
                        break;
                    default: p1.push(
                        <Post key={i} postId={postData.id} openPost={openModal} postLikers={postData.likers} postComments={postData.comments} imgLink={postData.image} creator={postData.creator.name} />);
                        break;
                }
            });
            setPost1(p1);
            setPost2(p2);
            setPost3(p3);
        }
        setRendered(true);
    },[]);

    let response, responseData;
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
            <PostModal closeModal={closeModal}/>
            }
        </div>
    )
}

export default InfScroll;