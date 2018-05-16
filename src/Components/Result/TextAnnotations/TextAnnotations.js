import React, { Component } from 'react';
import './TextAnnotations.css';
import LabelAnnotations from "../LabelAnnotations/LabelAnnotations";

class TextAnnotations extends Component {
    render() {
        let text = '';
        let items;

        if (this.props.text) {

            items = this.props.text.map(i => {
                text += ' ' + i + ', ';
                if (this.props.text.length === 1) {
                    return (
                        <div key={i}>
                            {i}
                        </div>

                    )
                } else {
                    return (
                        <li key={i}>
                            {i}
                        </li>

                    )
                }
            });
            this.props.textAnnotationsText(text);
        }

        return (
            <div className="TextAnnotations">
                {items}
                <LabelAnnotations/>
            </div>
        );
    }
}

export default TextAnnotations;
