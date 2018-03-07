import React, {Component} from 'react';
	
class BreakMenu extends Component {
	render() {
		return (
			<div className="BreakMenu"><br/>
				<h3>Time to take a break, you've earned it!</h3><br/>
				<h3>(recommended 3-5 minutes)</h3><br/>

				{ this.props.selectedTask &&
					<button >Add to Timer Count</button>
				}

				{ !this.props.selectedTask &&
					<p>Select a task</p>
				}

				<br/><hr/>
			</div>
		)
	}
}

export default BreakMenu;