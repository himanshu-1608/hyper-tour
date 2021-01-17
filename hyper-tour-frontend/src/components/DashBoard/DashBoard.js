import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appLogo from '../../assets/images/hyper-tour-icon.png';

import AuthContext from '../../context/auth-context';

import './DashBoard.css';

const DashBoard = (props) => {

    const history = useHistory();
    const auth = useContext(AuthContext);

    const highLight = "orange-text";

    const [authError, setAuthError] = useState('');
    const [userName, setUserName] = useState('');
    const [userPosts, setUserPosts] = useState('');
    const [userFollowing, setUserFollowing] = useState([]);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userImage, setUserImage] = useState([]);
    const [divFeed, setDivFeed] = useState();
    const [divUpload, setDivUpload] = useState();
    const [divSuggest, setDivSuggest] = useState();
    const [divSetting, setDivSetting] = useState();
    
    useEffect(() => {
        setDivFeed(document.getElementById('trigger-feed'));
        setDivUpload(document.getElementById('trigger-add-post'));
        setDivSuggest(document.getElementById('trigger-suggestion'));
        setDivSetting(document.getElementById('trigger-settings'));
    });

    const clickFeed = () => {
        history.push("/");
        divFeed.classList.add(highLight);    
        divUpload.classList.remove(highLight);    
        divSuggest.classList.remove(highLight);    
        divSetting.classList.remove(highLight);    
    }

    const clickAddPhoto = () => {
        history.push("/upload");
        divFeed.classList.remove(highLight);    
        divUpload.classList.add(highLight);    
        divSuggest.classList.remove(highLight);    
        divSetting.classList.remove(highLight);
    }

    const clickSuggestions = () => {
        history.push("/suggestions");
        divFeed.classList.remove(highLight);    
        divUpload.classList.remove(highLight);    
        divSuggest.classList.add(highLight);    
        divSetting.classList.remove(highLight);
    }

    const clickSettings = () => {
        history.push("/settings");
        divFeed.classList.remove(highLight);    
        divUpload.classList.remove(highLight);    
        divSuggest.classList.remove(highLight);    
        divSetting.classList.add(highLight);
    }

    let response, responseData;
    useEffect(()=> {
        const findUserData = async() =>{
            response = await fetch(`http://localhost:5000/api/users/${auth.userName}`,{
              headers:{
                authorization: `Bearer ${auth.token}`
              }
            });
            if(response.ok) {
              const responseData = await response.json();
              setUserName(responseData.user.name);
              setUserImage(responseData.user.image);
              setUserPosts(responseData.user.posts);
              setUserFollowers(responseData.user.followers);
              setUserFollowing(responseData.user.following);
            } else {
              responseData = await response.json();
              setAuthError(responseData.message);
            }
        }
        findUserData();    
    },[props.stateChanged]);

    return (
        <div id="dash-board" className={`col l3`}>
            <div>
                <a onClick={clickFeed} className="center-align valign-wrapper white-text">
                <img id="app-logo" src={appLogo} width="50px" alt="app-logo"/>
                <span id="app-name">Hyper Tour</span>
                </a>
            </div>
            <svg id="outer-circle">
                <circle cx="180" cy="70" r="56" stroke="grey" strokeWidth="2" /> Unsupported SVGs
            </svg> 
            <div className="center-align">
                <img src={userImage} className="circle" id="user-img" width="100px" alt="user"/>
            </div>
            <div className="center-align white-text" id="user-full-name">
                <strong>@{userName}</strong>
            </div>
            <div className="row center-align" id="user-stats">
                <div className="col l4">
                    <div className="white-text">{userPosts.length}</div>
                    <div className="grey-text">Posts</div>
                </div>
                <div className="col l4 vertical-bar-separator">
                    <div className="white-text">{userFollowing.length}</div>
                    <div className="grey-text">Following</div>
                </div>
                <div className="col l4 vertical-bar-separator">
                    <div className="white-text">{userFollowers.length}</div>
                    <div className="grey-text">Followers</div>
                </div>
            </div>
            <div id="triggers">
                <div onClick={clickFeed} className={`valign-wrapper orange-text`} id="trigger-feed">
                    <i className="material-icons">dashboard</i>
                    Feed
                </div>
                <div onClick={clickAddPhoto} className="valign-wrapper" id="trigger-add-post">
                    <i className="material-icons">add_a_photo</i>
                    Add Photo
                </div>
                <div onClick={clickSuggestions} className="valign-wrapper" id="trigger-suggestion">
                    <i className="material-icons">person_add</i>
                    Suggestions
                </div>
                <div onClick={clickSettings} className="valign-wrapper" id="trigger-settings">
                    <i className="material-icons">settings</i>
                    Settings
                </div>
                <p id="horizontal-divider"></p>
                <div onClick={props.logout} className="valign-wrapper" id="trigger-logout">
                    <i className="material-icons">exit_to_app</i>
                    Log Out
                </div>
            </div>
            
        </div>
    )
}

export default DashBoard;