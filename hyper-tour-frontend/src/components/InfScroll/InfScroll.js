import React, { useEffect, useState } from 'react';

import './InfScroll.css';
import Post from '../Post/Post';

const InfScroll = (props) => {

    const [isRendered, setRendered] = useState(false);

    const [posts1, setPost1] = useState();
    const [posts2, setPost2] = useState();
    const [posts3, setPost3] = useState();
    
    useEffect(()=>{
        let p1 = [], p2 = [], p3 = [];
        for(let i=1;i<14;i++) {
            if(i%3===0) {
                p1.push(<Post key={i}
                    imgLink={`https://source.unsplash.com/random/?${i}`}
                    />);
            } else if(i%3===1) {
                p2.push(<Post key={i}
                    imgLink={`https://source.unsplash.com/random/?${i}`}
                    />);
            } else {
                p3.push(<Post key={i}
                    imgLink={`https://source.unsplash.com/random/?${i}`}
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
            <div id="profile-view">
                <i className="material-icons valign-wrapper white-text">chevron_left</i>
            </div>
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
        </div>
    )
}

export default InfScroll;

/*
<div className="col l4 purple">
                    
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?b`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?c`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?d`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?e`} width="310px" alt="shit" />
                </div>
                <div className="col l4 green">
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?f`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?g`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?h`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?i`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?j`} width="310px" alt="shit" />
                </div>
                <div className="col l4 brown">
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?k`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?l`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?m`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?n`} width="310px" alt="shit" />
                    <img id="indi-posts" src={`https://source.unsplash.com/random/?o`} width="310px" alt="shit" />
                </div>
*/