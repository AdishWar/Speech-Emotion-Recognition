import React from 'react';

export default class OutputPanelClass extends React.Component {

    state = {
        "name": "Adish",
        "age": 20,
        "write": 0,
        "emotion": "none",
        "loading": true,
        "buttonStyle": "button-ready",
        "buttonText": "Check"
    }
    
    // we have to use arrow functions if we want to reference "this" inside functions

    async componentDidMount() {
        // const url = "http://localhost:5000/data";
        // const response = await fetch(url);
        // const data = await response.json();
        // console.log(data);
        // this.setState({
        //     'emotion': data.prediction
        // })
    }

    buttonClick = (e) => {
        // const url = "http://localhost:5000/data";
        // const response = await fetch(url);
        // const data = await response.json();
        // console.log(data);
        this.setState({
            buttonStyle: "button-fetching",
            buttonText: "Fetching"
        })
        fetch('http://127.0.0.1:5000/data')
        .then(response => response.json())
        .then(response => {
            this.setState({
                emotion: response.prediction,
                buttonStyle: "button-ready",
                buttonText: "Check"
        });
        });

        // this.setState({
        //     // 'emotion': data.prediction
        //     'emotion':"lodu"
        // })
    }

    render() {
        return(
            <>
                <div className='output-panel'>
                    <h1>Emotion: {this.state.emotion}</h1>
                    <button id='fetch-button' 
                        className={this.state.buttonStyle} 
                        onClick={this.buttonClick}>
                            {this.state.buttonText}
                    </button>
                </div>
            </>
        );
    }
}