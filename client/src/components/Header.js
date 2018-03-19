import React, {Component} from 'react';
import { NavLink, Link } from 'react-router-dom';
import potato from '../potato.svg';

class Header extends Component {
	render() {
		return (
		 <div>
			  {/* Router nav bar
			    Timer
			      -select task
			      -new task
			      -timer display
			    Agenda
			      -add task
			      -edit task
			      -remove task
			    Task List
			      -new task
			      -edit task
			      -delete task

			      Routes not in nav bar
			    New Task
			    View Task (edit & delete)
			  */}
			<nav>	
			  <NavLink to='/patata/task' activeClassName='selected-nav'><Link to='/patata/task/list'>Tasks</Link></NavLink>
			  <NavLink to='/patata/agenda' activeClassName='selected-nav'>Agenda</NavLink>
			  <NavLink to='/patata/timer' activeClassName='selected-nav' id='timer-nav'>Timer</NavLink>
			</nav>

			<header className="App-header">
			  <img src={ potato } className="App-logo" alt="logo" />
		  	<Link to='/patata' className="App-title">Patata</Link>
			  <img src={ potato } className="App-logo" alt="logo" />
			</header>
		 </div>
		)
	}
}

export default Header;