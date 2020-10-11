import React from 'react';

export default class OutputPanelClass extends React.Component {

    state = {
        emotion: "Click below",
        fetching: false
    }

    // we have to use arrow functions if we want to reference "this" inside functions
    // using arrow functions binds the "this" variable to the current class
    buttonClick = (e) => {
        this.setState({ fetching: true })

        fetch('/api/data')
        .then(response => response.json())
        .then(response => {
            this.setState({
                emotion: response.prediction,
                fetching: false
            });
        });
    }

    render() {
        return(
            <div className='output-panel'>
                <h1>{this.state.emotion}</h1>
                <button 
                    id='fetch-button' 
                    className={(this.state.fetching)?('button-fetching'):('button-ready')}
                    disabled = {this.state.fetching}
                    onClick={this.buttonClick}>
                        {(this.state.fetching)?('Fetching...'):('Check')}
                </button>
            </div>
        );
    }
}