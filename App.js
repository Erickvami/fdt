import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './DataTable.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <DataTable source='messages' widthPercentage={95} heightPercentage={60}/>
        </header>
      </div>
    );
  }
}

export default App;
