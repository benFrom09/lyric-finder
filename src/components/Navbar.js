import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = ({ menu }) => {

    return (
        <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/db" >Find on database</Link></li>
                <li><Link to="/find" >Find on the web</Link></li>
            </ul>
      </nav>
    )
};


export default Navbar;
