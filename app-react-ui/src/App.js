import React from 'react';
import Recorder from './Recorder';
import EmotionPanel from './EmotionPanel';
import OutputPanel from './OutputPanel';

function App() {
  return(
    <>
		
		<Recorder />
		<div className='bottom-part'>
			<EmotionPanel />
			<OutputPanel />
		</div>
    </>
  );
}

export default App;
