import React, {Component} from 'react';
import * as firebase from 'firebase';

class SignUpForm extends Component {
	onFormSubmit(event) {
		console.log('form submit');
		event.preventDefault();
		if((event.target.password1.value === event.target.password2.value) && (event.target.password1.value.length >= 6)) {
			let password = event.target.password1.value;
			let email = event.target.email.value;

			firebase.auth().createUserWithEmailAndPassword(email, password)
			 .catch((error)=> {
			  console.log(error);
			 })
			 .then((user)=> {
			 	console.log(user);
			 });
			document.querySelector('.signup-form').reset();
		} else {
			document.getElementById('message-p').innerHTML = 'The passwords need to match and be 6 characters long.';
		}
	}

		// 	//DEPRECATED POST route to heroku using fetch
		// 	fetch('https://patata-api.herokuapp.com/api/user', {
		// 	  method: 'POST',
		// 	  headers: {
		// 	  	'Content-Type': 'application/json'
		// 		},
		// 		mode: 'CORS',
		// 	  body: JSON.stringify(newUser)
		// 	})
	 //     .catch((err)=> console.error(err))
	 //     .then((res)=> {
	 //     	console.log(res);
	 //     	let attempts = 0;
	 //     	let thisInterval = setInterval(()=> {
	 //     		if(res || attempts > 5) {
	 //     			clearInterval(thisInterval);
	 //     			console.log('end');
	 //     			console.log(res);
	 //     		} else {
	 //     			attempts++;
	 //     			console.log('no res');
	 //     		}
	 //     	}, 1000);
	 //  		// window.location.replace("/patata");
	 //   	 });
		// }  else {
		// 	event.target.password1.placeholder = 'Passwords must match';
		// } // tell user if username is taken
// action="https://patata-api.herokuapp.com/api/user" method="POST" 

	render() {
		return (
			<div className="SignUpForm">
				<form className="signup-form" onSubmit={(event)=> this.onFormSubmit(event)}>
					<label htmlFor="email">-Usernames-</label>
					<input type="email" id="email-input" name="email" maxLength="50" required />

					<label htmlFor="password1">-Password-</label>
					<input type="password" id="password-input-1" name="password1" maxLength="50" required />

					<label htmlFor="password2">-Retype Password-</label>
					<input type="password" id="password-input-2" name="password2" maxLength="50" required />

					<button type="submit">Submit</button>

					<p id="message-p"></p>
				</form>
			</div>
		)
	}
}

export default SignUpForm;