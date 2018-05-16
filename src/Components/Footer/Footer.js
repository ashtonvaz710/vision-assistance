import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <div className="container-fluid va-footer-main">

                    {/* Display upload image button */}
                    <div className="row va-footer-buttons" align="center">
                        <div className="col-4 va-upload-image-button">
                            <Link to={"/uploadImage"}>
                                <div className="va-upload-image-button-text">
                                    Upload Image
                                </div>
                            </Link>
                        </div>

                        {/* Display capture image buttons */}
                        <div className="va-vertical-line"></div>
                        <div className="col-4 va-capture-image-button">
                            <Link to={"/captureImage"}>
                                <div className="va-capture-image-button-text">
                                    Capture Image
                                </div>
                            </Link>
                        </div>

                        {/* Display preferences buttons */}
                        <div className="va-vertical-line"></div>
                        <div className="col-4 va-preferences-button">
                            {/*<Link to={{pathname: "/preferences", state: {preferences: this.props.preferences}}}>*/}
                            <Link to="/preferences">
                                <div className="va-preferences-button-text">
                                    Preferences
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
