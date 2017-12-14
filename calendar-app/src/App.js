import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DatePicker from './DatePicker'

class App extends Component {

  saveDate = dt =>{
    
  }
  cancelDate = () =>{
    
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React1</h1>
        </header>
        
        <DatePicker defaultDate={new Date(2017, 10, 8)} onSave={this.saveDate} onCancel={this.cancelDate} />
      </div>
    );
  }
}

export default App;
