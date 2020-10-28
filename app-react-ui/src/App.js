import React from 'react';
import Recorder from './Recorder';
// import EmotionPanel from './EmotionPanel';
import SelectFilePanel from './SelectFilePanel';
import OutputPanel from './OutputPanel';


function App() {
  return(
    <>
		<Recorder />
		<div className='bottom-part'>
			{/* <EmotionPanel /> */}
			<SelectFilePanel />
			<OutputPanel />
		</div>
    </>
  );
}

export default App;
