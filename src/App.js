import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UploadImage from './Components/UploadImage/UploadImage';
import CaptureImage from './Components/CaptureImage/CaptureImage';
import Home from "./Components/Home/Home";
import Preferences from "./Components/Preferences/Preferences";
import Result from "./Components/Result/Result";
import './App.css'

class App extends Component {
    constructor() {
        super();
        localStorage.setItem('audio', 'True');
        localStorage.setItem('language', 'en-US');
        localStorage.setItem('mode', 'Object Detection');
    }
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route path="/" component={Home} />
                        <Route path="/uploadImage" component={UploadImage} />
                        <Route path="/captureImage" component={CaptureImage} />
                        <Route path="/preferences" component={Preferences} />
                        <Route path="/result" component={Result} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
