import React, { Component } from 'react';
import VoicePlayer from '../react-voice-components/lib/VoicePlayer';
import './Result.css';
import TextAnnotations from "./TextAnnotations/TextAnnotations";
import LogoAnnotations from "./LogoAnnotations/LogoAnnotations";
import LandmarkAnnotations from "./LandmarkAnnotations/LandmarkAnnotations";
import FaceAnnotations from "./FaceAnnotations/FaceAnnotations";
import LabelAnnotations from "./LabelAnnotations/LabelAnnotations";
import CONSTANTS from '../constants';
import ERRORS from "../errors";
import {Client, Feature, Request, Image} from 'vision-cloud-api';


class Result extends Component {
    constructor() {
        super();
        this.state = {
            image: [],
            image_response: {},
            play_voice: true,
            pause_voice: false,
            errorMessage: '',
            textAnnotationsText: '',
            logoAnnotationsText: '',
            landmarkAnnotationsText: '',
            faceAnnotationsText: '',
            labelAnnotationsText: ''
        };
    }

    componentWillMount() {
        this.setState({image: this.props.location.state.image, play_voice: true, pause_voice: false});
        this.apiCall(this.props.location.state.image);
    }

    getAnnotationsFromResponse(res) {
        let response = {};

        if(res.responses[0].labelAnnotations) {
            response.labelAnnotations = [];
            if(res.responses[0].labelAnnotations) {
                for (let label of res.responses[0].labelAnnotations) {
                    response.labelAnnotations.push([label.description, label.score])
                }
            }
        }

        switch (localStorage.getItem('mode')) {
            case 'Object Detection':
                if(res.responses[0].faceAnnotations) {
                    response.faceAnnotations = [];
                    let expressions = Object.values(CONSTANTS.FACE_EXPRESSIONS).map(exp => {
                        return exp[0];
                    });
                    let face = res.responses[0].faceAnnotations;
                    if (res.responses[0].faceAnnotations) {
                        for (let i = 0; i < face.length; i++) {
                            let flag = 1;
                            for (let key in face[i]) {
                                for (let exp of expressions) {
                                    if (key === exp) {
                                        for (let value of CONSTANTS.ACCEPTED_FACE_EXPRESSIONS_VALUES) {
                                            if (face[i][key] === value) {
                                                flag = 0;
                                                if (!response.faceAnnotations[i]) {
                                                    response.faceAnnotations[i] = [i, {}];
                                                }
                                                if (!response.faceAnnotations[i][1][value]) {
                                                    response.faceAnnotations[i][1][value] = []
                                                }
                                                response.faceAnnotations[i][1][value].push(key);
                                            }
                                        }
                                    }
                                }
                            }
                            if (flag) {
                                response.faceAnnotations.push([i , {}])
                            }
                        }
                    }
                }

                if(res.responses[0].logoAnnotations) {
                    response.logoAnnotations = [];
                    if(res.responses[0].logoAnnotations) {
                        for (let logo of res.responses[0].logoAnnotations) {
                            response.logoAnnotations.push([logo.description, logo.score])
                        }
                    }
                }

                if(res.responses[0].landmarkAnnotations) {
                    response.landmarkAnnotations = [];
                    if(res.responses[0].landmarkAnnotations) {
                        for (let landmark of res.responses[0].landmarkAnnotations) {
                            response.landmarkAnnotations.push([landmark.description, landmark.score])
                        }
                    }
                }

                break;

            case 'Text Detection':
                if(res.responses[0].textAnnotations) {
                    response.textAnnotations = [];
                    if(res.responses[0].textAnnotations) {
                        for (let label of res.responses[0].textAnnotations) {
                            response.textAnnotations.push(label.description);
                            if (label.locale) {
                                break;
                            }
                        }
                    }
                }
                break;
        }

        return response;
    }

    apiCall(image1) {
        const auth = CONSTANTS.API_KEY;
        const feature1 = new Feature('TEXT_DETECTION');
        const feature2 = new Feature('LOGO_DETECTION');
        const feature3 = new Feature('LANDMARK_DETECTION');
        const feature4 = new Feature('FACE_DETECTION');
        const feature5 = new Feature('LABEL_DETECTION');
        const features = [feature1, feature2, feature3, feature4, feature5];

        const base64 = image1;
        const image = new Image({base64});
        image.build();

        const request = new Request({image, features});

        const client = new Client({auth});

        client.annotate([request]).then(
            res => {
                // Handling response
                console.log(res.responses);
                if (res.responses[0].error) {
                    this.setState({errorMessage: ERRORS.INCORRECT_IMAGE_TYPE});
                } else {
                    let response = this.getAnnotationsFromResponse(res);
                    if (response === {}) {
                        this.setState({errorMessage: ERRORS.NO_RESPONSE});
                    } else {
                        this.setState({image_response: response});
                    }
                }
            }, error => {
                this.setState({errorMessage: ERRORS.API_ERROR});
            });

        // -----------------------

        // const vision = require('react-cloud-vision-api');
        // vision.init({auth: CONSTANTS.API_KEY});
        // const req = new vision.Request({
        //     image: new vision.Image({
        //         base64: image,
        //     }),
        //     features: [
        //         new vision.Feature('TEXT_DETECTION', 4),
        //         new vision.Feature('LOGO_DETECTION', 10),
        //         new vision.Feature('LANDMARK_DETECTION', 10),
        //         new vision.Feature('FACE_DETECTION', 10),
        //         new vision.Feature('', 10)
        //     ]
        // });
        //
        // vision.annotate(req).then(res => {
        //
        //     // Handling response
        //     console.log(res.responses);
        //     if (res.responses[0].error) {
        //         this.setState({errorMessage: ERRORS.INCORRECT_IMAGE_TYPE});
        //     } else {
        //         let response = this.getAnnotationsFromResponse(res);
        //         if (response === {}) {
        //             this.setState({errorMessage: ERRORS.NO_RESPONSE});
        //         } else {
        //             this.setState({image_response: response});
        //         }
        //     }
        // }, error => {
        //     this.setState({errorMessage: ERRORS.API_ERROR});
        // });
    }
    handlePause() {
        this.setState({pause_voice: true});
        this.setState({play_voice: false});
        // this.render();
    }

    handleResume() {
        this.setState({pause_voice: false});
        this.setState({play_voice: true});
        // this.render();
    }

    handleText (text) {
        if (text !== this.state.textAnnotationsText) {
            this.setState({textAnnotationsText: text});
        }
    }

    handleLogo (text) {
        if (text !== this.state.logoAnnotationsText) {
            this.setState({logoAnnotationsText: text});
        }
    }

    handleLandmark (text) {
        if (text !== this.state.landmarkAnnotationsText) {
            this.setState({landmarkAnnotationsText: text});
        }
    }

    handleFace (text) {
        if (text !== this.state.faceAnnotationsText) {
            this.setState({faceAnnotationsText: text});
        }
    }

    handleLabel (text) {
        if (text !== this.state.labelAnnotationsText) {
            this.setState({labelAnnotationsText: text});
        }
    }

    getTextFromState() {
        let text = '';
        if (this.state.textAnnotationsText) {
            text += this.state.textAnnotationsText
        }
        if (this.state.logoAnnotationsText) {
            text += this.state.logoAnnotationsText
        }
        if (this.state.landmarkAnnotationsText) {
            text += this.state.landmarkAnnotationsText
        }
        if (this.state.faceAnnotationsText) {
            text += this.state.faceAnnotationsText
        }
        if (this.state.labelAnnotationsText) {
            text += this.state.labelAnnotationsText
        }

        return text;
    }

    render() {
        let text = (localStorage.getItem('audio') === 'True') ? this.getTextFromState() : '';
        console.log(text);
        console.log(this.state.image_response);
        let voice;
        if (text) {
            voice = <VoicePlayer
                play={this.state.play_voice}
                pause={this.state.pause_voice}
                text={text}
                lang={localStorage.getItem('language')}
            />
        }

        return (
            <div className="Result">
                <div className="container-fluid">

                    <div className="container-fluid va-results-error" align="center">
                        {this.state.errorMessage}
                    </div>

                    <div className="container-fluid va-results-panel">
                        <div className="row">

                            {/* Display image */}
                            <div className="col-12 col-md-6" align="center">
                                <img src={this.state.image} alt="" className="va-result-image"/>
                            </div>

                            {/* Display results */}
                            <div className="col-12 col-md-6 va-results">
                                <div>
                                    <TextAnnotations key={'TextAnnotations'} text={this.state.image_response.textAnnotations} textAnnotationsText={this.handleText.bind(this)}/>
                                </div>
                                <div>
                                    <LogoAnnotations key={'LogoAnnotations'} logo={this.state.image_response.logoAnnotations} logoAnnotationsText={this.handleLogo.bind(this)}/>
                                </div>
                                <div>
                                    <LandmarkAnnotations key={'LandmarkAnnotations'} landmark={this.state.image_response.landmarkAnnotations} landmarkAnnotationsText={this.handleLandmark.bind(this)}/>
                                </div>
                                <div>
                                    <FaceAnnotations key={'FaceAnnotations'} face={this.state.image_response.faceAnnotations} faceAnnotationsText={this.handleFace.bind(this)}/>
                                </div>
                                <div>
                                    <LabelAnnotations key={'LabelAnnotations'} label={this.state.image_response.labelAnnotations} labelAnnotationsText={this.handleLabel.bind(this)}/>
                                </div>
                            </div>
                        </div>
                    </div>


                    {voice}

                    {/* Display pause and resume buttons */}
                    <div className="row va-pause-resume-buttons" align="center">
                        <div className="col-6 float-left">
                            <button type="button" className="btn btn-outline-danger" onClick={this.handlePause.bind(this)}>Pause</button>
                        </div>
                        <div className="col-6 float-right">
                            <button type="button" className="btn btn-outline-primary" onClick={this.handleResume.bind(this)}>Resume</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Result;
