import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskForm from './components/TaskForm';
import BreakMenu from './components/BreakMenu';

class App extends Component {
  state = {
    response: '',
    timer: 3,
    timerString: ''
  };

  componentDidMount() {
    document.getElementById('start-button').style.backgroundColor = 'green';
    this.convertTimerString(this.state.timer);
    this.testApi()
      .then((res)=> console.log( res.test ))
      .catch((err)=> console.error(err));
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
    this.setState({ timerString: newString });
    document.querySelector('title').innerHTML = this.state.timerString;
    if(this.state.timer===0) { this.endTimer() }
  }

  endTimer() {
    clearInterval(this.timeInterval);
    this.timeInterval = null;
    if(this.state.timer===0) { 
      this.setState({ 
        timer: 1500,
        timerString: 'DONE'
      });
    }
    /*TODO 
      display timer end
      prompt break selection (short, long, skip, notes)
      start a pause timer when stopped with time left?  
      track interruptions?
    */
  }

  startTimer() {
    if(!this.timeInterval) {
      document.getElementById('start-button').innerHTML = 'Stop';
      document.getElementById('start-button').style.backgroundColor = 'red';
      this.timeInterval = setInterval(()=> {
        this.setState({ timer:  this.state.timer - 1 });
        this.convertTimerString(this.state.timer);
      }, 1000);
    } else {
      document.getElementById('start-button').innerHTML = 'Start';
      document.getElementById('start-button').style.backgroundColor = 'green';
      this.endTimer();
    }
  }

  // Separate app components, display based on mode or timerString?
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 className="App-title">Patata - WIP</h1>
        </header>

        {/* Timer button */}
        { this.state.timerString!=='DONE' &&
         <div>
          <button id="start-button" onClick={this.startTimer.bind(this)}>
            Start
          </button>

          <h1 id="timer-string">{ this.state.timerString }</h1>
         </div>
        }

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