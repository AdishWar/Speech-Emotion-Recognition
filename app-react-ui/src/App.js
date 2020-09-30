import React from 'react';
import Recorder from './Recorder';
import EmotionPanel from './EmotionPanel';
// import OutputPanel from './OutputPanel';
import OutputPanelClass from './OutputPanelClass';

function App() {
  return(
    <>
		
		<Recorder />
		<div className='bottom-part'>
			<EmotionPanel />
			<OutputPanelClass />
		</div>
    </>
  );
}

export default App;
