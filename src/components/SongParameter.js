import React from 'react';
import './songParameter.css';

const SongParameter = ({ formFieldName,title,handleChange,value }) => {
    return (
        <div className="song-parameter-container">
            <div className="song-parameter-name">
                <span className="song-parameter-data-name">{ title }</span>
                <input name={formFieldName} onChange={handleChange} value={ value }/>
            </div>
        </div>
    )
};

export default SongParameter;
