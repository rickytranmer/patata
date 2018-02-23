import React, {Component} from 'react';
import './TaskForm.css';

class TaskForm extends Component {
	onFormSubmit(event) {
		event.preventDefault();
		console.log(event);
	}

	render() {
		return (
			<div>
				<h3>New Task</h3>
				<form className="task-form" onSubmit={(event)=> this.onFormSubmit(event)}>
					<label htmlFor="task-title">-Title-</label>
					<input type="text" id="task-title" name="taskTitle" maxLength="50" required/>
					
					<label htmlFor="task-description">-Description-</label>
					<textarea id="task-description" name="taskDescription" maxLength="256"/>

					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default TaskForm;