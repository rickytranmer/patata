import React, {Component} from 'react';

class TaskForm extends Component {
	onFormSubmit(event) {
		event.preventDefault();
		let newTask = {
			title: event.target.taskTitle.value,
			description: event.target.taskDescription.value || null,
			timerDefault: event.target.timerLength.value,
			timerEstimate: event.target.timerEstimate.value || '1',
			timerCount: '0',
			date: new Date()
		};
		console.log(newTask);

		// POST route to server
		fetch('https://patata-api.herokuapp.com/api/task', {
		  method: 'POST',
		  headers: {
		  	'Content-Type': 'application/json'
			},
			mode: 'CORS',
		  body: JSON.stringify(newTask)
		})
     .catch((err)=> console.error(err))
     .then((res)=> window.location.replace("/patata/task/list"));
	}

	render() {
		return (
			<div className="TaskForm">
				<form className="task-form" onSubmit={(event)=> this.onFormSubmit(event)}>
					<label htmlFor="task-title">-Title-</label>
					<input type="text" id="task-title" name="taskTitle" maxLength="144" required />

					<div className="estimates">
						<label htmlFor="timer-length">&nbsp;-Timer Length (minutes)-
						<input type="number" id="timer-length" name="timerLength" maxLength="10" defaultValue="25" required /></label>
						<label htmlFor="timer-estimate">&nbsp;-Estimated Timer Count-
						<input type="number" id="timer-estimate" name="timerEstimate" maxLength="10" placeholder="2 (2 x 25min = 50min)" /></label>
					</div>

					<label htmlFor="task-description">-Description-</label>
					<textarea id="task-description" name="taskDescription" maxLength="256" placeholder="Optional description." />

					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default TaskForm;