import React from 'react';

function EmotionCard(props) {
    return(
        <>
            <div className='emotion-card'>
                <p> {props.emotion} : {props.probability} </p>
            </div>
        </>
    );
}

export default EmotionCard;