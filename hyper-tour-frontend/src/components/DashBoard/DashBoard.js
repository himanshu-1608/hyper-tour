import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import appLogo from '../../assets/images/hyper-tour-icon.png';

import './DashBoard.css';

const DashBoard = (props) => {
    
    const history = useHistory();
    
    const highLight = "orange-text";

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
                <img src={`https://raw.githubusercontent.com/himanshu-1608/hello-world/master/IMG_20200607_225558.jpg`} className="circle" id="user-img" width="100px" alt="user"/>
            </div>
            <div className="center-align white-text" id="user-full-name">
                <strong>Himanshu Yadav</strong>
            </div>
            <div className="center-align grey-text" id="user-name">
                @himanshu-1608
            </div>
            <div className="row center-align" id="user-stats">
                <div className="col l4">
                    <div className="white-text">16</div>
                    <div className="grey-text">Posts</div>
                </div>
                <div className="col l4 vertical-bar-separator">
                    <div className="white-text">35</div>
                    <div className="grey-text">Following</div>
                </div>
                <div className="col l4 vertical-bar-separator">
                    <div className="white-text">30</div>
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