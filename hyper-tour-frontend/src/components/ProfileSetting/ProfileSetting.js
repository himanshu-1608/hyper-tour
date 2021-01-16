import React, { useEffect, useState } from 'react';

import './ProfileSetting.css';

const ProfileSetting = (props) => {

    const [editMode, setEditMode] = useState(true);
    const [inpEmail, setInpEmail] = useState('');
    const [inpPrevPass, setInpPrevPass] = useState('');
    const [inpNewPass, setInpNewPass] = useState('');

    useEffect(()=>{
        setInpEmail('ydv1608@gmail.com');
    },[]);

    const emailChangeHandler = (e) => {
        setInpEmail(e.target.value);
    };

    const previousPasswordHandler = (e) => {
        setInpPrevPass(e.target.value);
    };

    const newPasswordHandler = (e) => {
        setInpNewPass(e.target.value);
    };

    return (
    <div id="profile-setting" className={`col l9`}>
        <h4 className="white-text center-align"><strong>
            Profile Settings
        </strong></h4>
        <h5 className="white-text">User Name</h5>
        <h6 className="grey-text">
            himanshu-1608
            {editMode &&
                <span> (non-editable)</span>
            }
        </h6>
        {!editMode &&
        <div>
            <h5 className="white-text">Profile Photo</h5>
            <img src="https://raw.githubusercontent.com/himanshu-1608/hello-world/master/IMG_20200607_225558.jpg" width="200px" />
        </div>
        }
        {editMode &&
        <div>
            <h5 className="white-text">Change Profile Photo</h5>
            <input type="file" accept=".jpg,.png,.jpeg"/>
        </div>
        }
        {!editMode &&
        <div>
            <h5 className="white-text">Email ID</h5>
            <h6 className="grey-text">ydv1608@gmail.com</h6>
        </div>
        }
        {editMode &&
        <div>
            <h5 className="white-text">Change Email ID</h5>
            <input type="email" className="white-text" onChange={emailChangeHandler} value={inpEmail}/>
        </div>
        }
        {!editMode &&
        <div>
            <h5 className="white-text">Password</h5>
            <h6 className="grey-text">********</h6>
        </div>
        }
        {editMode &&
        <div>
            <h5 className="white-text">To Change Password:</h5>
            <h5 className="white-text">Previous Password</h5>
            <input type="password" className="white-text" onChange={previousPasswordHandler} value={inpPrevPass}/>
            <h5 className="white-text">New Password</h5>
            <input type="password" className="white-text" onChange={newPasswordHandler} value={inpNewPass}/>
        </div>
        }
        {
        editMode &&
        <div>
            <button className="grey black-text waves-effect">Save</button>
             
            <button className="grey black-text waves-effect">Cancel</button>
        </div>
        }
    </div>
    );
};

export default ProfileSetting;