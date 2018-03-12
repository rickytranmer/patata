import React, {Component} from 'react';

class SignUpForm extends Component {
	onFormSubmit(e) {
		e.preventDefault();
		let newUser = {
			
		};
		console.log(newUser);

		// POST route to server
		// fetch('https://patata-api.herokuapp.com/api/user', {
		//   method: 'POST',
		//   headers: {
		//   	'Content-Type': 'application/json'
		// 	},
		// 	mode: 'CORS',
		//   body: JSON.stringify(newUser)
		// })
  //    .catch((err)=> console.error(err))
  //    .then((res)=> window.location.replace("/patata"));
	}

	render() {
		return (
			<div className="SignUpForm">
				<form className="login-form" onSubmit={(event)=> this.onFormSubmit(event)}>
					<label htmlFor="username">-Username-</label>
					<input disabled placeholder="Coming Soon" type="text" id="username-input" name="username" maxLength="50" required />

					<label htmlFor="password">-Password-</label>
					<input disabled type="password" id="password-input" name="password" maxLength="50" required />

					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default SignUpForm;