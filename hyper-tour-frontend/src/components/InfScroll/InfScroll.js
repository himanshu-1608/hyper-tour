import React, { useEffect, useState } from 'react';

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

    useEffect(()=>{
        let p1 = [], p2 = [], p3 = [];
        for(let i=1;i<14;i++) {
            if(i%3===0) {
                p1.push(<Post key={i} postId={`post${i}`} openPost={openModal} imgLink={`https://source.unsplash.com/random/?${i}`}
                    />);
            } else if(i%3===1) {
                p2.push(<Post key={i} postId={`post${i}`} openPost={openModal} imgLink={`https://source.unsplash.com/random/?${i}`}
                    />);
            } else {
                p3.push(<Post key={i} postId={`post${i}`} openPost={openModal} imgLink={`https://source.unsplash.com/random/?${i}`}
                    />);
            }
        }
        setPost1(p1);
        setPost2(p2);
        setPost3(p3);

        setRendered(true);
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