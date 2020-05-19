import React from 'react'

const Button = ({ color, handleClick }) => {
    return (
        <div className="buttons">
            <button className={'button ' + color } onClick={handleClick}>find</button>
        </div>
    )
};

export default Button;
