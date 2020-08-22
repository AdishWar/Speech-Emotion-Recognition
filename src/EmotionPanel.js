import React from 'react';
import EmotionCard from './EmotionCard';
import emotiondata from './EmotionData'

// function now redundant
function emo(data) {
    return(
        <EmotionCard 
            key = {data.id}
            emotion = {data.emotion}
            probability = {data.probability}
        />
    );
}

function EmotionPanel() {
    return(
        <>
            <div className='emotion-panel'>
                {
                /* <EmotionCard emotion='happiness' probability='0.9' />
                { emo(emotiondata[1]) }
                { emo(emotiondata[2]) }
                { emo(emotiondata[3]) }
                { emo(emotiondata[4]) }
                { emo(emotiondata[5]) } */
                }

                {
                    emotiondata.map( (data) =>
                    <EmotionCard 
                        key = {data.id}
                        emotion = {data.emotion}
                        probability = {data.probability}
                    />
                    )
                }
            </div>
        </>
    );
}

export default EmotionPanel;