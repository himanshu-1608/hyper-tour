import React, {useState, useContext} from 'react';
import appLogo from '../../assets/images/hyper-tour-icon.png';

import './Auth.css';
import AuthContext from '../../context/auth-context';

const Auth = props => {
    const [loginMode, setLoginMode] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [authError, setAuthError] = useState('');

    const auth = useContext(AuthContext);
    const submitAuthHandler = async(e) => {
        e.preventDefault();
        let response, responseData;
        try {
            if(loginMode) {
                response = await fetch('http://localhost:5000/api/auths/login',{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: userEmail,
                        password: userPassword
                    })
                });
                if(response.ok) {
                    responseData = await response.json();
                    auth.login(responseData.token, responseData.userName);
                } else {
                    responseData = await response.json();
                    setAuthError(responseData.message);
                }
            } else {
                response = await fetch('http://localhost:5000/api/auths/signup',{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: userName,
                        email: userEmail,
                        password: userPassword
                    })
                });
                if(response.ok) {
                    responseData = await response.json();
                    auth.login(responseData.token, responseData.userName);
                } else {
                    responseData = await response.json();
                    setAuthError(responseData.message);
                }
            }
        } catch(e) {
            console.log(e);
        }
    };

    const nameChangeHandler = (e) =>{
        setUserName(e.target.value);
    };
    const emailChangeHandler = (e) =>{
        setUserEmail(e.target.value);
    };
    const passwordChangeHandler = (e) =>{
        setUserPassword(e.target.value);
    };

    const flipModes = (e) =>{
        e.preventDefault();
        setLoginMode(!loginMode);
    };
    return (
        <div id="auth-page">
            <div style={{marginTop: "36px", marginLeft:"600px"}} className="center-align">
                <a href="/" className="valign-wrapper white-text">
                <img src={appLogo} width="100px" alt="app-logo"/>
                <span style={{fontSize:"40px", marginLeft:"36px"}}>HyperTour</span>
                </a>
            </div>
            <h2 className="center-align lime-text">
                Welcome to HyperTour</h2>
            <h5 className="center-align lime-text text-darken-2">Upload photos, follow your inspirational personalities, see what's happenin' in their life and talk to people<br /><br /><strong>Join Today</strong>
            </h5>
            <form style={{margin: "0px 600px"}} onSubmit={submitAuthHandler} className="center-align">
                {!loginMode &&
                <div className="input-field input_wrapper">
                    <i className="material-icons prefix">account_circle</i>
                    <input onChange={nameChangeHandler} id="user_name" type="text"
                    className="cyan-text" value={userName} required/>
                    <label htmlFor="user_name">User Name</label>
                </div>
                }
                <div className="input-field input_wrapper">
                    <i className="material-icons prefix">email</i>
                    <input onChange={emailChangeHandler} id="user_email" type="email"
                    className="cyan-text" value={userEmail} required/>
                    <label htmlFor="user_email">Email</label>
                </div>
                <div className="input-field input_wrapper">
                    <i className="material-icons prefix">lock</i>
                    <input onChange={passwordChangeHandler} id="user_password" type="password" className="cyan-text" value={userPassword} required/>
                    <label htmlFor="user_password">Password</label>
                </div>
                {authError && authError.length>0 && (
                <div className="purple darken-4 red-text" id="auth-error">
                    {authError}
                </div> )
                }
                {loginMode && (
                <div>
                    <button className="grey lighten-2" id="submit-auth-btn" type="submit">Log into the virtual world</button>
                    <h6 className="grey-text">Wanna create a new account?</h6>
                    <div onClick={flipModes} style={{cursor: "pointer"}} className="lime-text">
                Sign Up here</div>
                </div>)
                }
                {!loginMode && (
                <div>
                    <button className="grey lighten-2" id="submit-auth-btn" type="submit">Start Your Journey</button>
                    <h6 className="grey-text">Already have an account?</h6>
                    <div onClick={flipModes} style={{cursor: "pointer"}} className="lime-text">
                    Login here</div>
                </div> )
                }
            </form>
        </div>
    );
};

export default Auth;