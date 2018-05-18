import React, { Component } from 'react';
import './Home.css';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            text: false
        };
    }

    componentWillMount() {
        if (this.props.location.pathname === '/') {
            this.setState({text: true});
        } else {
            this.setState({text: false});
        }
    }

    displayWelcomeMessage() {
        return (
            <div className="container-fluid va-home-center" align="center">
                <div>
                    Welcome To Vision Assistance
                </div>
                <div>
                    A tool for the visually impaired to detect objects and texts in images
                </div>
                <br/>
                <div>
                    Upload Image - Allows you select a local image
                </div>
                <div>
                    Capture Image - Allows you capture an image using the webcam
                </div>
                <div>
                    Preferences - Allows you to configure settings as to your convenience
                </div>
                <br/>
                <div>
                    Modes -
                </div>
                <div>
                    Object Detection - Tries to capture any logo, landmark, faces and labels from the image
                </div>
                <div>
                    Text Detection - Reads back the text found in images
                </div>
                <div>
                    Audio -
                </div>
                <div>
                    Based on whether you would like the audio to be while displaying the results
                </div>
                <div>
                    Language -
                </div>
                <div>
                    Language of text you would like the results to displayed in
                </div>
            </div>
        )
    }

    render() {
        let text;
        if (this.state.text) {
            text = this.displayWelcomeMessage();
        } else {
            text = '';
        }

        return (
            <div>
                <Header/>
                {text}
                <Footer onClick={this.state.text = false}/>
            </div>
        );
    }
}

export default Home;
