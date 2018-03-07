import React, {Component} from 'react';
import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';
import { Route, NavLink } from 'react-router-dom';

class Home extends Component {
	render() {
		return(
		 <div className="Home">
			<h4>Create a list of tasks for the day.</h4>
			<h4>Select a task, and apply a timer to it.</h4><hr/>
			
		 	<div className="account-nav">
		 		<NavLink to='/patata/login' activeClassName='selected-account-nav'><button>Log In</button></NavLink>
				<NavLink to='/patata/signup' activeClassName='selected-account-nav'><button>Sign Up</button></NavLink>
			</div>

			<Route exact path='/patata/login' component={LogInForm} />
			<Route exact path='/patata/signup' component={SignUpForm} />
			{/*console.log(this.props.location)*/}
		 </div>
		)
	}
}

export default Home;