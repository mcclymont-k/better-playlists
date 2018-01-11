import React, { Component } from 'react';
import './App.css';
let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: "The Bomb",
        songs: [
          {name:'Song 1', duration: 1320},
          {name:'Song 2', duration: 1320},
          {name:'Song 3', duration: 1320}
        ]
      },
      {
        name: "90's hits",
        songs: [
          {name:'Song 1', duration: 1320},
          {name:'Song 2', duration: 1320},
          {name:'Song 3', duration: 1320}
        ]
      },
      {
        name: "Beach party",
        songs:[
          {name:'Song 1', duration: 1320},
          {name:'Song 2', duration: 1320},
          {name:'Song 3', duration: 1320}
        ]
      },
      {
        name: "Woop Woop",
        songs: [
          {name:'Song 1', duration: 1320},
          {name:'Song 2', duration: 1320},
          {name:'Song 3', duration: 1320}
        ]
      },
    ]
    }
  };

class PlaylistCounter extends Component {
  render() {
    return (
      <div className='aggregate'>
        {/*Here we are checking if there is a playlists and if so
          then we add the <h2>  */}
        <h2 style={{color: 'blue'}}>{this.props.playlists.length} Playlists
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
        <input type='text' onKeyUp={event =>
          this.props.onTextChange(event.target.value)
        }/>
      </div>
    )
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist

    return(
      <div className='playlist'>
        <img />
        <h2>{playlist.name}</h2>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterText: ''
    };
  }

  componentDidMount() {
    setTimeout (() => {
      this.setState({serverData: fakeServerData})
    }, 1000)

    setTimeout (() => {
      this.setState({filterText: ''})
    }, 2000)
    }

  render() {

    let playlistToRender = this.state.serverData.user ?
    this.state.serverData.user.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterText.toLowerCase())
    ): [];
    return (


      <div className="App">
        {/*  Here the comp is asking whether there is serverData before executing
          the h1 tags */}
        {this.state.serverData.user ?
          <div>
            <h1>
               {this.state.serverData.user.name}'s Playlists
             </h1>
             <PlaylistCounter playlists={playlistToRender}/>
             <HoursCounter playlists={playlistToRender}/>
            <Filter onTextChange={text => this.setState({filterText: text})}/>
            <div className = 'playlistComponent'>

              {playlistToRender.map(playlist =>
                <Playlist playlist={playlist}/>
              )
              }

            </div>
        </div> : <h1>LOADING...</h1>
      }
      </div>

    );
  }
}


export default App;
