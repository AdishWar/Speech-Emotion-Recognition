import React from 'react';
import Recorder from './Recorder';
import EmotionPanel from './EmotionPanel';
import OutputPanel from './OutputPanel';

function App() {
  return(
    <>
		<h1 className='header'>Speech Emotion Recognition</h1>
		<Recorder />
		<div className='bottom-part'>
			<EmotionPanel />
			<OutputPanel />
		</div>
    </>
  );
}

export default App;
