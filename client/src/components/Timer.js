import React, {Component} from 'react';
import BreakMenu from './BreakMenu'

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timerString: ''
		};
		this.startTimer = this.startTimer.bind(this);
	}

	componentDidMount() {
	  document.getElementById('start-button').style.backgroundColor = 'green';
	}

	startTimer() {
		this.props.startTimer();
	}

	render() {
		return (
		 <div>
			<div className="Timer">
			 <h1 id="timer-string">{ this.props.timerString }</h1>

			 <button id="start-button" onClick={this.startTimer}>
			   Start
			 </button>
			</div>

			{/*
				Timer Display
				Select Task
				New Task
				External Timer

				timerMode:
					Timer
					Ended
					Stopped
			*/}

			{this.props.timerString==='00m 00s' &&
				<BreakMenu />
			}
		 </div>
		)
	}
}

export default Timer;