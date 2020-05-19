import React, { Fragment } from 'react'

const SongList = ({songByArtist}) => {
    console.log(songByArtist);
    const data = Object.keys(songByArtist).map(key => (
        <div key={`artist-${Date.now()}`}>
            <h2>{key}</h2>
            {
                songByArtist[key].map((song,i) => (
                <div key={`song-${i+Date.now()}`}>
                    <h3>{song.title}</h3>
                </div>
                ))
            }
        </div>   
    ));
    return (
        <div>
            { data }
        </div>
    )
};

export default SongList;

