import React, { Component } from 'react';
import SongParameter from './SongParameter';
import Button from './Button';

export default class DBFinder extends Component {
    state = {
        author: "",
        songTitle: "",
        lyrics:""
    }
    handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleClick = (e) => {
        e.preventDefault();
        const songs = {...this.props.songs };
        const {author, songTitle } = this.state;
        const song = Object.keys(songs).filter(song => {
            if(songs[song].artist.toLowerCase() === author.toLowerCase() && songs[song].title.toLowerCase() === songTitle.toLowerCase()) {
                return song;
            }
            return null;
        });
        if(song[0] !== null) {
            const lyrics = songs[song[0]].lyrics;
            const currentSong = {
                artist:author,
                title:songTitle,
                lyrics
            }
          this.setState({lyrics});
          this.props.setCurrentSong(currentSong);
        }  
       
    }
    componentDidUpdate() {
        this.setHtml();
    }
    componentDidMount(){
        this.setHtml();
    }
    setHtml() {
        const p = document.querySelector('.lyricsContainer');
        const title = document.querySelector('.song-title');
        if (this.props.song.lyrics) {
            title.innerHTML = this.props.song.title;
            p.innerHTML = this.props.song.lyrics.replace(new RegExp('\n', 'g'), '<br>');
        }
    }
    render() {
        const { author, songTitle } = this.state;
        return (
            <div className="container">
                <SongParameter handleChange={this.handleChange} title="author" formFieldName="author" value={author} />
                <SongParameter handleChange={this.handleChange} title="song" formFieldName="songTitle" value={songTitle} />
                <Button handleClick={this.handleClick} color="is-primary" />

                <div className="card text-center">
                    <h2 className="title song-title"></h2>
                    <p className="card-content lyricsContainer"></p>
                </div>
            </div>
        )
    }
}
