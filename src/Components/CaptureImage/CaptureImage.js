import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import './CaptureImage.css';

class CaptureImage extends Component {
    constructor() {
        super();
        this.state = {
            image: []
        }
    }

    componentDidMount() {
        this.showWebcam();
    }

    hideWebcam() {
        document.getElementById('webcam').hidden = true;
        document.getElementById('image').hidden = false;
        document.getElementById('capture').hidden = true;
        document.getElementById('takeAnother').hidden = false;
    }

    showWebcam() {
        document.getElementById('webcam').hidden = false;
        document.getElementById('image').hidden = true;
        document.getElementById('capture').hidden = false;
        document.getElementById('takeAnother').hidden = true;
    }

    setRef(webcam) {
        this.webcam = webcam;
    }

    capture() {
        let imageSrc = this.webcam.getScreenshot();
        this.setState({image: imageSrc});
        this.hideWebcam();
    };

    takeAnother() {
        this.setState({image: []});
        this.showWebcam();
    }

    render() {
        return (
            <div className="CaptureImage">
                <div className="container-fluid">

                    {/* Display Webcam or Image */}
                    <div className="row">
                        <div className="va-captureImage-webcam-image col-12 col-md-8" align="center">
                            <div id="image" className="va-captureImage-image">
                                <img src={this.state.image} alt="" className="va-captureImage-image"/>
                            </div>
                            <div id="webcam">
                                <Webcam
                                    height={400}
                                    audio={false}
                                    ref={this.setRef.bind(this)}
                                    screenshotFormat="image/jpeg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Display capture, take another, submit buttons */}
                    <div className="row">
                        <div id="capture" className="va-captureImage-buttons" align="center">
                            <button onClick={this.capture.bind(this)} type="button" className="btn btn-outline-primary">Capture</button>
                        </div>
                        <div id="takeAnother" className="va-captureImage-buttons" align="center">
                            <div className="col-6 float-left">
                                <button onClick={this.takeAnother.bind(this)} type="button" className="btn btn-outline-danger">Take Another</button>
                            </div>
                            <div className="col-6 float-right">
                                <Link to={{pathname: "/result", state: {image: this.state.image}}}>
                                    <button type="button" className="btn btn-outline-primary">Submit</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default CaptureImage;
