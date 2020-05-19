import React, { Component } from 'react'
import SongParameter from './SongParameter';
import axios from 'axios';
import Button from './Button';
import Url from './Url';

export default class WebFinder extends Component {
    state = {
        api: 'https://api.lyrics.ovh/v1',
        author: "",
        songTitle: "",
        song: {
            title: "",
            lyrics: "",
            artist: ""
        },
    }
    handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleClick = (e) => {
        e.preventDefault();
        console.log(e);
        const { api, author, songTitle } = this.state;
        this.getData(`${api}/${encodeURIComponent(author)}/${encodeURIComponent(songTitle)}`);
    }
    getData = async (url) => {
        try {
            const res = await axios.get(url);
            let data = res.data;
            let lyrics = res.data.lyrics;
            console.log('LYRICS', data);
            let songTitle = this.state.songTitle[0].toUpperCase() + this.state.songTitle.slice(1);
            let artist = this.state.author;
            const song = {
                artist,
                lyrics,
                title: songTitle,
            };
            this.setState({ song });
            this.props.addSong(song);
        } catch (error) {
            const song = {
                title: 'Lyrics not found',
                lyrics: error.message
            }
            this.setState({ song });
        }
    }
    componentDidMount() {
        this.setHtml();
    }
    componentDidUpdate() {
        this.setHtml();
    }
    setHtml() {
        const p = document.querySelector('.lyricsContainer');
        const title = document.querySelector('.song-title');
        if (this.state.song.lyrics) {
            title.innerHTML = this.state.song.title;
            p.innerHTML = this.state.song.lyrics.replace(new RegExp('\n', 'g'), '<br>');
        }
    }
    render() {
        const { author, songTitle, api } = this.state;
        const search = { author, songTitle }
        return (
            <div className="container">
                <Url method='get' api={api} search={search} />
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
