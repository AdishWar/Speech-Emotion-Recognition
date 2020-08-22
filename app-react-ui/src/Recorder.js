import React from 'react';

function Recorder() {
    return(
        <>
            <div className='recorder'>
            <div className='play-button-parent-div'>
                <button className='play-button'>
                    {/* <img className='play-button-img' src='play-button.png' /> */}
                    <i className='play-button-img' class="fa fa-microphone"></i>
                </button>
            </div>
            
            </div>
        </>
    );
}

export default Recorder;
