import React, { Component, Fragment } from 'react'
import 'bulma/css/bulma.min.css';
import './App.css';
import base from '../base';
import Header from './Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import WebFinder from './WebFinder';
import DBFinder from './DBFinder';

class App extends Component {
  state = {
    songs: {},
    currentSong:{}
  }
 
  componentDidMount() {
    this.ref = base.syncState(`/songs`, {
      context: this,
      state: 'songs'
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  
  setCurrentSong = (song) => {
    this.setState({currentSong:song});
  }
  
  addSong = (song) => {
    const songs = { ...this.state.songs };
    const isInDB = Object.values(songs).find(obj => {
      return obj.lyrics === song.lyrics;
    });
    if (isInDB !== undefined) {
      return;
    }
    songs[`song-${Date.now()}`] = song;
    this.setState({ songs });
  }

  render() {
    return (
      <Fragment>
        <Router>
          <Header title="Find lyrics" />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/db">
              <DBFinder setCurrentSong={ this.setCurrentSong } songs={ this.state.songs } song={ this.state.currentSong } />
          </Route>
          <Route path="/find">
            <WebFinder addSong={ this.addSong } />
          </Route>
        </Router>
      </Fragment>
    );
  }
}





export default App;
