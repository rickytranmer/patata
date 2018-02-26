import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Tasks from './containers/Tasks';
import Timer from './components/Timer';
import Header from './components/Header';
import Home from './components/Home';
import Agenda from './components/Agenda';

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
    this.convertTimerString(this.state.timer);
    // this.testApi()
    //   .then((res)=> console.log(res.test))
    //   .catch((err)=> console.error(err));
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  // async testApi() {
  //   const response = await fetch('/api/test');
  //   const body = await response.json();
  //   if (response.status !== 200) { throw Error(body.message) }
  //   return body;
  // };

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
    let startButton = document.getElementById('start-button')||null;
    if(startButton) {
      startButton.innerHTML = 'Start';
      startButton.style.backgroundColor = 'green';
    }
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
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/timer' render={ (props)=> <Timer startTimer={this.startTimer} {...this.state} /> } />
          <Route path='/task' component={Tasks} />
          <Route path='/agenda' component={Agenda} />
        </Switch>
      </div>
    );
  }
}

export default App;