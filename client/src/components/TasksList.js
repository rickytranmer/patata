import React, {Component} from 'react';

class TasksList extends Component {
	constructor() {
		super();
		this.state = {
			tasks: ''
		}
	}

	componentDidMount() {
	  this.getAllTasks()
	    .then((res)=> {
	    	console.log(res)
	    	this.setState({ tasks: res.reverse() });
	    })
	    .catch((err)=> console.error(err));
	}

	async getAllTasks() {
    const response = await fetch('/api/tasks');
    const body = await response.json();
    if (response.status !== 200) { throw Error(body.message) }
    return body;
  };

	render() {
		return(
		 <div className="TasksList">
			<h3>Task List</h3>
			<ul>
				{this.state.tasks &&
					this.state.tasks.map((task)=> {
						return(
							<li key={task.date}><ul>
								<b>{task.title}</b>
								{ task.description && // Task Description
								 <div>
									<li>&nbsp;<i>Description:</i></li>
									<li>&nbsp;-{task.description}</li>
								 </div>
								}
								<li>&nbsp;<i>Time:</i></li>
								<li>&nbsp;&nbsp;-Estimate: {task.timerEstimate} x {task.timerDefault} = {task.timerEstimate*task.timerDefault}min</li>
								<li>&nbsp;&nbsp;-Actual: &nbsp;&nbsp;&nbsp;&nbsp;{task.timerCount} x {task.timerDefault} = {task.timerCount*task.timerDefault}min</li>
							</ul></li>
						)
					})
				}
			</ul>
		 </div>
		)
	}
}

export default TasksList;