import React, {Component} from 'react';
import Timer from '../components/Timer';
import TasksList from '../components/TasksList';

class Timers extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		props.mode ? this.state.mode = this.props.mode : this.state.mode = 'Select';
	}

	render() {
		return(
		 <div className="Timers">
		 	<Timer {...this.props} />
			{ 
				<TasksList {...this.props} {...this.state} />
			}
		 </div>
		)
	}
}

export default Timers;