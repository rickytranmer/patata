import React, {Component} from 'react';
import BreakMenu from './BreakMenu'

class Timer extends Component {
	render() {
		return (
		 <div>
			<div className="Timer">
				<h1 role="timer" id="timer-string">{ this.props.timerString }</h1>
				{ this.props.timerString !== '00m 00s' &&
					<button id="start-button" onClick={this.props.startTimer}>
						Start
					</button>
				}
			</div>
			
			<hr />

			{this.props.timerString==='00m 00s' &&
				<BreakMenu {...this.props} />
			}
		 </div>
		)
	}
}

export default Timer;