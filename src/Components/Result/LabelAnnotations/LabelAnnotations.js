import React, { Component } from 'react';
import './LabelAnnotations.css';

class LabelAnnotations extends Component {
    render() {
        let text = '';
        let title;
        let items;

        if (this.props.label) {
            if (this.props.label.label === 1) {
                text += 'Label Detected, ';
                title = <h2>Label</h2>
            } else {
                text += 'Labels Detected, ';
                title = <h2>Labels</h2>
            }

            items = this.props.label.map(i => {
                text += i[0] + ' with ' + (i[1] * 100).toFixed(0) + ' percent, ';
                return (
                    <li key={i[0] + (i[1] * 100).toFixed(0)}>
                        <div className="va-label-title">
                            {i[0]}
                        </div>
                        &nbsp;
                        <div className="va-label-items">
                            {(i[1] * 100).toFixed(0)}%
                        </div>
                    </li>
                )
            });
            this.props.labelAnnotationsText(text);
        }

        return (
            <div className="LabelAnnotations">
                {title}
                {items}
            </div>
        );
    }
}

export default LabelAnnotations;
