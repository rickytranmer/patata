import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import potato from './potato.svg';
import './App.css';
import TaskForm from './components/TaskForm';
import BreakMenu from './components/BreakMenu';
import Timer from './containers/Timer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      timer: 3,
      timerDefault: 1500,
      timerString: ''
    };
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    document.getElementById('start-button').style.backgroundColor = 'green';
    this.convertTimerString(this.state.timer);
    // this.testApi()
    //   .then((res)=> console.log( res.test ))
    //   .catch((err)=> console.error(err));
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  async testApi() {
    const response = await fetch('/api/test');
    const body = await response.json();
    if (response.status !== 200) { throw Error(body.message) }
    return body;
  };

  convertTimerString(timer) {
    let newString = '';
    let minutes, seconds, hours;
    timer >= 3600 ? hours = Math.floor(timer / 3600) : hours = 0;
    timer >= 60 ? minutes = Math.floor(timer / 60) % 60 : minutes = 0;
    seconds = timer % 60;
    if(seconds < 10) { seconds = '0' + seconds }
    if(minutes < 10) { minutes = '0' + minutes }
    if(hours && hours < 10) { hours = '0' + hours }
    hours? newString = `${hours}h ${minutes}m ${seconds}s` : newString = `${minutes}m ${seconds}s`;
    document.querySelector('title').innerHTML = newString;
    this.updateTimerString(newString);
    if(this.state.timer<=0) { this.endTimer() }
  }

  endTimer() {
    document.querySelector('title').innerHTML = 'Patata';
    document.getElementById('start-button').innerHTML = 'Start';
    document.getElementById('start-button').style.backgroundColor = 'green';
    clearInterval(this.timeInterval);
    this.timeInterval = null;
    if(this.state.timer===0) { 
      this.updateTimer(this.state.timerDefault);
      this.updateTimerString(this.state.timerString);
    }
    /*TODO 
      display timer end
      prompt break selection (short, long, skip, notes)
      start a pause timer when stopped with time left?  
      track interruptions?
    */
  }

  updateTimer(timer) {
    this.setState({ timer });
  }
  updateTimerString(timerString) {
    this.setState({ timerString });
  }

  startTimer() {
    if(!this.timeInterval) {
      document.getElementById('start-button').innerHTML = 'Stop';
      document.getElementById('start-button').style.backgroundColor = 'red';
      this.timeInterval = setInterval(()=> {
        this.updateTimer(this.state.timer - 1);
        this.convertTimerString(this.state.timer);
      }, 1000);
    } else {
      this.endTimer();
    }
  }

  // Separate app components, display based on mode or timerString?
  // Make nav bar using Router
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ potato } className="App-logo" alt="logo" />
          <h1 className="App-title">Patata - WIP</h1>
          <img src={ potato } className="App-logo" alt="logo" />
          {/* Router nav bar
            Timer (replace with current timer duration)
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
        </header>

        {/* Timer button */}
        <Timer startTimer={this.startTimer} {...this.state} />

        {/* Break buttons */}
        { this.state.timerString==='DONE' &&
         <BreakMenu />
        }

        {/* New Task form */}
        {
         <div>
          <TaskForm />
         </div>
        }
      </div>
    );
  }
}

export default App;