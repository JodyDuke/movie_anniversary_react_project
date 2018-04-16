import React, { Component } from 'react';
import Menu from './components/menu/menu';
import Main from './components/main/main';

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      width: 'desktop'
    }
  }

  updateWidth() {
    if (window.innerWidth <= 768) {
      this.setState({
        width: 'mobile'
      })
    }
    else {
      this.setState({
        width: 'desktop'
      })
    }
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this))
  }

  render() {
    return (
      <div className="app">
        <Menu responsive={this.state.width}/>
        <Main responsive={this.state.width}/>
      </div>
    );
  }
}

export default App;
