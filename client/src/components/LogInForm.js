import React, {Component} from 'react';
import {auth} from '../firebase';

class SignUpForm extends Component {
	onFormSubmit(event) {
		document.querySelector('.user-submit').disabled = true;
		console.log('form submit');
		event.preventDefault();
		let password = event.target.password.value;
		let email = event.target.email.value;

		auth.signInWithEmail(email, password)
		 .catch((error)=> {
			console.log(error);
			document.getElementById('message-p').innerHTML = error.message;
		 })
		 .then((user)=> {
		 	if(user) { console.log(user.email) }
		 	document.querySelector('.user-submit').disabled = false;
		 });
		document.querySelector('.login-form').reset();
	}


	render() {
		return (
			<div className="SignUpForm">
				<form className="login-form" onSubmit={(event)=> this.onFormSubmit(event)}>
					<label htmlFor="email">-Email-</label>
					<input type="email" id="email-input" name="email" maxLength="50" required />

					<label htmlFor="password">-Password-</label>
					<input type="password" id="password-input" name="password" maxLength="50" required />

					<button className="user-submit" type="submit">Submit</button>
				
					<p id="message-p"></p>
				</form>
			</div>
		)
	}
}

export default SignUpForm;