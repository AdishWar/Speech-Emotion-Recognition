import React, { useState } from 'react';

export default function SelectFilePanel() {

    const [fetching, setFetching] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setFetching(true)
        const data = new FormData(e.target) 
    
        fetch('/api/send_soundfile', {
            method: 'POST',
            body: data
        })
        .then(res => {
            console.log(res)
            setFetching(false)
        })
        .catch((e) => console.log("err", e))
    
        e.target.reset()
    }

    return(
        <div className="select-file-panel">
            <form onSubmit={handleSubmit} className='select-file-form'>
                <input type="file" name="file" accept='.mp3,.wav' />
                <input 
                    type='submit' 
                    id="fetch-button" 
                    className={(fetching)?('button-fetching'):('button-ready')}
                    disabled = {fetching}
                    value= { (fetching) ? ("Uploading...") : ("Upload") }
                />
            </form>
        </div>
    );
}