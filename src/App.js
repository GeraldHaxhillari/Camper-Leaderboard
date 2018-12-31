import React from 'react';
import './App.css';
import Rows from './Rows';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h2>FreeCodeCamp Challenge - Camper Leaderboard</h2>
        <a href='https://www.freecodecamp.org/challenges/build-a-camper-leaderboard' target='_blank'>Link to the challenge</a>
      </header>
    );
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sorting: 'recent'
    }
  }
  
  render() {
    return (
        <Rows />
    );
  }
}

export {
  Header,
  Table  
}
