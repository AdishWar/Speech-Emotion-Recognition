import React, { useState } from 'react';

export default function SelectFilePanel() {

    const [uploading, setUploading] = useState(false)
    const [uploadedIndicator, setUploadedIndicator] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setUploading(true)
        setUploadedIndicator(false)
        const data = new FormData(e.target) 
    
        fetch('/api/send_soundfile', {
            method: 'POST',
            body: data
        })
        .then(res => {
            console.log(res)
            setUploading(false)
            setUploadedIndicator(true)
            e.target.reset()
        })
        .catch((e) => console.log("err", e))
    }

    return(
        <div className="select-file-panel">
            <form onSubmit={handleSubmit} className='select-file-form'>
                <input type="file" name="file" accept='.mp3,.wav' />
                <input 
                    type='submit' 
                    id="fetch-button" 
                    className={(uploading)?('button-fetching'):('button-ready')}
                    disabled = {uploading}
                    value= { (uploading) ? ("Uploading...") : ("Upload") }
                />
            </form>
            { 
                (uploadedIndicator)?
                (<div className='file-uploaded-indicator'>Uploaded <i className="fa fa-check-circle" aria-hidden="true"></i></div>) :
                ("")
            }
        </div>
    );
}