import React, {Component} from 'react';

class TasksList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: '',
			selectedTask: '',
			mode: ''
		}
	}

	componentDidMount() {
	  this.getAllTasks()
	    .then((res)=> { this.setState({ tasks: res.reverse() }) })
	    .catch((err)=> console.error(err));
	  this.props.mode ? this.setState({mode: this.props.mode}) : this.setState({mode: 'List'});
	  this.props.selectedTask ? this.setState({selectedTask: this.props.selectedTask}) : this.setState({selectedTask: ''});
	}

	componentDidUpdate() {
		let differentTask = document.getElementById('different-task')||null;
		if(this.state.selectedTask && differentTask) { differentTask.style.display = 'inline' }
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
			<h3>Task {this.state.mode}</h3>
			<ul id="task-list">
				{this.state.tasks &&
					this.state.tasks.map((task)=> {
						return(
						 <div key={task.date}>	
							{/* LIST MODE */}
							{ this.state.mode==="List" &&
							 <li id={task.date}>
								<ul>
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
								</ul>
							 </li>
							}

							{/* SELECT MODE */}
							{ this.state.mode==="Select" && !this.state.selectedTask &&
							 <li id={task.date}>
								<button className="task-buttons" onClick={()=> this.props.updateSelectedTask(task.date)}><b>- {task.title}</b></button>
							 </li>
							}

							{/* SELECTED TASK */}
							{ this.state.selectedTask && this.state.selectedTask===task.date &&
							 <li id={task.date}>
								<button onClick={()=> this.props.updateSelectedTask(task.date)}><b>- {task.title}</b></button>
							 </li>
							}
						 </div>
						)
					})
				}
			</ul>
			<button id="different-task" onClick={()=> this.props.updateSelectedTask(null)}>Select Different Task</button>
		 </div>
		)
	}
}

export default TasksList;