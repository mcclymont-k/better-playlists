import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

class PlaylistCounter extends Component {
  render() {
    return (
      <div className='aggregate'>
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
        <img style={{'width': '200px', 'margin': '10px'}} src={playlist.imageURL}/>
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
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {"Authorization": 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(data => this.setState({user: {name: data.id}}))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {"Authorization": 'Bearer ' + accessToken}
    }).then(response => response.json())
      .then(playlistData => {
        let playlists = playlistData.items
        let trackDataPromises = playlists.map(playlist => {
          let responsePromises = fetch(playlist.tracks.href, {
          headers: {"Authorization": 'Bearer ' + accessToken}
          })
          let trackDataPromise = responsePromises
            .then(response => response.json())
          return trackDataPromise
        })
        let allTrackDataPromises =
          Promise.all(trackDataPromises)
        let playlistPromise = allTrackDataPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
            playlists[i].trackDatas = trackData.items.map(items => items.track)
          })
          return playlists
        })
        return playlistPromise
      })
      .then(playlists => {
        this.setState({
          playlists: playlists.map(item => {
              return {
                  name: item.name,
                  imageURL: item.images[0].url,
                  songs: item.trackDatas.slice(0,3).map(trackData =>
                    ({
                    name: trackData.name,
                    duration: trackData.duration_ms / 1000
                  }))
              }
            })
          })})

}

  render() {

    let playlistToRender =
    this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
        this.state.filterText.toLowerCase()))
      : [];

    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h1>
               {this.state.user.name}s Playlists
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
          </div> : <button onClick={() => {window.location =
            window.location.href.includes('localhost')
            ? "http://localhost:8888/login"
            : "https://better-playlists-backend-kie.herokuapp.com/login"}
          } style={{'padding': '20px', 'margin': '20px'}}>Login to Spotify</button>
        }
      </div>
    )
  }
}


export default App;
