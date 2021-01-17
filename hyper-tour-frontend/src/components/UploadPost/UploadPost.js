import React, { useEffect, useRef, useState, useContext } from 'react';

import './UploadPost.css';

import AuthContext from '../../context/auth-context';

const UploadImage = (props) => {

    const auth = useContext(AuthContext);
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState('');
    const [posted, setPosted] = useState(false);
    const [uploadUrl, setUploadUrl] = useState('');

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

    const pickedHandler = event => {
        let pickedFile;
        if(event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            return;
        }
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    let response, responseData;
    const submitPostHandler = async(e) => {
        e.preventDefault();
        console.log("working front");
        const formData = new FormData();
        formData.append('image', file);
        try{
            response = await fetch('http://localhost:5000/api/posts/create',{
                        method: 'POST',
                        headers: { 
                        authorization: `Bearer ${auth.token}`
                        },
                        body: formData
                    });
            responseData = await response.json();
            console.log(responseData);
            setUploadUrl(responseData.imgLink);
            setPosted(true);
        } catch(e) {
            console.log("Error occured: "+ e);
        }
    };

    return (
        <div id="upload-post" className={`col l9`}>
        {posted && 
            <div className="center-align">
                <h3 className="orange-text">Post Created Successfully!!!</h3>
                <img  style={{maxWidth: "550px", maxHeight: "500px"}} src={`http://localhost:5000/${uploadUrl}`} />
            </div>
        }
        {!posted &&
        <form onSubmit={submitPostHandler}>
        <div>
            <h4 className="white-text"><strong>
                Share your life event
            </strong></h4>
            <div>
                <input type="file" accept=".jpg,.png,.jpeg" ref={filePickerRef} style={{display:"none"}} onChange={pickedHandler} />
            </div>
            <div className="center-align">
            {previewUrl &&
                <img id="preview-img" src={previewUrl} alt="Preview"/>
            }
            {!previewUrl &&
                <h3 className="white-text center-align">Preview Here</h3>
            }
            </div>
            <div className="container center-align">
            {!previewUrl &&
                <button type="button" className="image-picker-btn blue" onClick={pickImageHandler} >Pick an image</button>
            }
            {previewUrl &&
            <div>
                <button type="button" className="image-picker-btn blue" onClick={pickImageHandler} >Pick another image</button>
                <button type="submit" className="image-picker-btn blue">Upload</button>
            </div>
            }
            </div>
        </div>
        </form>
        }
      </div>
    );
};

export default UploadImage;