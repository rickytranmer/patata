import React, {Component} from 'react';
import './TaskForm.css';

class TaskForm extends Component {
	onFormSubmit(event) {
		event.preventDefault();
		let newTask = {
			title: event.target.taskTitle.value,
			description: event.target.taskDescription.value,
			date: new Date()
		};
		console.log(newTask);

		// POST route to server
		fetch('http://localhost:5000/api/task', {
		  method: 'POST',
		  headers: {
		  	'Content-Type': 'application/json'
			},
			mode: 'CORS',
		  body: JSON.stringify(newTask)
		})
     .then((res)=> console.log('POST status:', res.statusText))
     .catch((err)=> console.error(err));
	}

	render() {
		return (
			<div className="TaskForm">
				<h3>New Task</h3>
				<form className="task-form" onSubmit={(event)=> this.onFormSubmit(event)}>
					<label htmlFor="task-title">-Title-</label>
					<input type="text" id="task-title" name="taskTitle" maxLength="50" required />

					<label htmlFor="task-description">-Description-</label>
					<textarea id="task-description" name="taskDescription" maxLength="256" />

					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default TaskForm;