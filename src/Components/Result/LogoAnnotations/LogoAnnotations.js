import React, { Component } from 'react';
import './LogoAnnotations.css';

class LogoAnnotations extends Component {
    render() {
        let text = '';
        let title;
        let items;

        if (this.props.logo) {
            if (this.props.logo.length === 1) {
                text += 'Logo Detected, ';
                title = <h2>Logo</h2>
            } else {
                text += 'Logos Detected, ';
                title = <h2>Logos</h2>
            }

            items = this.props.logo.map(i => {
                text += i[0] + ' with ' + (i[1] * 100).toFixed(0) + ' percent, ';
                return (
                    <li key={i[0] + (i[1] * 100).toFixed(0)}>
                        <div className="va-logo-title">
                            {i[0]}
                        </div>
                        &nbsp;
                        <div className="va-logo-items">
                            {(i[1] * 100).toFixed(0)}%
                        </div>
                    </li>
                )
            });
            this.props.logoAnnotationsText(text);
        }

        return (
            <div className="LogoAnnotations">
                {title}
                {items}
            </div>
        );
    }
}

export default LogoAnnotations;
