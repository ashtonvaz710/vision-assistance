import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Preferences.css';

class Preferences extends Component {
    constructor() {
        super();
        this.state = {
            mode: '',
            audio: true,
            language: '',
            modeOptions: [],
            languageOptions: []
        };
    }

    componentWillMount() {
        this.setState({
            mode: localStorage.getItem('mode') ? localStorage.getItem('mode') : 'Object Detection',
            audio: localStorage.getItem('audio') ? (localStorage.getItem('audio') === 'True') : true,
            language: localStorage.getItem('language') ? localStorage.getItem('language') : 'en-US',
            modeOptions: ['Object Detection', 'Text Detection'],
            audioOptions: [[true, 'True'], [false, 'False']],
            languageOptions: [['en-US', 'English - US'], ['en-GB', 'English - UK'], ['es-ES', 'Spanish'], ['fr-FR', 'French'], ['it-IT', 'Italian'], ['de-DE', 'German'], ['ja-JP', 'Japanese'], ['pt-BR', 'Portuguese'], ['zh-CN', 'Chinese']]
        });
    }

    handleModeChange(e) {
        this.setState({mode: e.target.value});
        localStorage.setItem('mode', e.target.value);
    }

    handleAudioChange(e) {
        for (let audio of this.state.audioOptions) {
            if (audio[1] === e.target.value) {
                this.setState({audio: audio[0]});
                localStorage.setItem('audio', audio[1]);
                break;
            }
        }
    }

    handleLanguageChange(e) {
        for (let language of this.state.languageOptions) {
            if (language[1] === e.target.value) {
                this.setState({language: language[0]});
                localStorage.setItem('language', language[0]);
                break;
            }
        }
    }

    render() {
        let modeOptions = this.state.modeOptions.map(option => {
            if (option === this.state.mode) {
                return (
                    <option key={option} selected="selected">{option}</option>
                )
            } else {
                return (
                    <option key={option}>{option}</option>
                )
            }
        });

        let audioOptions = this.state.audioOptions.map(option => {
            if (option[0] === this.state.audio) {
                return (
                    <option id={String(option[0])} key={option[0]} selected="selected">{option[1]}</option>
                )
            } else {
                return (
                    <option id={String(option[0])} key={option[0]}>{option[1]}</option>
                )
            }
        });

        let languageOptions = this.state.languageOptions.map(option => {
            if (option[0] === this.state.language) {
                return (
                    <option id={option[0]} key={option[0]} selected="selected">{option[1]}</option>
                )
            } else {
                return (
                    <option id={option[0]} key={option[0]}>{option[1]}</option>
                )
            }
        });

        return (
            <div className="Preferences">
                <div className="container-fluid va-preferences">
                    <div className="table">
                        <form>

                            <div className="form-group row">
                                <div className="col-sm-1"></div>
                                <label htmlFor="language" className="col-sm-3 col-form-label">Mode</label>
                                <div className="col-sm-6">
                                    <select className="form-control" id="language" onChange={this.handleModeChange.bind(this)}>
                                        {modeOptions}
                                    </select>
                                </div>
                            </div>

                            <div className="va-padding-for-line"></div>
                            <hr/>
                            <div className="va-padding-for-line"></div>

                            <div className="form-group row">
                                <div className="col-sm-1"></div>
                                <label htmlFor="audio" className="col-sm-3 col-form-label">Audio</label>
                                <div className="col-sm-6">
                                    <select className="form-control" id="audio" onChange={this.handleAudioChange.bind(this)}>
                                        {audioOptions}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-1"></div>
                                <label htmlFor="language" className="col-sm-3 col-form-label">Audio Language</label>
                                <div className="col-sm-6">
                                    <select className="form-control" id="language" onChange={this.handleLanguageChange.bind(this)}>
                                        {languageOptions}
                                    </select>
                                </div>
                            </div>

                            {/*<div className="va-preferences-submit" align="center">*/}
                                {/*<Link to="/uploadImage">*/}
                                    {/*<button type="button" className="btn btn-outline-primary">*/}
                                        {/*Submit*/}
                                    {/*</button>*/}
                                {/*</Link>*/}
                            {/*</div>*/}

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Preferences;
