import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    timer: 5,
    timerString: ''
  };

  componentDidMount() {
    this.convertTimerString(this.state.timer);
    this.testApi()
      .then((res)=> this.setState({ response: res.test }))
      .catch((err)=> console.log(err));
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
    hours ? newString = `${hours}h ${minutes}m ${seconds}s` : newString = `${minutes}m ${seconds}s`;
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
      this.timeInterval = setInterval(()=> {
        this.setState({ timer:  this.state.timer - 1 });
        this.convertTimerString(this.state.timer);
      }, 1000);
    } else {
      this.endTimer();
    }
  }

  // Separate app components, display based on mode or timerString?
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>

        <button onClick={this.startTimer.bind(this)}>
          Click Me
        </button>

        {this.state.timerString!=='DONE' &&
          <h1>{this.state.timerString}</h1>
        }

        {this.state.timerString==='DONE' &&
          <div>
            <button>Short Break</button>
            <button>Long Break</button>
          </div>
        }
      </div>
    );
  }
}

export default App;