import React, {Component} from 'react';
import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';
import { Route, NavLink } from 'react-router-dom';
import {auth} from '../firebase';

class Home extends Component {

	logOut() {
		auth.userSignOut();
	}

	render() {
		return(
		 <div className="Home">
			<h4>Create a list of tasks for the day.</h4>
			<h4>Select a task, and apply a timer to it.</h4><hr/>
			
			{ !this.props.authUser &&
			 <div>
			 	<div className="account-nav">
			 		<NavLink to='/login' activeClassName='selected-account-nav'><button>Log In</button></NavLink>
					<NavLink to='/signup' activeClassName='selected-account-nav'><button>Sign Up</button></NavLink>
				</div>

				<Route exact path='/login' component={LogInForm} />
				<Route exact path='/signup' component={SignUpForm} />
			 </div>
			}
			 	
			{ this.props.authUser &&
			 <div>
			 	<h2>{this.props.authUserEmail}</h2>
			 	
			 	<div className="account-nav">
			 		<button onClick={this.logOut}>Log Out</button>
			 	</div>
			 </div>
			}
		 </div>
		)
	}
}

export default Home;