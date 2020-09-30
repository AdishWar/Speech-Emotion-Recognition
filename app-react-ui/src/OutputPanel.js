import React, {useState, useEffect} from 'react';

function OutputPanel() {

    const [currentTime,  setCurrentTime] = useState(0);

    useEffect(() => {
        fetch('127.0.0.1:5000/data').then(res => res.json()).then(data => {
            setCurrentTime(data.prediction);
        });
    });

    return(
        <>
            <div className='output-panel'>
                <h1>Emotion: Happiness</h1>
                <p>The current time is : {currentTime}</p>
            </div>
        </>
    );
}

export default OutputPanel;