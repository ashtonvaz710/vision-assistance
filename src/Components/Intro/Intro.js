import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';

class Intro extends Component {
    render() {
        return (
            <div className="Intro">
                <div className="container-fluid va-intro-main">
                    <Link to={"/home/uploadImage"}><button>Enter</button></Link>
                    <div className="va-intro-name">
                        Vision Assistance
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;
