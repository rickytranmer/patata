import React, {Component} from 'react';
import './TaskForm.css';

class SignUpForm extends Component {
	onFormSubmit(e) {
		e.preventDefault();
		let newUser = {
			
		};
		console.log(newUser);

		// POST route to server
		fetch('https://patata-api.herokuapp.com/api/user', {
		  method: 'POST',
		  headers: {
		  	'Content-Type': 'application/json'
			},
			mode: 'CORS',
		  body: JSON.stringify(newUser)
		})
     .catch((err)=> console.error(err))
     .then((res)=> window.location.replace("/patata"));
	}

	render() {
		return (
			<div className="SignUpForm">
				<form className="task-form" onSubmit={(event)=> this.onFormSubmit(event)}>
					<label htmlFor="username">-Username-</label>
					<input disabled placeholder="Coming Soon" type="text" id="username-input" name="username" maxLength="50" required />

					<label htmlFor="password1">-Password-</label>
					<input disabled placeholder="Coming Soon" type="password" id="password-input-1" name="password1" maxLength="50" required />

					<label htmlFor="password2">-Retype Password-</label>
					<input disabled placeholder="Coming Soon" type="password" id="password-input-2" name="password2" maxLength="50" required />

					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default SignUpForm;