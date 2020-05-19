import React from 'react';
import Navbar from './Navbar';
const Header = ({ title }) => {
    return (
        <section className="hero is-primary is-medium">
            <div className="hero-body">
                <div className="container">
                    <h1 className="app-title title is-1">{ title }</h1>
                </div>
            </div>
            <Navbar/>
        </section>
    )
};

export default Header;
