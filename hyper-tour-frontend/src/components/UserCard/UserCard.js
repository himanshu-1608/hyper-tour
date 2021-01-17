import React, { useContext, useState } from 'react';

import './UserCard.css';
import AuthContext from '../../context/auth-context';

const UserCard = (props) => {
    
    const auth = useContext(AuthContext);
    const [isFriend, setIsFriend] = useState(false);
    const[authError, setAuthError] = useState('');

    let response, responseData;
    const addFriend = async(friendId)=> {
        response = await fetch(`http://localhost:5000/api/users/following/change`,{
            method: "POST",
            headers:{
                authorization: `Bearer ${auth.token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                friendId: friendId,
                decision: "add"
            })
        });
        if(response.ok) {
            responseData = await response.json();
            setIsFriend(true);
            props.addFriend();
        } else {
            responseData = await response.json();
            setAuthError(responseData.message);
        }
    }
    return (
    <div className="col l2 user-card center-align">
        <img src={`http://localhost:5000/${props.suggestionImage}`} className="circle user-card-img" alt="suggestion" width="130px"/>
        <h6 className="white-text">{props.suggestionName}</h6>
        {!isFriend &&
        <button onClick={()=>{addFriend(props.suggestionId)}} className="add-friend-btn grey">Add Friend</button>
        }
        {isFriend &&
        <div className="container light-green added-div">Added :)</div>
        }
    </div>
    );
}

export default UserCard;