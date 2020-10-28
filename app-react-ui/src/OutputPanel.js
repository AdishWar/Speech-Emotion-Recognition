import React, { useState } from 'react';

export default function OutputPanel() {

    const [emotion, setEmotion] = useState('Click below')
    const [fetching, setFetching] = useState(false)

    function buttonClick() {
        setFetching(true)
        fetch('/api/get_file_format')
        .then(res => res.json())
        .then(function(data) {
            const file_format = data['file_format']

            if (file_format == 'wav'){
                fetch('/api/data_wav')
                .then(response => response.json())
                .then(response => {
                    setEmotion(response.prediction)
                    setFetching(false)
                });
            }

            if (file_format == 'mp3') {
                fetch('/api/data_mp3')
                .then(response => response.json())
                .then(response => {
                    setEmotion(response.prediction)
                    setFetching(false)
                });
            }

            if (file_format == 'no_file') {
                setEmotion("error: no wav or mp3 files uploaded")
                setFetching(false)
            }
        })
        .catch( e => console.log(e) )
    }

    return(
        <div className='output-panel'>
            <h1>{emotion}</h1>
            <button 
                id='fetch-button' 
                className={(fetching)?('button-fetching'):('button-ready')}
                disabled = {fetching}
                onClick={buttonClick}>
                    {(fetching)?('Fetching...'):('Check')}
            </button>
        </div>
    );
}