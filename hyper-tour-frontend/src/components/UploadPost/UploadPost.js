import React, { useEffect, useRef, useState, useContext } from 'react';

import './UploadPost.css';

const UploadImage = (props) => {

    // const auth = useContext(AuthContext);
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [posted, setPosted] = useState(false);

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

    const submitPostHandler = async(e) => {
        e.preventDefault();
        let postData;
        const formData = new FormData();
        formData.append('image', file);
        setPosted(true);
    };

    return (
        <div id="upload-post" className={`col l9`}>
        {posted && 
        <h3 className="center-align yellow-text">Post Created Successfully!!! <br />Watch your post <a className="pink-text" href={`/profile/himanshu-1608`}>here</a></h3>
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