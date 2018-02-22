import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    timer: 7195,
    timerString: ''
  };

  componentDidMount() {
    this.testApi()
      .then((res)=> this.setState({ response: res.test }))
      .catch((err)=> console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  testApi = async ()=> {
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
    if(seconds<10) { seconds = '0' + seconds }
    if(minutes<10) { minutes = '0' + minutes }
    if(hours && hours<10) { hours = '0' + hours }
    hours ? newString = `${hours}h ${minutes}m ${seconds}s` : newString = `${minutes}m ${seconds}s`;
    this.setState({timerString: newString});
  }

  startTimer() {
    if(!this.timeInterval) {
      this.timeInterval = setInterval(()=> {
        this.setState({ timer:  this.state.timer + 1 });
        this.convertTimerString(this.state.timer);
      }, 1000);
    } else {
      clearInterval(this.timeInterval);
      this.timeInterval = null;
    }
  }

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
        <h1>{this.state.timerString}</h1>
      </div>
    );
  }
}

export default App;