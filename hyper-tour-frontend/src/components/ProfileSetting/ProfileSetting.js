import React, { useContext, useEffect, useState } from 'react';

import './ProfileSetting.css';
import AuthContext from '../../context/auth-context';

const ProfileSetting = (props) => {

    const auth = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [inpPrevPass, setInpPrevPass] = useState('');
    const [inpNewPass, setInpNewPass] = useState('');
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState('');
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [authError, setAuthError] = useState('');
    const [stateChanged, setStateChanged] = useState(false);
    const [errorField, setErrorField] = useState(false);
    const [successPassword, setSuccessPassword] = useState(false);

    let response, responseData;
    const pickedHandler = event => {
        let pickedFile;
        if(event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            return;
        }
    };

    useEffect(()=> {
        if(!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", function () {
            setPreviewUrl(fileReader.result);
        }, false);
        fileReader.readAsDataURL(file);
    }, [file]);

    const previousPasswordHandler = (e) => {
        setInpPrevPass(e.target.value);
        setErrorField(false);
        setSuccessPassword(false);
    };

    const newPasswordHandler = (e) => {
        setInpNewPass(e.target.value);
    };

    const flipMode = () => setEditMode(!editMode);

    const submitImageHandler = async() => {
        const formData = new FormData();
        formData.append('image', file);
        response = await fetch(`http://localhost:5000/api/users/updateImage`,{
            method: "POST",
            headers:{
              authorization: `Bearer ${auth.token}`
            },
            body: formData
        });
        if(response.ok) {
            const responseData = await response.json();
            setPreviewUrl('');
            setFile();
            setStateChanged(!stateChanged);
            props.updateDashBoard();
        } else {
            responseData = await response.json();
            setAuthError(responseData.message);
        }
    };

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
              setUserEmail(responseData.user.email);
            } else {
              responseData = await response.json();
              setAuthError(responseData.message);
            }
        }
        findUserData();    
    },[stateChanged]);

    const changePasswordHandler = async() => {
        response = await fetch(`http://localhost:5000/api/users/updatePassword`,{
            method: "POST",
            headers:{
                authorization: `Bearer ${auth.token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                oldPassword: inpPrevPass,
                newPassword: inpNewPass
            })
        });
        if(response.ok) {
            setInpNewPass('');
            setInpPrevPass('');
            const responseData = await response.json();
            console.log(responseData);
            setErrorField(false);
            setSuccessPassword(true);
        } else {
            responseData = await response.json();
            setAuthError(responseData.message);
            setErrorField(true);
            setSuccessPassword(false);
        }
    }

    return (
    <div id="profile-setting" className={`col l9`}>
        <h4 className="white-text center-align"><strong>
            Profile Settings
        </strong></h4>
        <h5 className="white-text">User Name</h5>
        <h6 className="grey-text">
            {userName}
            {editMode &&
                <span> (non-editable)</span>
            }
        </h6>
        {!editMode &&
        <div>
            <h5 className="white-text">Profile Photo</h5>
            <img src={`http://localhost:5000/${userImage}`} width="200px" />
        </div>
        }
        {editMode &&
        <div>
            <h5 className="white-text">Change Profile Photo</h5>
            <input type="file" accept=".jpg,.png,.jpeg" onChange={pickedHandler}/>
        </div>
        }
        {editMode && previewUrl.length>0 &&
        <div>
            <img style={{marginTop: "20px"}} src={previewUrl} width="200px" />
            <button onClick={submitImageHandler} style={{display: "block"}} className="settings-btn black white-text">Save as Profile Photo</button>
        </div>
        }
        <div>
            <h5 className="white-text">Email ID</h5>
            <h6 className="grey-text">
                {userEmail}
                {editMode &&
                <span> (non-editable)</span>
                }
            </h6>
        </div>
        
        {editMode &&
        <div>
            <h5 className="white-text">To Change Password:</h5>
            <h5 className="white-text">Previous Password</h5>
            <input type="password" className="white-text" onChange={previousPasswordHandler} value={inpPrevPass}/>
            <h5 className="white-text">New Password</h5>
            <input type="password" className="white-text" onChange={newPasswordHandler} value={inpNewPass}/>
            {errorField &&
            <div><span className="lime-text">Incorrect Credentials</span></div>
            }
            {successPassword &&
                <div><span className="lime-text">Password Changed Successfully</span></div>
            }
        </div>
        }
        {
        editMode &&
        <div>
            <button onClick={changePasswordHandler} className="settings-btn green black-text waves-effect">Update Password</button>
            <button onClick={flipMode} className="settings-btn red black-text waves-effect">Cancel</button>
        </div>
        }
        {!editMode && 
        <div>
            <button onClick={flipMode} className="settings-btn grey lighten-2 black-text waves-effect">Edit Details</button>
        </div>
        }
    </div>
    );
};

export default ProfileSetting;