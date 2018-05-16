import React, { Component } from 'react';
import './FaceAnnotations.css';
import CONSTANTS from '../../constants';

class FaceAnnotations extends Component {

    handleFaceNumbers(i) {
        let faceNumber = '';
        switch (i) {
            case 1:
                faceNumber = '1st';
                break;
            case 2:
                faceNumber = '2nd';
                break;
            case 3:
                faceNumber = '3rd';
                break;
            default:
                faceNumber = i + 'th';
                break;
        }
        return faceNumber
    }

    handleFaceExpressions(expressions) {
        let faceExpression = [];
        for (let exp of expressions) {
            switch (exp[0]) {
                case CONSTANTS.FACE_EXPRESSIONS.HEADWEAR_LIKELIHOOD[0]:
                    faceExpression.push(CONSTANTS.FACE_EXPRESSIONS.HEADWEAR_LIKELIHOOD[1]);
                    break;
                case CONSTANTS.FACE_EXPRESSIONS.JOY_LIKELIHOOD[0]:
                    faceExpression.push(CONSTANTS.FACE_EXPRESSIONS.JOY_LIKELIHOOD[1]);
                    break;
                case CONSTANTS.FACE_EXPRESSIONS.SORROW_LIKELIHOOD[0]:
                    faceExpression.push(CONSTANTS.FACE_EXPRESSIONS.SORROW_LIKELIHOOD[1]);
                    break;
                case CONSTANTS.FACE_EXPRESSIONS.ANGER_LIKELIHOOD[0]:
                    faceExpression.push(CONSTANTS.FACE_EXPRESSIONS.ANGER_LIKELIHOOD[1]);
                    break;
                case CONSTANTS.FACE_EXPRESSIONS.SURPRISE_LIKELIHOOD[0]:
                    faceExpression.push(CONSTANTS.FACE_EXPRESSIONS.SURPRISE_LIKELIHOOD[1]);
                    break;
            }
        }

        return faceExpression.join(', ');
    }

    render() {
        let text = '';
        let title;
        let items;

        console.log(this.props.face);
        // console.log(this.props.face.length);
        if (this.props.face) {
            if (this.props.face.length === 1) {
                text += this.props.face.length + ' Face Detected, ';
                title = <h2>Face: <div className="va-number-of-faces">{this.props.face.length}</div></h2>
            } else {
                console.log(this.props.face);
                console.log(this.props.face.length);
                text += this.props.face.length + ' Faces Detected, ';
                title = <h2>Faces: <div className="va-number-of-faces">{this.props.face.length}</div></h2>
            }

            items = this.props.face.map(i => {
                // if (i[1] !== {}) {
                if (Object.keys(i[1]).length !== 0 && i[1].constructor === Object) {
                    console.log(i[1]);
                    text += this.handleFaceNumbers(i[0] + 1).toString() + ' face ';
                    let new_text = this.handleFaceExpressions(Object.values(i[1]));
                    if (new_text.indexOf(CONSTANTS.FACE_EXPRESSIONS.HEADWEAR_LIKELIHOOD[1]) >= 0) {
                        text += 'is ' + CONSTANTS.FACE_EXPRESSIONS.HEADWEAR_LIKELIHOOD[1];
                        new_text = new_text.replace(CONSTANTS.FACE_EXPRESSIONS.HEADWEAR_LIKELIHOOD[1], '');
                        if (new_text) {
                            text += ' and shows ';
                        }
                    } else {
                        text += 'shows ';
                    }
                    text += new_text + ', ';
                    text = text.replace(' ,', '');

                    return (
                        <li key={i[0]}>
                            <div className="va-label-title">
                                {this.handleFaceNumbers(i[0] + 1)} Face -
                            </div>

                            &nbsp;
                            <div className="va-label-items">
                                {this.handleFaceExpressions(Object.values(i[1]))}
                            </div>
                        </li>
                    )
                }
            });
            this.props.faceAnnotationsText(text);
        }

        return (
            <div className="FaceAnnotations">
                {title}
                {items}
            </div>
        );
    }
}

export default FaceAnnotations;
