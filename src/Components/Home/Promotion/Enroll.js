import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../UI/formFields';
import { validate } from '../../UI/misc';
import { firebasePromotions } from '../../../firebase';

class Enroll extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateForm(element) {
        const newFormData = {...this.state.formdata};
        const newElement = {...newFormData[element.id]};

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;
        this.setState({
            formError: false,
            formdata: newFormData
        });
    }

    submitForm(event) {
        event.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }
        
        if(formIsValid) {
            //check if user exists
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
                .then((snapshot) => {
                    if(snapshot.val() === null) {
                        firebasePromotions.push(dataToSubmit);
                        this.resetFromSuccess(true)
                    }
                    else {
                        this.resetFromSuccess(false)
                    }
                })
        }
        else {
            this.setState({
                formError: true
            })
        }
    } 

    resetFromSuccess(type) {
        const newFormData = {...this.state.formdata}; //copy of formdata

        for(let key in newFormData) {
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }

        this.setState({
            formError: false,
            formdata: newFormData,
            formSuccess: type ? 'Congratulations' : 'Already on the database'
        });

        this.successMessage();
    }

    successMessage() {
        setTimeout(() => {
            this.setState({ formSuccess: '' })
        },2000)
    }

    render() {
        return (
            <Fade>
                <div className="enroll-wrapper">
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <div className="enroll-title">
                            Enter your email
                        </div>
                        <div className="enroll-input">
                            <FormField 
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element) => this.updateForm(element)}
                            />

                            { this.state.formError ? 
                                <div className="error-label">Something is wrong, please try again.</div> 
                                : null}

                            <div className="success-label">{this.state.formSuccess}</div>

                            <button onClick={(event) => this.submitForm(event)}>Enroll</button>

                            <div className="enroll-discl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}
export default Enroll;
