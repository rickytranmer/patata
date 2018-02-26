import React, {Component} from 'react';
import Timer from '../components/Timer';

class Timers extends Component {
	constructor() {
		super();

		this.state = {
			mode: '',
			task: ''
		};

		this.timerMode = this.timerMode.bind(this);
	}

	timerMode() {
		this.setState({mode: 'timer'});
		this.setState({task: 'timer test timer test timer test timer test timer test timer test '});
	}

	render() {
		return(
		 <div className="Timers">
		 	{ !this.state.task &&
		 		<button id="select-task" onClick={this.timerMode}>Select</button>
		 	}
		 	{/* OR */}
		 	{ this.state.task &&
		 		<button id="select-task" onClick={this.timerMode}>{this.state.task}</button>
		 	}

		 	{ this.state.mode === "timer" &&
		 		<Timer startTimer={this.startTimer} {...this.props}/>
			}
		 </div>
		)
	}
}

export default Timers;