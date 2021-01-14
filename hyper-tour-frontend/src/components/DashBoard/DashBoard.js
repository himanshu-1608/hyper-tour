import React from 'react';
import appLogo from '../../assets/images/hyper-tour-icon.png';

import './DashBoard.css';

const DashBoard = (props) => {
    return (
        <div id="dash-board" className={`col l3`}>
            <div>
                <a href="/" className="center-align valign-wrapper white-text">
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
                <div className="valign-wrapper" id="trigger-feed">
                    <i className="material-icons">dashboard</i>
                    Feed
                </div>
                <div className="valign-wrapper" id="trigger-add-post">
                    <i className="material-icons">add_a_photo</i>
                    Add Photo
                </div>
                <div className="valign-wrapper" id="trigger-suggestion">
                    <i className="material-icons">person_add</i>
                    Suggestions
                </div>
                <div className="valign-wrapper" id="trigger-settings">
                    <i className="material-icons">settings</i>
                    Settings
                </div>
                <p id="horizontal-divider"></p>
                <div className="valign-wrapper" id="trigger-logout">
                    <i className="material-icons">exit_to_app</i>
                    Log Out
                </div>
            </div>
            
        </div>
    )
}

export default DashBoard;