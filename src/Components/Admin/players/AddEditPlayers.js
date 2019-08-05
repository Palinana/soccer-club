import React, { Component } from 'react';
import Sidebar from '../../Layout/Sidebar';
import FormField from '../../UI/formFields';
import { validate } from '../../UI/misc';
import { firebaseDB, firebasePlayers, firebase } from '../../../firebase';
import Fileuploader from '../../UI/fileUploader';

class AddEditPlayers extends Component {
    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Name',
                    name: 'name_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Last name',
                    name: 'lastname_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Player Number',
                    name: 'number_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a position',
                    name: 'select_positionl',
                    type: 'select',
                    options: [
                        { key: 'Keeper', value: 'Keeper' },
                        { key: 'Defence', value: 'Defence' },
                        { key: 'Midfiled', value: 'Midfield' },
                        { key: 'Forward', value: 'Forward' }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation: {
                    required: true,
                },
                valid: false
            }
        }
    }

    updateForm(element, content = '') {
        const newFormData = {...this.state.formdata};
        const newElement = {...newFormData[element.id]};

        if(content === ''){
            newElement.value = element.event.target.value;
        }
        else {
            newElement.value = content;
        }

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;
        this.setState({
            formError: false,
            formdata: newFormData
        });
    }

    updateFields = (player, playerId, formType, defaultImg) => {
        const newFormdata = {...this.state.formdata};

        for(let key in newFormdata){
            newFormdata[key].value = player[key];
            newFormdata[key].valid = true;
        }

        this.setState({
            playerId,
            defaultImg,
            formType,
            formdata: newFormdata
        });
    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if(!playerId) {
            this.setState({
                formType: 'Add player'
            })
        }
        else {
            firebaseDB.ref(`players/${playerId}`).once('value')
                .then((snapshot) => {
                    const playerData = snapshot.val();

                    firebase.storage().ref('players') //get image from firebase
                    .child(playerData.image).getDownloadURL()
                    .then((url) => {
                        this.updateFields(playerData, playerId, 'Edit player', url)
                    });
        
                })
        }
    }

    successForm(message) {
        this.setState({ formSuccess: message });

        setTimeout(() => {
            this.setState({ formSuccess: '' });
        }, 2000);
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
            if(this.state.formType === 'Edit player'){
                firebaseDB.ref(`players/${this.state.playerId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        this.successForm('Updated correctly');
                    }).catch((error) => {
                        this.setState({ formError: true })
                    })
            }
            else {
                firebasePlayers.push(dataToSubmit)
                    .then(() => {
                        this.props.history.push('/admin_players');
                    }).catch((error) => {
                        this.setState({ formError: true })
                    })
            }
        }
        else {
            this.setState({
                formError: true
            })
        }
    } 

    resetImage = () => {
        const newFormdata = {...this.state.formdata};
        newFormdata['image'].value = '';
        newFormdata['image'].valid = false;
        this.setState({
            defaultImg: '',
            formdata: newFormdata
        });
    }

    storeFilename = (filename) => {
        this.updateForm({ id: 'image'}, filename);
    }

    render() {
        return (
        <Sidebar>
            <div className="editplayers-dialog__wrapper">
                <h2>{ this.state.formType}</h2>
                <div>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        
                        <Fileuploader 
                            dir="players" //directory in Firebase
                            tag={"Player image"}
                            defaultImg={this.state.defaultImg}
                            defaultImgName={this.state.formdata.image.value}
                            resetImage={() => this.resetImage()}
                            filename={(filename) => this.storeFilename(filename)}
                        />

                        <FormField 
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField 
                            id={'lastname'}
                            formdata={this.state.formdata.lastname}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField 
                            id={'number'}
                            formdata={this.state.formdata.number}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField 
                            id={'position'}
                            formdata={this.state.formdata.position}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="success-label">{ this.state.formSuccess }</div>

                        { this.state.formError ? 
                            <div className="error-label">Something went wrong</div>
                            : null
                        }

                        <div className="admin-submit">
                            <button onClick={(event) => this.submitForm(event)}>
                                {this.state.formType}
                            </button>
                        </div> 

                    </form>
                </div>
            </div>
            
        </Sidebar>
        )
    }
}

export default AddEditPlayers;
