import React from 'react';
import './url.css';

const Url = ({ method, api, search }) => {
    const splitted = api.split('://');
    const protocol = splitted[0]
    const host = splitted[1];
    return (
        <div className="destination">
            <span className="destination-get">{method}</span>
            <span className="destination-protocol">{protocol}://</span>
            <span className="destination-api">{host}/</span>
            <span className="destination-uri-variable">{search.author}</span>
            {search.songTitle ? <span className="slash-default">/</span> : ""}
            <span className="destination-uri-variable">{search.songTitle}</span>
        </div>
    )
};

export default Url;
