import React, { Component } from 'react';
import './App.css';
let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: "Playlist A",
        songs: [
          {name:'song1', duration: 1320},
          {name:'song2', duration: 1320},
          {name:'song 3', duration: 1320}
        ]
      },
      {
        name: "Playlist B",
        songs: [
          {name:'song1', duration: 1320},
          {name:'song2', duration: 1320},
          {name:'song 3', duration: 1320}
        ]
      },
      {
        name: "Playlist C",
        songs:[
          {name:'song1', duration: 1320},
          {name:'song2', duration: 1320},
          {name:'song 3', duration: 1320}
        ]
      },
      {
        name: "Playlist D",
        songs: [
          {name:'song1', duration: 1320},
          {name:'song2', duration: 1320},
          {name:'song 3', duration: 1320}
        ]
      }
      ]
    }
  };

class PlaylistCounter extends Component {
  render() {
    return (
      <div className='aggregate'>
        {/*Here we are checking if there is a playlists and if so
          then we add the <h2>  */}
        <h2 style={{color: 'blue'}}>{this.props.playlists.length} Name
        </h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0)

    return (
      <div>
        {/*Here we are checking if there is a playlists and if so
          then we add the <h2>  */}
        <h2 style={{color: 'blue'}}>
           {Math.round(totalDuration/60)} Hours
        </h2>
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
      <div className='playlist'>
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
  constructor() {
    super();
    this.state = {serverData: {}};
  }

  componentDidMount() {
    setTimeout (() => {
      this.setState({serverData: fakeServerData})
    }, 1000)
    }



  render() {
    return (
      <div className="App">
        {/*  Here the comp is asking whether there is serverData before executing
          the h1 tags */}
        {this.state.serverData.user ?
          <div>
            <h1>
               {this.state.serverData.user.name}'s Playlists
             </h1>
             <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
             <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter/>
            <div className = 'playlistComponent'>
              <Playlist/>
              <Playlist/>
              <Playlist/>
              <Playlist/>
            </div>
        </div> : <h1>LOADING...</h1>
      }
      </div>
      // </div>
    );
  }
}


export default App;
