import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';


class Fileuploader extends Component {

    state = {
        name: '',
        isUploading: false,
        fileURL: ''
    }

    static getDerivedStateFromProps(props, state) {
        if(props.defaultImg){
            return state = {
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }
        return null;
    }

    handleUploadStart = () => {
        this.setState({ isUploading: true });
    }

    handleUploadError = () => {
        this.setState({
            isUploading: false
        });
    }

    handleUploadSuccess = (filename) => {
        this.setState({
            name: filename,
            isUploading: false
        });

        firebase.storage().ref(this.props.dir)
            .child(filename).getDownloadURL()
            .then((url) => {
                this.setState({ fileURL: url})
            });

        this.props.filename(filename);
    }

    uploadAgain = () => {   //resets the state and the image
        this.setState({
            name: '',
            isUploading: false,
            fileURL: ''
        });

        this.props.resetImage();
    }

    render() {
        return (
            <div>
                { !this.state.fileURL ?
                    <div>
                        <div className="label-input">{this.props.tag}</div>
                        <FileUploader
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>
                    : null
                }

                { this.state.isUploading ?
                    <div className="progress">
                        <CircularProgress
                            style={{color: '#98c6e9'}}
                        />
                    </div>
                    : null
                }
                {
                    this.state.fileURL ?
                        <div className="image-upload__container">
                            <img src={this.state.fileURL} alt={this.state.name} />
                            <div className="remove" onClick={() => this.uploadAgain()}>
                                Remove
                            </div>
                        </div>
                    : null
                }
            </div>
        )
    }
}

export default Fileuploader;
