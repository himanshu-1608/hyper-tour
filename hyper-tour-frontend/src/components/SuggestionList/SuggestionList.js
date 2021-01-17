import React, { useContext, useEffect, useState } from 'react';

import './SuggestionList.css';
import UserCard from '../UserCard/UserCard';
import AuthContext from '../../context/auth-context';

const SuggestionList = (props) => {

    const auth = useContext(AuthContext);
    const [users, setUsers] = useState();
    const [authError, setAuthError] = useState('');
    const [stateChange, setStateChange] = useState(false);

    const addFriend = () => {
        setStateChange(!stateChange);
        props.updateDashBoard();
    };

    let response, responseData;
    useEffect(() => {
        const getSuggestions = async() => {
            response = await fetch(`http://localhost:5000/api/users/friends/suggestion`,{
                headers:{
                    authorization: `Bearer ${auth.token}`
                }
            });
            if(response.ok) {
                responseData = await response.json();
                setUsers(
                    responseData.map(suggestion => 
                    <UserCard suggestionImage={suggestion.image} suggestionName={suggestion.name} key={suggestion._id} suggestionId={suggestion._id} addFriend={addFriend} />)
                );
            } else {
                responseData = await response.json();
                setAuthError(responseData.message);
            }
        };
        getSuggestions();
    },[stateChange]);
    
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