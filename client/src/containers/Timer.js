import React, {Component} from 'react';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timerString: ''
		};
		this.startTimer = this.startTimer.bind(this);
	}

	startTimer() {
		this.props.startTimer();
	}

	render() {
		return (
			<div>
			 <h1 id="timer-string">{ this.props.timerString }</h1>

			 <button id="start-button" onClick={this.startTimer}>
			   Start
			 </button>
			</div>
		)
	}
}

export default Timer;