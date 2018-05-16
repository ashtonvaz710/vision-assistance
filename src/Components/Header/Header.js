import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light va-header-background">
                    {/*<Link to={"/uploadImage"}>*/}
                        <a href={"/"} className="va-header-text navbar-brand">Vision Assistance</a>
                    {/*</Link>*/}
                </nav>
            </div>
        );
    }
}

export default Header;
