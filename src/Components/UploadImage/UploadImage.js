import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UploadImage.css';

class UploadImage extends Component {
    constructor() {
        super();
        this.state = {
            image: [],
        };
    }

    componentDidMount() {
        document.getElementById('clear').hidden = true;
        document.getElementById('submit').hidden = true;
    }

    onImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        document.getElementById('clear').hidden = false;
        document.getElementById('submit').hidden = false;
    }

    onClear(){
        document.getElementById('submit').hidden = true;
        this.setState({image: []});
    }

    render() {
        return (
            <div className="UploadImage">
                <div className="container-fluid">

                    {/* Display 'Choose File' buttons */}
                    <div className="row va-upload-image-content">
                        <input type="file" onChange={this.onImageChange.bind(this)} className="filetype"/>
                    </div>
                    <div className="row" align="center">
                        <div className="va-upload-image col-12 col-md-8" align="center">
                            <img src={this.state.image} alt="" className="va-upload-image"/>
                        </div>
                    </div>

                    {/* Display clear and submit buttons */}
                    <div className="row">
                        <div className="row va-clear-submit" align="center">
                            <div className="col-3"></div>
                            <div id="clear" className="col-3">
                                <button onClick={this.onClear.bind(this)} type="button" className="btn btn-outline-danger">Clear</button>
                            </div>
                            <div id="submit" className="col-3">
                                <Link to={{pathname: "/result", state: {image: this.state.image}}}>
                                    <button type="button" className="btn btn-outline-primary">
                                        Submit
                                    </button>
                                </Link>
                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default UploadImage;
