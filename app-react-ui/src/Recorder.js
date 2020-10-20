import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
// import AudioRecorder from 'react-audio-recorder';
import AudioRecorder from 'react-audio-recorder-wavdownloader';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
		  isRecording: false,
		  blob:'',
          blobURL: '',
          isBlocked: false,
        };
      }
    
      start = () => {
        if (this.state.isBlocked) {
          alert('Permission Denied');
        } else {
          Mp3Recorder
            .start()
            .then(() => {
              this.setState({ isRecording: true });
            }).catch((e) => console.error(e));
        }
	  };
    
      stop = () => {
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
			// console.log(await blob.text())
			// console.log(reader.readAsArrayBuffer(blob))
			const blobURL = URL.createObjectURL(blob)
			this.setState({ blobURL, isRecording: false, blob:blob });
          }).catch((e) => console.log(e));
      };
    
      componentDidMount() {
        navigator.getUserMedia({ audio: true },
          () => {
            console.log('Permission Granted');
            this.setState({ isBlocked: false });
          },
          () => {
            console.log('Permission Denied');
            this.setState({ isBlocked: true })
          },
        );
      }

    render() {
        return(
            <div className='recorder'>
                <h1 className='header'>Speech Emotion Recognition</h1>
				<p>{this.state.blobURL}</p>
				{/* <p>{console.log(this.state.blob.prototype.type)}</p> */}
                <div className='play-button-parent-div'>
					<button className="play-button" onClick={(this.state.isRecording) ? (this.stop) : (this.start) }>
						{
							(this.state.isRecording)?
							(<i className='play-button-img' className="fa fa-stop"></i>):
							(<i className='play-button-img' className="fa fa-microphone"></i>)
						}
					</button>
          <AudioRecorder 
            downloadable = 'true'
            filename='output.wav'
            
          />
                </div>
                <div className='audio-player-div'>
                    <audio className='audio-player' src={this.state.blobURL} controls="controls" />
                </div>
            </div>
        );
    }
}

export default Recorder;
