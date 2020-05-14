import React from 'react';

const Response = ({title,body}) => {
    const lyrics = body ? body.replace(new RegExp("/n","g"),<br/>) : "";
    return (
        <div>
            <h2>{ title }</h2>
            <p>{ lyrics }</p>
        </div>
    )
};

export default Response;
