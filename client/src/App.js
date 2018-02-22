import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: '',
    timer: 0
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

  startTimer() {
    if(!this.timeInterval) {
      this.timeInterval = setInterval(()=> {
        this.setState({ timer:  this.state.timer + 1 });
        console.log(this.state.timer);
      }, 1000);
    } else {
      clearInterval(this.timeInterval);
      this.timeInterval = '';
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
        <p>{this.state.timer}</p>
      </div>
    );
  }
}

export default App;