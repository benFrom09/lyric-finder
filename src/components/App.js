import React, { Component } from 'react'
import './App.css';
import Url from './Url';
import SongParameter from './SongParameter';
import Response from './Response';
import axios from 'axios';

//const api_key = 'af8c61b4491b9165ca60a565d79c0efe';
const mainContainer = {
  textAlign:"center",
  background:"rgb(155, 89, 182)",
  height:"100vh"
}
class App extends Component {
  state = {
    api:'https://api.lyrics.ovh/v1',
    author:"",
    song:"",
    responseBody:null,
    responseStatus:null
  }
  handleChange = (e) => {
    e.persist();
    const {name, value} = e.target;
    this.setState({[name]:value});
  }
  handleClick = (e) => {
      e.preventDefault()
      const {api,author,song} = this.state;
     this.getData(`${api}/${encodeURIComponent(author)}/${encodeURIComponent(song)}`);
      
     
  }
  getData = async (url) => {
    try {
    const res = await axios.get(url);
    let data = res.data;
   let lyrics = res.data.lyrics;
     this.setState({responseBody:lyrics});
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    const p = document.querySelector('.lyricsContainer');
    if(this.state.responseBody) {
      p.innerHTML = this.state.responseBody.replace(new RegExp('\n','g'),'<br>');

    }
  }
  componentDidUpdate () {
    const p = document.querySelector('.lyricsContainer');
    if(this.state.responseBody) {
      p.innerHTML = this.state.responseBody.replace(new RegExp('\n','g'),'<br>');

    }
  }
  render() {
    const {author,song,responseBody,responseStatus,api} = this.state;
    const search = { author,song }
    return (
      <div>
          <h1>Find your favorite lyrics</h1>
          <Url method='get' api={ api } search ={ search }/>
          <SongParameter handleChange={ this.handleChange } title="author" formFieldName="author"  value={author} />
          <SongParameter handleChange={ this.handleChange } title="song" formFieldName="song" value={song}  />
          <button onClick={this.handleClick}>Chercher</button>
          <h2>{song}</h2>
          <p className="lyricsContainer"></p>
      </div>
    )
  }
}





export default App;
