import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Tasks from './containers/Tasks';
import Timers from './containers/Timers';
import Header from './components/Header';
import Home from './components/Home';
import Agenda from './components/Agenda';
import alarmFile from './alarm-sound.wav';

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
      selectedTask: ''
    };
    this.alarmSound = new Audio(alarmFile);
    // this.timeInterval;
  }

  componentWillMount() {
    if(this.timeInterval) { this.updateStartButton('start') }
  }
  componentDidMount() {
    this.testApi()
      .then((res)=> console.log(`3.1 ${res.test}`))
      .catch((err)=> console.error(err));
    this.convertTimerString(this.state.timerDefault);
  }
  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  updateTimer(timer) {
    this.setState({ timer });
  }
  updateTimerString(timerString) {
    this.setState({ timerString });
  }
  updateMode(mode) {
    this.setState({ mode });
    let taskMode = document.getElementById('task-mode');
    if(taskMode) { taskMode.innerHTML = `Task ${mode}` }
  }
  updateTimerTest(timer) {
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

  // Wake up Heroku
  async testApi() {
    const response = await fetch('https://patata-api.herokuapp.com/api/test');
    const body = await response.json();
    if (response.status !== 200) { throw Error(body.message) }
    return body;
  };

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
    if(!this.timeInterval) {
      this.updateStartButton('stop');
      this.updateTimerTest(new Date().getTime());
      this.timeInterval = setInterval(()=> {
        this.convertTimerString(this.state.timerDefault - this.timerDifference());
        if((document.getElementById('start-button')) && (document.getElementById('start-button').innerHTML !== 'Stop')) { this.updateStartButton('stop') }
      }, 250);
    } else {
      document.querySelector('.TasksList').style.display = '';
      this.endTimer();
    }
  }


  endTimer = ()=> {
    document.querySelector('title').innerHTML = 'Patata';
    clearInterval(this.timeInterval);
    this.timeInterval = null;
    let timer = JSON.parse(JSON.stringify(this.state.timer));
    console.log(timer);
    timer[timer.length-1].stop = new Date().getTime();
    this.updateTimerTest(timer);
    // Determine if stopped because of end or click
    if(this.timerDifference() >= this.state.timerDefault) { 
      this.updateStartButton('end');
      this.updateTimerString(this.state.timerString);
      this.onPlay();
      // Incrememnt selectedTask timercount
      if(this.state.selectedTask) {
        document.getElementById(this.state.selectedTask).dataset.timercount++;
        console.log(document.getElementById(this.state.selectedTask).dataset.timercount);
      }
    }
    
    this.updateStartButton('start');
  }

  timerDifference() {
    let sumTimer = 0;
    if(this.timeInterval) {
      for(let i = 0; i < this.state.timer.length; i++) {
        if(!this.state.timer[i].stop) {
          sumTimer += (new Date().getTime() - this.state.timer[i].start)
        } else {
          sumTimer += (this.state.timer[i].stop - this.state.timer[i].start)
        }
      }
      return Math.floor(sumTimer/1000);
    } else {
      return 0;
    }
  }

  // Set selectedTask to appply timer, can be called with empty parameter to clear selectedTask
  updateSelectedTask = (selectedTask)=> {
    this.setState({ selectedTask });
    
    let differentTask = document.getElementById('different-task')||null;
    if(differentTask) { differentTask.style.display = 'inline' }

    // Cycle through displayed list items, determine if matches selectedTask
    let taskListItems = document.querySelectorAll('li');
    console.log(taskListItems);
    if(selectedTask === null) {
      this.updateMode('Select');
    } else {
      for(let i = 0; i < taskListItems.length; i++) {
        if(taskListItems[i].id!==selectedTask) { 
          taskListItems[i].style.display = 'none';
        } else {
          // Update timer display and default
          this.convertTimerString((taskListItems[i].dataset.timerdefault*60) - this.timerDifference());
          this.setState({timerDefault: taskListItems[i].dataset.timerdefault*60})
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
      startButton.style.backgroundColor = '#FF4136';
    } else if((startButton) && (str === 'start')) {
      startButton.innerHTML = 'Start';
      startButton.style.backgroundColor = '#0EBC10';
    }
  }

  onPlay = ()=> {
    this.alarmSound.play();
    console.log('alarm ended');
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/patata' component={Home} />
          <Route path='/patata/timer' render={ (props)=> <Timers updateSelectedTask={this.updateSelectedTask} timeInterval={this.timeInterval} startTimer={this.startTimer} updateMode={this.updateMode} {...this.state} /> } />
          <Route path='/patata/task' component={Tasks} />
          <Route path='/patata/agenda' component={Agenda} />
        </Switch>
      </div>
    );
  }
}

export default App;