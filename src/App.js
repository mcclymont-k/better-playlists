import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Aggregate extends Component {
  render() {
    return (
      <div className='aggregate'>
        <h2 style={{color: 'blue'}}>Number Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render () {
    return (
      <div>
        <img/>
        <input type='text'/>
        Filter
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    return(
      <div class='playlist'>
        <img/>
        <h2>Playlist</h2>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
      
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Title</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <div class = 'playlistComponent'>
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div>
      </div>
    );

  }
}


export default App;
