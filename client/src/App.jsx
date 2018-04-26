import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Tasks from './containers/Tasks';
import Timers from './containers/Timers';
import Home from './containers/Home';
import Header from './components/Header';
import Agenda from './components/Agenda';
import alarmFile from './alarm-sound.wav';
import {firebase} from './firebase';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			response: '',
			timer: [{
				start: 0,
				stop: 0
			}],
			timerDefault: 1500,
			timerString: '',
			mode: '',
			selectedTask: '',
			authUser: null,
			authUserEmail: null,
			alarm: false,
			queryTime: null
		};
		this.alarmSound = new Audio(alarmFile);
	}

	componentWillMount() {
		if(this.timeInterval) { this.updateStartButton('start') }
	}
	componentDidMount() {
		this.testApi()
			.catch((err)=> console.error(err))
			.then((res)=> console.log(`Client: 4.26 ${res.test}`));
		this.convertTimerString(this.state.timerDefault);
		firebase.auth.onAuthStateChanged((authUser)=> {
			authUser ? this.updateAuthUser(authUser) : this.updateAuthUser(null);
		});
	}
	componentWillUnmount() {
		clearInterval(this.timeInterval);
	}

	updateTimerString(timerString) {
		this.setState({ timerString });
	}
	updateMode(mode) {
		this.setState({ mode });
		let taskMode = document.getElementById('task-mode');
		if(taskMode) { taskMode.innerHTML = `Task ${mode}` }
	}
	updateTimer(timer) {
		if(typeof timer === 'number') {
			if((this.state.timer[0]) && (this.state.timer[0].start)) {
				this.setState({ timer: [...this.state.timer, {start: timer, stop: 0}] });
			} else {
				this.setState({ timer: [{start: timer, stop: 0}] });
			}
		} else {
			this.setState({ timer })
		}
	}

	updateAlarm = ()=> {
		this.state.alarm ? this.setState({ alarm: false }) : this.setState({ alarm: true });
	}

	// After timer finishes, let user add to the task's running tally
	updateTimerCount = ()=> {
		let selectedTask = this.state.selectedTask;
		console.log('updateTimerCount', selectedTask);
		if(selectedTask && document.getElementById(selectedTask)) {
			document.getElementById(selectedTask).dataset.timercount++;
			let updatedTask = {
				username: this.state.authUser || null,
				timerCount: document.getElementById(selectedTask).dataset.timercount
			}
			if(this.state.authUser && selectedTask) {
				// PUT route to server
				fetch(`https://patata-api.herokuapp.com/api/task/${selectedTask}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					mode: 'CORS',
					body: JSON.stringify(updatedTask)
				})
					//TODO - if err, save updatedTask to localStorage (? attempt to save later or keep local ?)
								 //? status of 200 on TasksList, heroku's /api/test, successful updateTasks ?//
				 .catch((err)=> console.error(err))
				 .then(()=> window.location.reload());
			} else {
				//TODO - save task locally
				console.log('no user');
			}
		} else {
			console.log('no selectedTask');
		}
	}

	updateAuthUser = (authUser)=> {
		console.log('authUser');
		if(authUser) {
			console.log(authUser.email);
			this.setState({ authUser: authUser.uid, authUserEmail: authUser.email });
		} else {
			console.log(null);
			this.setState({ authUser: null, authUserEmail: null });
		}
	}

	updateQueryTime = (queryTime)=> {
		console.log(queryTime);
		this.setState({ queryTime });
	}

	// Wake up Heroku
	async testApi() {
		const response = await fetch('https://patata-api.herokuapp.com/api/test');
		const body = await response.json();
		if(response.status !== 200) { throw Error(body.message) }
		return body;
	}

	// Convert timer to '##m ##s' format - if timer = 0, end it
	convertTimerString(timer) {
		let newString = '';
		let seconds, minutes, hours;
		timer >= 3600 ? hours = Math.floor(timer / 3600) : hours = 0;
		timer >= 60 ? minutes = Math.floor(timer / 60) % 60 : minutes = 0;
		seconds = timer % 60;
		if(seconds < 10) { seconds = '0' + seconds }
		if(minutes < 10) { minutes = '0' + minutes }
		if(hours && hours < 10) { hours = '0' + hours }
		hours? newString = `${hours}h ${minutes}m ${seconds}s` : newString = `${minutes}m ${seconds}s`;
		document.querySelector('title').innerHTML = newString;
		if((this.state.timer[0]) && (this.state.timer[0].start) && (this.timerDifference() >= this.state.timerDefault)) { this.endTimer(); }
		this.updateTimerString(newString);
	}
	
	startTimer = ()=> {
		let differentTask = document.getElementById('different-task')||null;
		if(!this.timeInterval) {
			if(differentTask) { differentTask.style.display = 'none' }
			this.updateStartButton('stop');
			this.updateTimer(new Date().getTime());
			this.timeInterval = setInterval(()=> {
				this.convertTimerString(this.state.timerDefault - this.timerDifference());
				if((document.getElementById('start-button')) && (document.getElementById('start-button').innerHTML !== 'Stop')) { this.updateStartButton('stop') }
			}, 250);
		} else {
			if(differentTask) { differentTask.style.display = 'inline' }
			this.endTimer();
		}
	}

	endTimer = ()=> {
		document.querySelector('title').innerHTML = 'Patata';
		clearInterval(this.timeInterval);
		this.timeInterval = null;
		let timer = JSON.parse(JSON.stringify(this.state.timer));
		console.log(timer);
		console.log(this.timerDifference());
		// Determine if stopped because of end or click
		if(this.timerDifference() >= this.state.timerDefault) { 
			this.updateStartButton('end');
			this.updateTimerString(this.state.timerString);
			this.updateAlarm();
			this.onPlay();
		} else {
			timer[timer.length-1].stop = new Date().getTime();
			this.updateTimer(timer);
			this.updateStartButton('start');
		}
	}

	timerDifference() {
		let sumTimer = 0;
			for(let i = 0; i < this.state.timer.length; i++) {
				if(!this.state.timer[i].stop) {
					sumTimer += (new Date().getTime() - this.state.timer[i].start)
				} else {
					sumTimer += (this.state.timer[i].stop - this.state.timer[i].start)
				}
			}
			return Math.floor(sumTimer/1000);
	}

	// Set selectedTask to appply timer, can be called with empty parameter to clear selectedTask
	updateSelectedTask = (selectedTask)=> {
		this.resetTimer();
		this.setState({ selectedTask });
		let differentTask = document.getElementById('different-task')||null;
		let taskListItems = document.querySelectorAll('li');
		if(selectedTask === null) {
			if(differentTask) { differentTask.style.display = 'none' }
			this.updateMode('Select');
		} else {
			if(differentTask) { differentTask.style.display = 'inline' }
			// Cycle through displayed list items, determine if matches selectedTask
			for(let i = 0; i < taskListItems.length; i++) {
				if(taskListItems[i].id!==selectedTask) { 
					taskListItems[i].style.display = 'none';
				} else if(this.state.timerString !== '00m 00s') {
					// Update timer display and default
					this.convertTimerString((taskListItems[i].dataset.timerdefault * 60));
					this.setState({timerDefault: taskListItems[i].dataset.timerdefault * 60});
				}
			}
			this.updateMode('Selected');
		}
	}

	// Change button to 'start' or 'stop'
	updateStartButton = (str)=> {
		let startButton = document.getElementById('start-button')||null;
		if((startButton) && (str === 'stop')) {
			startButton.innerHTML = 'Stop';
			startButton.classList.add('stop');
		} else if((startButton) && (str === 'start')) {
			startButton.innerHTML = 'Start';
			startButton.classList.remove('stop');
		}
	}

	onPlay = ()=> {
		this.alarmSound.play();
		console.log('alarm ended');
		setTimeout(()=> {
			if(this.state.alarm) {
				this.onPlay();
				
			}
		}, 3000);
	}

	resetTimer = ()=> {
		this.setState({ timer: [{ start: 0, stop: 0 }]});
	}

	render() {
		return (
			<div className="App">
				<Header {...this.state} />
				<Switch>
					{['/', '/index.html', '/login', '/signup'].map((path)=> 
						<Route key={path} exact path={path} render={
							()=> <Home authUser={this.state.authUser}
												 authUserEmail={this.state.authUserEmail} /> } />
					)}
					<Route path='/timer' render={ 
						()=> <Timers updateSelectedTask={this.updateSelectedTask} 
												 timeInterval={this.timeInterval} 
												 startTimer={this.startTimer} 
												 updateMode={this.updateMode} 
												 updateTimerCount={this.updateTimerCount}
												 resetTimer={this.resetTimer}
												 updateAlarm={this.updateAlarm}
												 updateQueryTime={this.updateQueryTime}
												 {...this.state} /> } />
					<Route path='/task' render={
						()=> <Tasks authUser={this.state.authUser}
												queryTime={this.state.queryTime}
												updateQueryTime={this.updateQueryTime} /> } />
					<Route path='/agenda' component={Agenda} />
					<Route render={
							()=> <Home authUser={this.state.authUser}
												 authUserEmail={this.state.authUserEmail} /> } />
				</Switch>
			</div>
		);
	}
}

export default App;