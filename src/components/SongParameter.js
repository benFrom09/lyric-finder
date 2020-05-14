import React from 'react';
import './songParameter.css';

const SongParameter = ({ formFieldName,title,handleChange,value }) => {
    return (
        <div className="field">
            <div className="control has-icons-left">
                <input tyep="text" className="input is-primary" name={formFieldName} onChange={handleChange} value={ value } placeholder={title}/>
            </div>
        </div>
    )
};

export default SongParameter;
