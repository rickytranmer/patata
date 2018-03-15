import React, {Component} from 'react';

class TasksList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			selectedTask: '',
			mode: ''
		}
	}

	componentDidMount() {
	  this.props.mode ? this.setState({ mode: this.props.mode }) : this.setState({ mode: 'List' });
	  if(this.props.selectedTask) {
	  	this.setState({ selectedTask: this.props.selectedTask });
	  	let differentTask = document.getElementById('different-task')||null;
	  	if(differentTask) { differentTask.style.display = 'inline'; }
	  } else {
	  	this.setState({ selectedTask: '' });
	  }
	  
	  // Grab tasks from localStorage (if they exist), until authUser
	  this.updateTasks(JSON.parse(localStorage.getItem("tasks")||null), false);

  	if(this.props.authUser) {
  		// Grab tasks from Heroku
  		this.getAllTasks()
  		  .then((res)=> { this.updateTasks({ tasks: res }, true) })
  		  .catch((err)=> console.error(err));
  	} else {
			// Same thing, look for authUser two more times
  		setTimeout(()=> {
  			if(this.props.authUser) { 
  				this.getAllTasks()
  				 .then((res)=> { this.updateTasks({ tasks: res }, true) })
  				 .catch((err)=> console.error(err));
  			} else {
  				setTimeout(()=> { this.props.authUser ? this.getAllTasks().then((res)=> { this.updateTasks({ tasks: res }, true) }).catch((err)=> console.error(err)) : console.log('no user detected') }, 333);
  			}
			}, 333);
  	}
	}

	componentDidUpdate() {
		let differentTask = document.getElementById('different-task')||null;
		if(this.state.selectedTask && differentTask) { differentTask.style.display = 'inline' }
	}

	async getAllTasks() {
		//TODO - limit number of (successful?) fetches, would use local instead
		console.log('-getAllTasks');
    const response = await fetch(`https://patata-api.herokuapp.com/api/tasks/${this.props.authUser}`);
    const body = await response.json();
    if (response.status !== 200) { throw Error(body.message) }
    return body;
  };

  updateTasks(tasks, updateLocal) {
  	if(tasks) {
  		if(document.getElementById('loading-h2')) { document.getElementById('loading-h2').remove() }
	  	if(updateLocal) { localStorage.setItem("tasks", JSON.stringify(tasks)) }
	  	this.setState(tasks);
  	} else {
  		console.log('no tasks found');
  	}
  }

  updateSelectedTask(selectedTask) {
  	let tempTask = this.state.selectedTask;
  	this.setState({ selectedTask });
  	if(selectedTask) {
  		this.setState({ mode: 'Selected' });
  	} else {
  		this.setState({ mode: 'Select' });
  		if(this.props.timer[0].start) {
  			this.props.resetTimer();
  			document.getElementById('start-button').innerHTML = 'Restart';
  		}
  	}
  	this.props.updateSelectedTask(selectedTask);
  	// Just the one task still there?  Temporary solution reloads page.
  	// (added to fix issue of not loading all tasks after selecting, changing screens, then deselecting)
  	if(document.getElementById(tempTask)) { window.location.replace("/patata/timer") }
  }

	deleteTask(date) {
		console.log('delete:', date);
		if(this.state.authUser) {
			let deletedTask = { username: this.state.authUser };
		  // PUT route to server
		  fetch(`https://patata-api.herokuapp.com/api/task/${date}`, {
		    method: 'DELETE',
		    headers: {
		      'Content-Type': 'application/json'
		    },
		    mode: 'CORS',
		    body: JSON.stringify(deletedTask)
		  })
		    //TODO - if err, save updatedTask to localStorage (? attempt to save later or keep local ?)
		           //? status of 200 on TasksList, heroku's /api/test, successful updateTasks ?//
		   .catch((err)=> console.error(err))
		   .then((res)=> window.location.replace("/patata/timer"));
		} else {
		  //TODO - save task locally
		  console.log('no user');
		}
	}

	editTask(date) {
		console.log('edit:', date);
	}

	render() {
		return(
		 <div className="TasksList">
			{ this.props.mode &&
				<h3 id="task-mode">Task {this.props.mode}</h3>
			}
			<h2 id="loading-h2">Loading...</h2>
			<ul id="task-list">

				{ this.state.tasks &&
					this.state.tasks.map((task)=> {
						return(
						 <div key={task.date}>	
							{/* LIST MODE */}
							{ this.state.mode==="List" &&
							 <li id={task.date} className="listed-task">
								<ul>
								 	<b>{task.title}</b><button className="delete-task" onClick={()=> this.deleteTask(task.date)}>X</button><span role="img" aria-label="edit button" className="edit-button" onClick={()=> this.editTask(task.date)}>📝</span>
									{ task.description && // Task Description
									 <div>
										<li>&nbsp;<i>Description:</i></li>
										<li>&nbsp;-{task.description}</li>
									 </div>
									}
									<li>&nbsp;<i>Time:</i></li>
									<li>&nbsp;&nbsp;-Estimate: {task.timerEstimate} x {task.timerDefault} = {Math.round(task.timerEstimate*task.timerDefault*100)/100}min</li>
									<li>&nbsp;&nbsp;-Actual: &nbsp;&nbsp;&nbsp;&nbsp;{task.timerCount} x {task.timerDefault} = {Math.round(task.timerCount*task.timerDefault*100)/100}min</li>
								</ul>
							 </li>
							}

							{/* SELECT MODE */}
							{ this.props.mode==="Select" && !this.props.selectedTask &&
							 <li id={task.date} title={task.title} data-timerestimate={task.timerEstimate} data-timerdefault={task.timerDefault} data-timercount={task.timerCount} data-description={task.description}>
								<button id={task.date+'b'} className="task-buttons" onClick={()=> this.props.updateSelectedTask(task.date)}><b>{task.title}</b></button>
							 </li>
							}

							{/* SELECTED TASK */}
							{ this.props.selectedTask && this.props.selectedTask===task.date &&
							 <li id={task.date} data-timerestimate={task.timerEstimate} data-timerdefault={task.timerDefault} data-timercount={task.timerCount} >
								<ul>
								  <b>{task.title}</b>
								 	{ task.description && // Task Description
								 	 <div>
								 		<li>&nbsp;<i>Description:</i></li>
								 		<li>&nbsp;-{task.description}</li>
								 	 </div>
								 	}
								 	<li>&nbsp;<i>Time:</i></li>
								 	<li>&nbsp;&nbsp;-Estimate: {task.timerEstimate} x {task.timerDefault} = {Math.round(task.timerEstimate*task.timerDefault*100)/100}min</li>
								 	<li>&nbsp;&nbsp;-Actual: &nbsp;&nbsp;&nbsp;&nbsp;{task.timerCount} x {task.timerDefault} = {Math.round(task.timerCount*task.timerDefault*100)/100}min</li>
								</ul>							 
							 </li>
							}
							
						 </div>
						)
					})
				}
			</ul>
			{ this.props.selectedTask &&
				<button id="different-task" onClick={()=> this.updateSelectedTask(null)}>Select Different Task</button>
			}
		 </div>
		)
	}
}

export default TasksList;