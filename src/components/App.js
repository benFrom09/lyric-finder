import React, { Component, Fragment } from 'react'
import 'bulma/css/bulma.min.css';
import './App.css';
import Url from './Url';
import SongParameter from './SongParameter';
import Response from './Response';
import axios from 'axios';
import base from '../base';

//const api_key = 'af8c61b4491b9165ca60a565d79c0efe';
const mainContainer = {
  textAlign: "center",
  background: "rgb(155, 89, 182)",
  height: "100vh"
}
class App extends Component {
  state = {
    api: 'https://api.lyrics.ovh/v1',
    author: "",
    songTitle: "",
    song:{
      title:"",
      lyrics:"",
     artist:""
    },
    songs:[],
    responseStatus: null
  }
  handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    this.setState({ [name]: value});
  }
  handleClick = (e) => {
    e.preventDefault()
    const { api, author, songTitle } = this.state;
    this.getData(`${api}/${encodeURIComponent(author)}/${encodeURIComponent(songTitle)}`);
  }
  getData = async (url) => {
    try {
      const res = await axios.get(url);
      let data = res.data;
      let lyrics = res.data.lyrics;
      let songTitle = this.state.songTitle[0].toUpperCase() + this.state.songTitle.slice(1);
      let artist = this.state.author;
      const song = {
        artist,
        lyrics,
        title:songTitle,
      };
      this.setState({song});
      this.addSong(song);
    } catch (error) {
      const song = {
        title:'Lyrics not found',
        lyrics:error.message
      }
      this.setState({song});
    }
  }
  componentDidMount() {
    this.ref = base.syncState(`/${this.state.author}/songs`,{
      context:this,
      state:'songs'
    });
   this.setHtml();
  }
  componentWillUnmount () {
    base.removeBinding(this.ref)
  }
  componentDidUpdate() {
    this.setHtml();
  }
  setHtml () {
    const p = document.querySelector('.lyricsContainer');
    const title = document.querySelector('.song-title');
    if (this.state.song.lyrics) {
      title.innerHTML = this.state.song.title;
      p.innerHTML = this.state.song.lyrics.replace(new RegExp('\n', 'g'), '<br>');
    }
  }
  addSong = (song) => {
    const songs = {...this.state.songs};
    const isInDB = Object.values(songs).find(obj => {
        return obj.lyrics === song.lyrics;
    });
    if(isInDB !== undefined) {
      return;
    }
    songs[`song-${Date.now()}`] = song;
    this.setState({songs});
  }
  render() {
    const { author, songTitle, api,songs } = this.state;
    Object.keys(songs).map(key => {
      //console.log(songs[key].title);
    });
    const search = { author, songTitle }
    return (
      <Fragment>
        <div className="wrapper">
          <section className="hero is-primary is-medium">
            <div className="hero-body">
              <div className="container">
                <h1 className="app-title title is-1">Find lyrics</h1>
              </div>
            </div>
          </section>
          <div className="container">
            <Url method='get' api={api} search={search} />
            <SongParameter handleChange={this.handleChange} title="author" formFieldName="author" value={author} />
            <SongParameter handleChange={this.handleChange} title="song" formFieldName="songTitle" value={songTitle} />
            <div className="buttons">
              <button className="button is-primary" onClick={this.handleClick}>find</button>
            </div>
            
            <div className="card text-center">
                <h2 className="title song-title"></h2>
              <p className="card-content lyricsContainer"></p>
            </div> 
          </div>
        </div>
      </Fragment>
    );
  }
}





export default App;
