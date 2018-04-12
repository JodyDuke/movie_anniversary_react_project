import React, { Component } from 'react';
import Menu from './components/menu/menu';
import Main from './components/main/main';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Menu />
        <Main />
      </div>
    );
  }
}

export default App;
