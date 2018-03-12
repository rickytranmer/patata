import React, {Component} from 'react';

class SignUpForm extends Component {
	onFormSubmit(event) {
		event.preventDefault();
		if(event.target.password1.value === event.target.password2.value) {
			let password = event.target.password1.value;
			let newUser = {
				username: event.target.username.value,
				password
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
	     .then((res)=> {
	     	console.log(res);
	  		window.location.replace("/patata");
	   	 });
		}  else {
			event.target.password1.placeholder = 'Passwords must match';
		} // tell user if username is taken
		document.querySelector('.signup-form').reset();
	}

	render() {
		return (
			<div className="SignUpForm">
				<form className="signup-form" onSubmit={(event)=> this.onFormSubmit(event)}>
					<label htmlFor="username">-Username-</label>
					<input type="text" id="username-input" name="username" maxLength="50" required />

					<label htmlFor="password1">-Password-</label>
					<input type="password" id="password-input-1" name="password1" maxLength="50" required />

					<label htmlFor="password2">-Retype Password-</label>
					<input type="password" id="password-input-2" name="password2" maxLength="50" required />

					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default SignUpForm;