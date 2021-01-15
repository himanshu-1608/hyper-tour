import React, { useEffect, useState } from 'react';

import './SuggestionList.css';
import UserCard from '../UserCard/UserCard';

const SuggestionList = (props) => {

    const [users, setUsers] = useState();

    const addFriend = (index) => {
        console.log("Added Friend" + index);
    };

    useEffect(() => {
        let userList = [];
        for(let i=0;i<20;i++){
            userList.push(
                <UserCard key={i} index={i} addFriend={addFriend}/>
            );
        }
        setUsers(userList);
    },[]);
    return (
    <div id="sugg-list" className={`col l9`}>
        <h4 id="sugg-header" className="white-text"><strong>
            Add Connections
        </strong></h4>
        <div className="row" id="list-header">
            {users}
        </div>
    </div>
    );
};

export default SuggestionList;