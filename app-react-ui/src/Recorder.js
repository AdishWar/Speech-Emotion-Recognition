import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class Recorder extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
          isRecording: false,
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
            const blobURL = URL.createObjectURL(blob)
            this.setState({ blobURL, isRecording: false });
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
                <div className='play-button-parent-div'>
					
					<button className="play-button" onClick={(this.state.isRecording) ? (this.stop) : (this.start) }>
						{
							(this.state.isRecording)?
							(<i className='play-button-img' className="fa fa-stop"></i>):
							(<i className='play-button-img' className="fa fa-microphone"></i>)
						}
					</button>

                </div>
                <div className='audio-player-div'>
                    <audio className='audio-player' src={this.state.blobURL} controls="controls" />
                </div>
            </div>
        );
    }
}

export default Recorder;
