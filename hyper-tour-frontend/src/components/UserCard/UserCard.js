import React, { useState } from 'react';

import './UserCard.css';

const UserCard = (props) => {
    
    const [isFriend, setIsFriend] = useState(false);

    const addFriend = (index)=> {
        setIsFriend(true);
        props.addFriend(index);
    }
    return (
    <div className="col l2 user-card center-align">
        <img src="https://raw.githubusercontent.com/himanshu-1608/hello-world/master/IMG_20200607_225558.jpg" className="circle user-card-img" alt="suggestion" width="130px"/>
        
        <h6 className="white-text">himanshu-1608</h6>
        {!isFriend &&
        <button onClick={()=>{addFriend(props.index)}} className="add-friend-btn grey">Add Friend</button>
        }
        {isFriend &&
        <div className="container light-green added-div">Added :)</div>
        }
    </div>
    );
}

export default UserCard;