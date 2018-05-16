import React, { Component } from 'react';
import './LandmarkAnnotations.css';

class LandmarkAnnotations extends Component {
    render() {
        let text = '';
        let title;
        let items;

        if (this.props.landmark) {
            if (this.props.landmark.length === 1) {
                text += 'Landmark Detected, ';
                title = <h2>Landmark</h2>
            } else {
                text += 'Landmarks Detected, ';
                title = <h2>Landmarks</h2>
            }

            items = this.props.landmark.map(i => {
                text += i[0] + ' with ' + (i[1] * 100).toFixed(0) + ' percent, ';
                return (
                    <li key={i[0] + (i[1] * 100).toFixed(0)}>
                        <div className="va-landmark-title">
                            {i[0]}
                        </div>
                        &nbsp;
                        <div className="va-landmark-items">
                            {(i[1] * 100).toFixed(0)}%
                        </div>
                    </li>
                )
            });
            this.props.landmarkAnnotationsText(text);
        }

        return (
            <div className="LandmarkAnnotations">
                {title}
                {items}
            </div>
        );
    }
}

export default LandmarkAnnotations;
